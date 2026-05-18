// Shader Quad fragment shader
#version 300 es

#pragma phaserTemplate(shaderName)

#pragma phaserTemplate(extensions)

#pragma phaserTemplate(features)

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#pragma phaserTemplate(fragmentDefine)

// The position of the fragment within the quad.
// This is a value between 0 and 1 across the quad.
// 0,1 is the top-left, 1,0 is the bottom right.
out vec4 fragColorOutput;

in vec2 outTexCoord;

#pragma phaserTemplate(fragmentInVariables)

#pragma phaserTemplate(fragmentHeader)

void main ()
{
    vec4 fragColor = vec4(outTexCoord.xyx, 1.0);

    #pragma phaserTemplate(fragmentProcess)

    fragColorOutput = fragColor;
}
