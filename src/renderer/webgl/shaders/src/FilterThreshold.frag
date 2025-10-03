// THRESHOLD_FS
#version 300 es

#pragma phaserTemplate(shaderName)

precision mediump float;

out vec4 fragColorOutput;

uniform sampler2D uMainSampler;
uniform vec4 edge1;
uniform vec4 edge2;
uniform vec4 invert;

in vec2 outTexCoord;

void main ()
{
    vec4 color = texture(uMainSampler, outTexCoord);

    // Smoothstep color between edge1 and edge2, but linear.
    color = clamp((color - edge1) / (edge2 - edge1), 0.0, 1.0);

    // Invert the color if needed.
    color = mix(color, 1.0 - color, invert);

    fragColorOutput = color;
}
