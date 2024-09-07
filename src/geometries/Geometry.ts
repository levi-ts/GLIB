import { Renderer } from '../core/Renderer';
import { globalRegistry } from '../index';
import { MeshJSON } from '../interfaces/MeshJSON';

/**
 * A geometry is a set of vertices, normals, texture coordinates, and indices.
 * It can be used to define the shape and appearance of a mesh.
 *
 * @export
 * @class Geometry
 * @typedef {Geometry}
 */
export class Geometry {
    /**
     * The name of the geometry.
     *
     * @public
     * @type {string}
     */
    public name: string;
    /**
     * The index of the material to use for this geometry.
     *
     * @public
     * @type {number}
     */
    public materialindex: number;
    /**
     * The vertices of the geometry.
     *
     * @public
     * @type {Float32Array}
     */
    public vertices: Float32Array;
    /**
     * The normals of the geometry.
     *
     * @public
     * @type {Float32Array}
     */
    public normals: Float32Array;
    /**
     * The texture coordinates of the geometry.
     *
     * @public
     * @type {Float32Array}
     */
    public texturecoords: Float32Array;
    /**
     * The indices of the geometry.
     *
     * @public
     * @type {Uint16Array}
     */
    public indices: Uint16Array;

    /**
     * The vertex buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    public vertexBuffer: WebGLBuffer | null = null;
    /**
     * The normal buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    public normalBuffer: WebGLBuffer | null = null;
    /**
     * The texture coordinate buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    public textureCoordBuffer: WebGLBuffer | null = null;
    /**
     * The index buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    public indexBuffer: WebGLBuffer | null = null;

    /**
     * Creates an instance of Geometry.
     *
     * @constructor
     * @param {MeshJSON} parameters The parameters to create the geometry with.
     */
    constructor(public parameters: MeshJSON) {
        this.name = parameters.name;
        this.materialindex = parameters.materialindex;

        if (!Array.isArray(parameters.vertices) || !Array.isArray(parameters.normals) || !Array.isArray(parameters.faces)) {
            throw new Error('Invalid parameters structure');
        }

        this.vertices = new Float32Array(parameters.vertices);
        this.normals = new Float32Array(parameters.normals);

        if (parameters.texturecoords && Array.isArray(parameters.texturecoords[0])) {
            this.texturecoords = new Float32Array(parameters.texturecoords[0]);
        } else {
            this.texturecoords = new Float32Array([]);
        }

        this.indices = new Uint16Array(parameters.faces.flat());

        const gl = (Object.values(globalRegistry.renderers)[0] as Renderer).gl;
        const program = (Object.values(globalRegistry.renderers)[0] as Renderer).programInfo.program;

        this.vertexBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.textureCoordBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        const posAttribLoc = gl.getAttribLocation(program, 'pos');
        gl.vertexAttribPointer(posAttribLoc, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(posAttribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        const normalAttribLoc = gl.getAttribLocation(program, 'normal');
        gl.vertexAttribPointer(normalAttribLoc, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(normalAttribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.texturecoords, gl.STATIC_DRAW);

        const texCoordAttribLoc = gl.getAttribLocation(program, 'texCoord');
        gl.vertexAttribPointer(texCoordAttribLoc, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(texCoordAttribLoc);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    }
}
