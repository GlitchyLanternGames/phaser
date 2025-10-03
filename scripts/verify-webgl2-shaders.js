#!/usr/bin/env node

/**
 * Verify that all Phaser shaders are properly converted to WebGL2 format
 */

const fs = require('fs-extra');
const path = require('path');

const shaderDir = './src/renderer/webgl/shaders/src/';

let totalErrors = 0;
let totalWarnings = 0;
let filesChecked = 0;

function checkShaderFile(filePath) {
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath);
    
    // Skip .glsl snippet files
    if (ext === '.glsl') {
        return;
    }
    
    filesChecked++;
    console.log(`\nChecking: ${fileName}`);
    
    const source = fs.readFileSync(filePath, 'utf8');
    const lines = source.split('\n');
    
    let errors = [];
    let warnings = [];
    
    // Check 1: Must have exactly one #version directive
    const versionLines = lines.filter((line, idx) => {
        if (/^#version/.test(line.trim())) {
            return true;
        }
        return false;
    });
    
    if (versionLines.length === 0) {
        errors.push('Missing #version directive');
    } else if (versionLines.length > 1) {
        errors.push(`Multiple #version directives found (${versionLines.length}): ${versionLines.join(', ')}`);
    } else if (versionLines[0].trim() !== '#version 300 es') {
        errors.push(`Wrong version: "${versionLines[0].trim()}" (should be "#version 300 es")`);
    }
    
    // Check 2: Should not contain WebGL1 keywords
    const webgl1Keywords = [
        { keyword: 'attribute', regex: /^[^/]*\battribute\b/ },
        { keyword: 'varying', regex: /^[^/]*\bvarying\b/ },
        { keyword: 'texture2D', regex: /\btexture2D\b/ },
        { keyword: 'textureCube', regex: /\btextureCube\b/ },
        { keyword: 'gl_FragColor', regex: /\bgl_FragColor\b/ }
    ];
    
    webgl1Keywords.forEach(({ keyword, regex }) => {
        const foundLines = [];
        lines.forEach((line, idx) => {
            if (regex.test(line)) {
                foundLines.push(`Line ${idx + 1}: ${line.trim()}`);
            }
        });
        
        if (foundLines.length > 0) {
            errors.push(`Found WebGL1 keyword "${keyword}":\n    ${foundLines.join('\n    ')}`);
        }
    });
    
    // Check 3: Fragment shaders should have output declaration
    if (ext === '.frag') {
        const hasFragColorOutput = /out\s+vec4\s+fragColorOutput\s*;/.test(source);
        if (!hasFragColorOutput) {
            warnings.push('Fragment shader missing "out vec4 fragColorOutput;" declaration');
        }
    }
    
    // Check 4: Vertex shaders should use 'in' for attributes
    if (ext === '.vert') {
        const hasInKeyword = /\bin\s+\w+/.test(source);
        if (!hasInKeyword) {
            warnings.push('Vertex shader has no "in" declarations (might be a snippet)');
        }
    }
    
    // Check 5: #version should be at the top (after comments)
    let firstNonCommentLine = -1;
    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed && !trimmed.startsWith('//')) {
            firstNonCommentLine = i;
            break;
        }
    }
    
    if (firstNonCommentLine > -1 && !lines[firstNonCommentLine].trim().startsWith('#version')) {
        warnings.push(`#version directive not at top (found at line ${firstNonCommentLine + 1})`);
    }
    
    // Report results
    if (errors.length > 0) {
        console.log('  ❌ ERRORS:');
        errors.forEach(err => console.log(`     - ${err}`));
        totalErrors += errors.length;
    }
    
    if (warnings.length > 0) {
        console.log('  ⚠️  WARNINGS:');
        warnings.forEach(warn => console.log(`     - ${warn}`));
        totalWarnings += warnings.length;
    }
    
    if (errors.length === 0 && warnings.length === 0) {
        console.log('  ✓ OK');
    }
}

function main() {
    console.log('Verifying WebGL2 shader conversion...\n');
    console.log('='.repeat(60));
    
    const files = fs.readdirSync(shaderDir);
    
    files.forEach(file => {
        const filePath = path.join(shaderDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && (file.endsWith('.vert') || file.endsWith('.frag'))) {
            checkShaderFile(filePath);
        }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('\nSummary:');
    console.log(`  Files checked: ${filesChecked}`);
    console.log(`  Errors: ${totalErrors}`);
    console.log(`  Warnings: ${totalWarnings}`);
    
    if (totalErrors === 0 && totalWarnings === 0) {
        console.log('\n✅ All shaders are properly converted to WebGL2!');
        process.exit(0);
    } else if (totalErrors === 0) {
        console.log('\n⚠️  All shaders converted, but some warnings found.');
        process.exit(0);
    } else {
        console.log('\n❌ Shader conversion has errors that need to be fixed!');
        process.exit(1);
    }
}

main();

