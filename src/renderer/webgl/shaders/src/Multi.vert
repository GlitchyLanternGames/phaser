#version 300 es

#pragma phaserTemplate(shaderName)

#pragma phaserTemplate(extensions)

#pragma phaserTemplate(features)

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#pragma phaserTemplate(vertexDefine)

uniform mat4 uProjectionMatrix;
uniform vec2 uResolution;

in vec2 inPosition;
in vec2 inTexCoord;
in float inTexDatum;
in vec4 inTintEffect;
in vec4 inTint;

out vec2 outTexCoord;
out float outTexDatum;
out vec4 outTintEffect;
out vec4 outTint;

#pragma phaserTemplate(vertexOutVariables)

#pragma phaserTemplate(vertexHeader)

void main ()
{
    gl_Position = uProjectionMatrix * vec4(inPosition, 1.0, 1.0);

    outTexCoord = inTexCoord;
    outTexDatum = inTexDatum;
    outTint = inTint;
    outTintEffect = inTintEffect * vec4(1.0, 1.0, 1.0, 255.0); // Denormalize tint mode to an integer.

    #pragma phaserTemplate(vertexProcess)
}
