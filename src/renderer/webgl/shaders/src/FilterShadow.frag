// SHADOW_FS
#version 300 es

#pragma phaserTemplate(shaderName)

precision mediump float;

out vec4 fragColorOutput;

uniform sampler2D uMainSampler;

in vec2 outTexCoord;

uniform vec2 lightPosition;
uniform vec4 color;
uniform float decay;
uniform float power;
uniform float intensity;
uniform int samples;

const int MAX = 12;

#pragma phaserTemplate(fragmentHeader)

void main ()
{
    vec4 texture = boundedSampler(uMainSampler, outTexCoord);

    vec2 pc = (lightPosition - outTexCoord) * intensity;

    float shadow = 0.0;
    float limit = max(float(MAX), float(samples));

    for (int i = 0; i < MAX; ++i)
    {
        if (i >= samples)
        {
            break;
        }

        shadow += boundedSampler(uMainSampler, outTexCoord + float(i) * decay / limit * pc).a * power;
    }

    float mask = 1.0 - texture.a;

    fragColorOutput = mix(texture, color, clamp(shadow * mask, 0.0, 1.0));
}
