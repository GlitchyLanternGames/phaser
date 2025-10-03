// MASK_FS
#version 300 es

#pragma phaserTemplate(shaderName)

precision mediump float;

out vec4 fragColorOutput;

uniform sampler2D uMainSampler;
uniform sampler2D uMaskSampler;

uniform bool invert;

in vec2 outTexCoord;

void main ()
{
    vec4 color = texture(uMainSampler, outTexCoord);
    vec4 mask = texture(uMaskSampler, outTexCoord);

    float a = mask.a;
    color *= invert ? (1.0 - a) : a;

    fragColorOutput = color;
}