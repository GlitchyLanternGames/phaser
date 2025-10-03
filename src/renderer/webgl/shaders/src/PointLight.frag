#version 300 es

#pragma phaserTemplate(shaderName)

#pragma phaserTemplate(extensions)

#pragma phaserTemplate(features)

precision mediump float;

#pragma phaserTemplate(fragmentDefine)

out vec4 fragColorOutput;

uniform vec2 uResolution;
uniform float uCameraZoom;

in vec4 lightPosition;
in vec4 lightColor;
in float lightRadius;
in float lightAttenuation;

#pragma phaserTemplate(outVariables)

#pragma phaserTemplate(fragmentHeader)

void main ()
{
    vec2 center = (lightPosition.xy + 1.0) * (uResolution.xy * 0.5);

    float distToSurf = length(center - gl_FragCoord.xy);

    float radius = 1.0 - distToSurf / (lightRadius * uCameraZoom);

    float intensity = smoothstep(0.0, 1.0, radius * lightAttenuation);

    vec4 color = vec4(intensity, intensity, intensity, 0.0) * lightColor;

    #pragma phaserTemplate(fragmentProcess)

    fragColorOutput = vec4(color.rgb * lightColor.a, color.a);
}
