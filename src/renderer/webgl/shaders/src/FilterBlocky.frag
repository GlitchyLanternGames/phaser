// BLOCKY_FS
#version 300 es

#pragma phaserTemplate(shaderName)

precision mediump float;

out vec4 fragColorOutput;

uniform sampler2D uMainSampler;
uniform vec2 resolution;
uniform vec4 uSizeAndOffset;

in vec2 outTexCoord;

void main()
{
    // Sample from the center of a grid cell, starting at the top-left corner,
    // with size uSizeAndOffset.xy and offset uSizeAndOffset.zw.
    vec2 gridCell = floor((outTexCoord * resolution + uSizeAndOffset.zw) / uSizeAndOffset.xy) * uSizeAndOffset.xy - uSizeAndOffset.zw;
    vec2 texCoord = gridCell / resolution;

    fragColorOutput = texture(uMainSampler, texCoord);
}
