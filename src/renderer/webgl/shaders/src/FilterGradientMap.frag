// GRADIENT_MAP
#version 300 es

#pragma phaserTemplate(shaderName)

precision highp float;

#pragma phaserTemplate(fragmentHeader)

out vec4 fragColorOutput;

uniform sampler2D uMainSampler;
uniform vec4 uColor;
uniform vec4 uColorFactor;
uniform bool uUnpremultiply;
uniform float uAlpha;

in vec2 outTexCoord;

void main ()
{
    vec4 sample = texture(uMainSampler, outTexCoord);
    if (uUnpremultiply)
    {
        sample.rgb /= sample.a;
    }

    // Modulate color.
    vec4 modulatedSample = sample * uColorFactor + uColor;

    float progress = modulatedSample.r + modulatedSample.g + modulatedSample.b + modulatedSample.a;

    // Expect getRampAt to be imported from Ramp.glsl via additions.
    vec4 rampColor = getRampAt(progress);

    rampColor.rgb *= rampColor.a;

    fragColorOutput = mix(sample, rampColor * sample.a, uAlpha);
}
