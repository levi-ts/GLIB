import { GLRenderingContext } from '../types/types';
import { createCompileShader } from './createCompileShader';

/**
 * Creates a WebGL program from a given vertex and fragment shader source.
 *
 * @export
 * @param {GLRenderingContext} gl The WebGL rendering context.
 * @param {string} vertexShaderSource The source code of the vertex shader.
 * @param {string} fragmentShaderSource The source code of the fragment shader.
 * @returns {WebGLProgram | null} The created WebGL program or null if the creation failed.
 */
export function createProgram(gl: GLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    const vertexShader: WebGLShader | null = createCompileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader: WebGLShader | null = createCompileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return null;

    const program: WebGLProgram | null = gl.createProgram();
    if (!program) {
        console.error('Error creating WebGL program');
        return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const infoLog: string | null = gl.getProgramInfoLog(program);
        console.error('Program linking failed: ' + infoLog);

        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        return null;
    }

    return program;
}
