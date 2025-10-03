#version 300 es

#pragma phaserTemplate(shaderName)

precision mediump float;

in vec2 inPosition;
in vec2 inTexCoord;

// Normalized screen space coordinates
out vec2 outFragCoord;

// Texture coordinates
out vec2 outTexCoord;

void main ()
{
    outFragCoord = inPosition.xy * 0.5 + 0.5;
    outTexCoord = inTexCoord;

    gl_Position = vec4(inPosition, 0, 1);
}
