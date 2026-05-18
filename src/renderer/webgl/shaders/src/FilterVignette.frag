// VIGNETTE

#version 300 es

#pragma phaserTemplate(shaderName)

precision mediump float;

out vec4 fragColorOutput;

uniform sampler2D uMainSampler;
uniform float uRadius;
uniform float uStrength;
uniform vec2 uPosition;
uniform vec4 uColor;
uniform int uBlendMode;

in vec2 outTexCoord;

void main ()
{
    float vignette = 1.0;

    vec2 position = vec2(uPosition.x, 1.0 - uPosition.y);
    float d = length(outTexCoord - position);

    if (d <= uRadius)
    {
        float g = d / uRadius;
        vignette = sin(g * 3.14 * uStrength);
    }
    vec4 color = uColor;

    vec4 texture = texture(uMainSampler, outTexCoord);

    // Blend modes.
    if (uBlendMode == 1)
    {
        // ADD
        color.rgb = texture.rgb + color.rgb;
    }
    else if (uBlendMode == 2)
    {
        // MULTIPLY
        color.rgb = texture.rgb * color.rgb;
    }
    else if (uBlendMode == 3)
    {
        // SCREEN
        color.rgb = 1.0 - ((1.0 - texture.rgb) * (1.0 - color.rgb));
    }

    fragColorOutput = mix(texture, color, vignette);
}
