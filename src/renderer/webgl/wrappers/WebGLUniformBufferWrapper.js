/**
 * @author       Alex Smuk <alex.smuk@proton.me>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = require('../../../utils/Class');

/**
 * @classdesc
 * Wrapper for a WebGL2 Uniform Buffer Object (UBO).
 *
 * UBOs allow you to group multiple uniforms into a single buffer, which can be
 * updated more efficiently than individual uniforms. This is especially useful
 * when you have many uniforms that are updated together (e.g., camera matrices,
 * lighting data, material properties).
 *
 * Benefits of UBOs:
 * - Faster uniform updates (single buffer update vs. multiple uniform calls)
 * - Shared uniform data across multiple shaders
 * - Better driver optimization
 * - Reduced CPU overhead
 *
 * Note: UBOs are only available in WebGL2. This wrapper will throw an error
 * if used with a WebGL1 context.
 *
 * @class WebGLUniformBufferWrapper
 * @memberof Phaser.Renderer.WebGL.Wrappers
 * @constructor
 * @since 4.0.0
 * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - The WebGLRenderer instance that owns this wrapper.
 * @param {number} bindingPoint - The binding point index for this UBO (0-based).
 * @param {ArrayBuffer|ArrayBufferView} [data] - Optional initial data for the buffer.
 * @param {number} [usage=gl.DYNAMIC_DRAW] - The usage pattern for the buffer.
 */
var WebGLUniformBufferWrapper = new Class({
    initialize: function WebGLUniformBufferWrapper (renderer, bindingPoint, data, usage)
    {
        if (!renderer.isWebGL2)
        {
            throw new Error('Uniform Buffer Objects are only available in WebGL2');
        }

        /**
         * The WebGLRenderer instance that owns this wrapper.
         *
         * @name Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#renderer
         * @type {Phaser.Renderer.WebGL.WebGLRenderer}
         * @since 4.0.0
         */
        this.renderer = renderer;

        /**
         * The WebGL context.
         *
         * @name Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#gl
         * @type {WebGL2RenderingContext}
         * @since 4.0.0
         */
        this.gl = renderer.gl;

        /**
         * The WebGLBuffer being wrapped by this class.
         *
         * This property could change at any time.
         * Therefore, you should never store a reference to this value.
         * It should only be passed directly to the WebGL API.
         *
         * @name Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#buffer
         * @type {?WebGLBuffer}
         * @default null
         * @since 4.0.0
         */
        this.buffer = null;

        /**
         * The binding point index for this UBO.
         * This should be unique across all UBOs in use.
         *
         * @name Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#bindingPoint
         * @type {number}
         * @since 4.0.0
         */
        this.bindingPoint = bindingPoint;

        /**
         * The usage pattern for this buffer.
         * Defaults to gl.DYNAMIC_DRAW for frequently updated data.
         *
         * @name Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#usage
         * @type {number}
         * @since 4.0.0
         */
        this.usage = usage || this.gl.DYNAMIC_DRAW;

        /**
         * The size of the buffer in bytes.
         *
         * @name Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#byteLength
         * @type {number}
         * @default 0
         * @since 4.0.0
         */
        this.byteLength = 0;

        this.createResource();

        if (data)
        {
            this.setData(data);
        }
    },

    /**
     * Creates a new WebGLBuffer for uniform data.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#createResource
     * @since 4.0.0
     */
    createResource: function ()
    {
        var gl = this.gl;

        if (gl.isContextLost())
        {
            // GL state can't be updated right now.
            // `createResource` will run when the context is restored.
            return;
        }

        var buffer = gl.createBuffer();

        if (buffer)
        {
            this.buffer = buffer;
        }
    },

    /**
     * Binds this UBO to its binding point.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#bind
     * @since 4.0.0
     */
    bind: function ()
    {
        var gl = this.gl;

        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, this.bindingPoint, this.buffer);
    },

    /**
     * Unbinds this UBO.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#unbind
     * @since 4.0.0
     */
    unbind: function ()
    {
        var gl = this.gl;

        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    },

    /**
     * Sets the data for this UBO.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#setData
     * @since 4.0.0
     * @param {ArrayBuffer|ArrayBufferView} data - The data to upload to the buffer.
     * @param {number} [offset=0] - The offset in bytes where the data should be written.
     */
    setData: function (data, offset)
    {
        if (offset === undefined) { offset = 0; }

        var gl = this.gl;

        this.bind();

        if (offset === 0 && (!this.byteLength || data.byteLength === this.byteLength))
        {
            // Full buffer update
            gl.bufferData(gl.UNIFORM_BUFFER, data, this.usage);
            this.byteLength = data.byteLength;
        }
        else
        {
            // Partial buffer update
            if (data.byteLength + offset > this.byteLength)
            {
                console.warn('UBO data exceeds buffer size. Reallocating buffer.');
                gl.bufferData(gl.UNIFORM_BUFFER, data.byteLength + offset, this.usage);
                this.byteLength = data.byteLength + offset;
            }

            gl.bufferSubData(gl.UNIFORM_BUFFER, offset, data);
        }
    },

    /**
     * Updates a portion of the buffer data.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#updateData
     * @since 4.0.0
     * @param {ArrayBuffer|ArrayBufferView} data - The data to upload.
     * @param {number} offset - The offset in bytes where the data should be written.
     */
    updateData: function (data, offset)
    {
        var gl = this.gl;

        this.bind();
        gl.bufferSubData(gl.UNIFORM_BUFFER, offset, data);
    },

    /**
     * Binds this UBO to a specific uniform block in a shader program.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#bindToProgram
     * @since 4.0.0
     * @param {WebGLProgram} program - The shader program.
     * @param {string} blockName - The name of the uniform block in the shader.
     */
    bindToProgram: function (program, blockName)
    {
        var gl = this.gl;

        var blockIndex = gl.getUniformBlockIndex(program, blockName);

        if (blockIndex !== gl.INVALID_INDEX)
        {
            gl.uniformBlockBinding(program, blockIndex, this.bindingPoint);
        }
        else
        {
            console.warn('Uniform block "' + blockName + '" not found in shader program');
        }
    },

    /**
     * Destroys this UBO and frees its resources.
     *
     * @method Phaser.Renderer.WebGL.Wrappers.WebGLUniformBufferWrapper#destroy
     * @since 4.0.0
     */
    destroy: function ()
    {
        var gl = this.gl;

        if (this.buffer)
        {
            gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }

        this.renderer = null;
        this.gl = null;
    }
});

module.exports = WebGLUniformBufferWrapper;

