#!/usr/bin/env node

/**
 * Convert all Phaser shaders from WebGL 1 (GLSL ES 1.00) to WebGL 2 (GLSL ES 3.00)
 * This eliminates the need for runtime shader conversion.
 */

const fs = require('fs-extra');
const path = require('path');

const shaderDir = './src/renderer/webgl/shaders/src/';

function convertShaderToWebGL2(source, isVertexShader) {
    let output = source;

    // Check if already WebGL2
    if (/^#version\s+300\s+es/m.test(output)) {
        console.log('  Already WebGL2, skipping...');
        return output;
    }

    // Add #version 300 es at the top (after any initial comments)
    const lines = output.split('\n');
    let versionInserted = false;
    let newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Skip empty lines and comments at the start
        if (!versionInserted && (trimmed === '' || trimmed.startsWith('//'))) {
            newLines.push(line);
            continue;
        }
        
        // Insert version directive before first non-comment line
        if (!versionInserted) {
            newLines.push('#version 300 es');
            newLines.push('');
            versionInserted = true;
        }
        
        newLines.push(line);
    }
    
    output = newLines.join('\n');

    // Convert WebGL 1 keywords to WebGL 2
    if (isVertexShader) {
        // Vertex shader conversions
        output = output.replace(/\battribute\b/g, 'in');
        output = output.replace(/\bvarying\b/g, 'out');
    } else {
        // Fragment shader conversions
        output = output.replace(/\bvarying\b/g, 'in');
        
        // Replace gl_FragColor with fragColorOutput
        if (output.indexOf('gl_FragColor') > -1) {
            output = output.replace(/\bgl_FragColor\b/g, 'fragColorOutput');
            
            // Add output declaration if not present
            if (!/out\s+vec4\s+fragColorOutput\s*;/.test(output)) {
                const outputLines = output.split('\n');
                let insertIndex = -1;
                
                // Find where to insert the output declaration
                // (after #version and precision, before first uniform/function)
                for (let i = 0; i < outputLines.length; i++) {
                    const trimmed = outputLines[i].trim();
                    
                    if (trimmed === '' ||
                        trimmed.startsWith('//') ||
                        trimmed.indexOf('#version') === 0 ||
                        trimmed.indexOf('#define') === 0 ||
                        trimmed.indexOf('#ifdef') === 0 ||
                        trimmed.indexOf('#ifndef') === 0 ||
                        trimmed.indexOf('#else') === 0 ||
                        trimmed.indexOf('#endif') === 0 ||
                        trimmed.indexOf('#pragma') === 0 ||
                        trimmed.indexOf('precision') === 0) {
                        continue;
                    }
                    
                    insertIndex = i;
                    break;
                }
                
                if (insertIndex > -1) {
                    outputLines.splice(insertIndex, 0, 'out vec4 fragColorOutput;', '');
                    output = outputLines.join('\n');
                }
            }
        }
    }

    // Convert texture functions
    output = output.replace(/\btexture2D\b/g, 'texture');
    output = output.replace(/\btextureCube\b/g, 'texture');

    return output;
}

function processShaderFile(filePath) {
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath);
    
    console.log(`Processing: ${fileName}`);
    
    // Determine if vertex or fragment shader
    let isVertexShader = false;
    if (ext === '.vert' || fileName.includes('.vert')) {
        isVertexShader = true;
    } else if (ext === '.frag' || fileName.includes('.frag')) {
        isVertexShader = false;
    } else if (ext === '.glsl') {
        // For .glsl files, we need to check content or assume fragment
        // Most .glsl files are shader snippets, not full shaders
        console.log('  Skipping .glsl snippet file');
        return;
    }
    
    const source = fs.readFileSync(filePath, 'utf8');
    const converted = convertShaderToWebGL2(source, isVertexShader);
    
    if (source !== converted) {
        fs.writeFileSync(filePath, converted, 'utf8');
        console.log('  ✓ Converted to WebGL2');
    } else {
        console.log('  - No changes needed');
    }
}

function main() {
    console.log('Converting Phaser shaders to WebGL2...\n');
    
    const files = fs.readdirSync(shaderDir);
    
    files.forEach(file => {
        const filePath = path.join(shaderDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && (file.endsWith('.vert') || file.endsWith('.frag'))) {
            processShaderFile(filePath);
        }
    });
    
    console.log('\n✓ Shader conversion complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run bundleshaders');
    console.log('2. Run: npm run build');
    console.log('3. Remove or disable the convertShaderSourceToWebGL2 function');
}

main();

