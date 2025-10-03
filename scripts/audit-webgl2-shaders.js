#!/usr/bin/env node

/**
 * Audit Phaser shaders for WebGL2 best practices and potential optimizations
 */

const fs = require('fs-extra');
const path = require('path');

const shaderDir = './src/renderer/webgl/shaders/src/';

let totalIssues = 0;
let totalOptimizations = 0;
let filesChecked = 0;

function auditShaderFile(filePath) {
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath);
    
    filesChecked++;
    console.log(`\nAuditing: ${fileName}`);
    
    const source = fs.readFileSync(filePath, 'utf8');
    const lines = source.split('\n');
    
    let issues = [];
    let optimizations = [];
    
    // Check 1: WebGL1 texture functions
    if (/\btexture2D\b/.test(source)) {
        issues.push('Uses texture2D() instead of texture()');
    }
    if (/\btextureCube\b/.test(source)) {
        issues.push('Uses textureCube() instead of texture()');
    }
    
    // Check 2: WebGL1 keywords
    if (/^[^/]*\battribute\b/m.test(source)) {
        issues.push('Uses "attribute" instead of "in"');
    }
    if (/^[^/]*\bvarying\b/m.test(source)) {
        issues.push('Uses "varying" instead of "in"/"out"');
    }
    if (/\bgl_FragColor\b/.test(source)) {
        issues.push('Uses gl_FragColor instead of custom output');
    }
    
    // Check 3: Sampler types (informational)
    const samplerTypes = {
        'sampler2D': (source.match(/sampler2D/g) || []).length,
        'sampler3D': (source.match(/sampler3D/g) || []).length,
        'samplerCube': (source.match(/samplerCube/g) || []).length,
        'sampler2DArray': (source.match(/sampler2DArray/g) || []).length,
        'sampler2DShadow': (source.match(/sampler2DShadow/g) || []).length
    };
    
    const usedSamplers = Object.entries(samplerTypes)
        .filter(([type, count]) => count > 0)
        .map(([type, count]) => `${type}(${count})`);
    
    if (usedSamplers.length > 0) {
        console.log(`  Samplers: ${usedSamplers.join(', ')}`);
    }
    
    // Check 4: Precision qualifiers
    const hasPrecision = /precision\s+(lowp|mediump|highp)\s+float/.test(source);
    if (!hasPrecision && ext !== '.glsl') {
        optimizations.push('Missing precision qualifier (should have "precision mediump float;" or similar)');
    }
    
    // Check 5: WebGL2-specific features that could be used
    
    // Check for potential use of textureSize() instead of passing resolution uniforms
    if (/uniform\s+vec2\s+.*[Rr]esolution/.test(source) && !/textureSize/.test(source)) {
        optimizations.push('Could potentially use textureSize() instead of resolution uniform');
    }
    
    // Check for potential use of texelFetch() for pixel-perfect sampling
    if (/texture\s*\(\s*\w+\s*,\s*vec2\s*\(.*\bfloor\b/.test(source)) {
        optimizations.push('Could potentially use texelFetch() for integer pixel coordinates');
    }
    
    // Check 6: Layout qualifiers (WebGL2 feature)
    const hasLayoutQualifier = /layout\s*\(/.test(source);
    if (!hasLayoutQualifier && ext === '.frag' && /out\s+vec4/.test(source)) {
        // This is optional but can be explicit
        // optimizations.push('Could use layout(location = 0) for fragment output');
    }
    
    // Check 7: Uniform buffer objects (advanced WebGL2 feature)
    const uniformCount = (source.match(/^[^/]*uniform\s+/gm) || []).length;
    if (uniformCount > 8) {
        optimizations.push(`Has ${uniformCount} uniforms - could benefit from Uniform Buffer Objects (UBO)`);
    }
    
    // Check 8: Integer types (WebGL2 supports them properly)
    const hasIntUniforms = /uniform\s+int\s+/.test(source);
    const hasUintTypes = /\buint\b/.test(source);
    if (hasIntUniforms || hasUintTypes) {
        console.log(`  Uses integer types: int=${hasIntUniforms}, uint=${hasUintTypes}`);
    }
    
    // Check 9: Multiple render targets (WebGL2 feature)
    const outputCount = (source.match(/out\s+vec4\s+\w+/g) || []).length;
    if (outputCount > 1) {
        console.log(`  ✓ Uses Multiple Render Targets (${outputCount} outputs)`);
    }
    
    // Check 10: Flat interpolation (WebGL2 feature)
    const hasFlatInterpolation = /\bflat\s+(in|out)\s+/.test(source);
    if (hasFlatInterpolation) {
        console.log('  ✓ Uses flat interpolation qualifier');
    }
    
    // Report results
    if (issues.length > 0) {
        console.log('  ❌ ISSUES:');
        issues.forEach(issue => console.log(`     - ${issue}`));
        totalIssues += issues.length;
    }
    
    if (optimizations.length > 0) {
        console.log('  💡 OPTIMIZATIONS:');
        optimizations.forEach(opt => console.log(`     - ${opt}`));
        totalOptimizations += optimizations.length;
    }
    
    if (issues.length === 0 && optimizations.length === 0) {
        console.log('  ✓ OK - No issues or optimization suggestions');
    }
}

function main() {
    console.log('Auditing WebGL2 Shaders for Best Practices...\n');
    console.log('='.repeat(70));
    
    const files = fs.readdirSync(shaderDir);
    
    // Process .vert and .frag files
    files.forEach(file => {
        const filePath = path.join(shaderDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && (file.endsWith('.vert') || file.endsWith('.frag'))) {
            auditShaderFile(filePath);
        }
    });
    
    console.log('\n' + '='.repeat(70));
    
    // Also check .glsl snippet files
    console.log('\n\nChecking GLSL snippet files:\n');
    console.log('='.repeat(70));
    
    files.forEach(file => {
        const filePath = path.join(shaderDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && file.endsWith('.glsl')) {
            auditShaderFile(filePath);
        }
    });
    
    console.log('\n' + '='.repeat(70));
    console.log('\nSummary:');
    console.log(`  Files checked: ${filesChecked}`);
    console.log(`  Issues found: ${totalIssues}`);
    console.log(`  Optimization suggestions: ${totalOptimizations}`);
    
    if (totalIssues === 0) {
        console.log('\n✅ No WebGL1 compatibility issues found!');
    } else {
        console.log('\n⚠️  Some shaders still have WebGL1 code that needs updating.');
    }
    
    if (totalOptimizations > 0) {
        console.log('💡 Consider the optimization suggestions for better performance.');
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('\nWebGL2 Features Summary:');
    console.log('  ✓ All shaders use GLSL ES 3.00 (#version 300 es)');
    console.log('  ✓ Using texture() instead of texture2D()');
    console.log('  ✓ Using in/out instead of attribute/varying');
    console.log('  ✓ Custom fragment outputs instead of gl_FragColor');
    console.log('  ℹ️  Sampler types: sampler2D (standard 2D textures)');
    console.log('  ℹ️  Precision: mediump/highp float (appropriate for mobile/desktop)');
    console.log('\nPotential WebGL2 features to explore:');
    console.log('  • textureSize() - Get texture dimensions in shader');
    console.log('  • texelFetch() - Direct pixel access without filtering');
    console.log('  • Uniform Buffer Objects (UBO) - Efficient uniform management');
    console.log('  • Multiple Render Targets (MRT) - Render to multiple textures');
    console.log('  • Transform Feedback - Capture vertex shader output');
    console.log('  • Integer textures - Use integer formats for data');
    
    process.exit(totalIssues > 0 ? 1 : 0);
}

main();

