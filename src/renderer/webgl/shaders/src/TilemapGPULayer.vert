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
uniform vec4 uTileWidthHeightMarginSpacing;

in vec2 inPosition;
in vec2 inTexCoord;

out vec2 outTexCoord;
out vec2 outTileStride;

#pragma phaserTemplate(vertexOutVariables)

#pragma phaserTemplate(vertexHeader)

void main ()
{
    gl_Position = uProjectionMatrix * vec4(inPosition, 1.0, 1.0);

    outTexCoord = inTexCoord;
    outTileStride = uTileWidthHeightMarginSpacing.xy + uTileWidthHeightMarginSpacing.zz;

    #pragma phaserTemplate(vertexProcess)
}
