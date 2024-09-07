import { PerspectiveCamera } from '../cameras/PerspectiveCamera';
import { fragmentShaderSource, globalRegistry, vertexShaderSource } from '../index';
import { Vector3 } from '../math/Vector3';
import { RendererParameters } from '../interfaces/RendererParameters';
import { randomUUID } from '../utils/randomUUID';
import { GLRenderingContext, UUID } from '../types/types';
import { Program } from '../interfaces/Program';
import { Scene } from './Scene';
import { createProgram } from '../utils/createProgram';

/**
 * The Renderer class is used to render a scene with a given camera.
 *
 * @export
 * @class Renderer
 * @typedef {Renderer}
 */
export class Renderer {
    /**
     * The canvas element that the renderer renders to.
     *
     * @public
     * @type {HTMLCanvasElement}
     */
    public domElement: HTMLCanvasElement;
    /**
     * The WebGL context that the renderer uses to render.
     *
     * @public
     * @type {GLRenderingContext}
     */
    public gl: GLRenderingContext;
    /**
     * The UUID of the renderer.
     *
     * @public
     * @type {UUID}
     */
    public uuid: UUID;
    /**
     * The program info that the renderer uses to render.
     *
     * @public
     * @type {Program}
     */
    public programInfo: Program;

    /**
     * Creates an instance of Renderer.
     *
     * @constructor
     * @param {RendererParameters} [parameters={\}]
     */
    constructor(private parameters: RendererParameters = {}) {
        this.domElement = parameters.canvas ?? document.createElement('canvas');
        this.gl = parameters.context ?? this.domElement.getContext('webgl2', parameters);
        this.uuid = randomUUID();

        globalRegistry.renderers[this.uuid] = this;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);

        this.gl.frontFace(this.gl.CCW);
        this.gl.cullFace(this.gl.BACK);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        var tempProgram = createProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        if (!tempProgram) throw new Error('Failed to create the shader program.');

        this.programInfo = {
            program: tempProgram,
            uniforms: {
                matWorld: this.gl.getUniformLocation(tempProgram, 'matWorld'),
                matView: this.gl.getUniformLocation(tempProgram, 'matView'),
                matProj: this.gl.getUniformLocation(tempProgram, 'matProj'),
                ambientColor: this.gl.getUniformLocation(tempProgram, 'ambientColor'),
                diffuseColor: this.gl.getUniformLocation(tempProgram, 'diffuseColor'),
                specularColor: this.gl.getUniformLocation(tempProgram, 'specularColor'),
                emissiveColor: this.gl.getUniformLocation(tempProgram, 'emissiveColor'),
                ambientIntensity: this.gl.getUniformLocation(tempProgram, 'ambientIntensity'),
                diffuseIntensity: this.gl.getUniformLocation(tempProgram, 'diffuseIntensity'),
                specularIntensity: this.gl.getUniformLocation(tempProgram, 'specularIntensity'),
                emissiveIntensity: this.gl.getUniformLocation(tempProgram, 'emissiveIntensity'),
                shininess: this.gl.getUniformLocation(tempProgram, 'shininess'),
                opacity: this.gl.getUniformLocation(tempProgram, 'opacity'),
                environmentMap: this.gl.getUniformLocation(tempProgram, 'environmentMap'),
            },
        };

        tempProgram = null;

        this.gl.useProgram(this.programInfo.program);
    }

    /**
     * Sets the clear color of the renderer.
     *
     * @public
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @param {number} alpha
     */
    public setClearColor(red: number, green: number, blue: number, alpha: number) {
        this.gl.clearColor(red, green, blue, alpha);
    }

    /**
     * Sets the size of the renderer.
     *
     * @public
     * @param {number} width
     * @param {number} height
     */
    public setSize(width: number, height: number) {
        this.domElement.width = width;
        this.domElement.height = height;

        this.gl.viewport(0, 0, width, height);
    }

    /**
     * Renders a scene with a given camera.
     *
     * @public
     * @param {Scene} scene
     * @param {PerspectiveCamera} camera
     */
    public render(scene: Scene, camera: PerspectiveCamera) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        camera.lookAt(camera.matView, camera.position, new Vector3(), new Vector3(0, 1, 0));

        this.gl.uniformMatrix4fv(this.programInfo.uniforms.matWorld, false, scene.matWorld);
        this.gl.uniformMatrix4fv(this.programInfo.uniforms.matView, false, camera.matView);
        this.gl.uniformMatrix4fv(this.programInfo.uniforms.matProj, false, camera.matProj);

        for (const mesh of scene.children) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.geometry.vertexBuffer);
            const posAttribLoc = this.gl.getAttribLocation(this.programInfo.program, 'pos');
            this.gl.vertexAttribPointer(posAttribLoc, 3, this.gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(posAttribLoc);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.geometry.normalBuffer);
            const normalAttribLoc = this.gl.getAttribLocation(this.programInfo.program, 'normal');
            this.gl.vertexAttribPointer(normalAttribLoc, 3, this.gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(normalAttribLoc);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.geometry.textureCoordBuffer);
            const texCoordAttribLoc = this.gl.getAttribLocation(this.programInfo.program, 'texCoord');
            this.gl.vertexAttribPointer(texCoordAttribLoc, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(texCoordAttribLoc);

            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.geometry.indexBuffer);

            this.gl.uniform3fv(this.programInfo.uniforms.ambientColor, mesh.material.ambientColor);
            this.gl.uniform3fv(this.programInfo.uniforms.diffuseColor, mesh.material.diffuseColor);
            this.gl.uniform3fv(this.programInfo.uniforms.specularColor, mesh.material.specularColor);
            this.gl.uniform3fv(this.programInfo.uniforms.emissiveColor, mesh.material.emissiveColor);
            this.gl.uniform1f(this.programInfo.uniforms.ambientIntensity, mesh.material.ambientIntensity);
            this.gl.uniform1f(this.programInfo.uniforms.diffuseIntensity, mesh.material.diffuseIntensity);
            this.gl.uniform1f(this.programInfo.uniforms.specularIntensity, mesh.material.specularIntensity);
            this.gl.uniform1f(this.programInfo.uniforms.emissiveIntensity, mesh.material.emissiveIntensity);
            this.gl.uniform1f(this.programInfo.uniforms.shininess, mesh.material.shininess);
            this.gl.uniform1f(this.programInfo.uniforms.opacity, mesh.material.opacity);

            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, mesh.material.diffuseMap);

            this.gl.activeTexture(this.gl.TEXTURE1);
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, mesh.material.environmentMap);
            this.gl.uniform1i(this.programInfo.uniforms.environmentMap, 1);

            this.gl.drawElements(this.gl.TRIANGLES, mesh.geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }
}
