import { GLRenderingContext } from '../types/types';

/**
 * Compiles a shader from a given source and type.
 *
 * @export
 * @param {GLRenderingContext} gl The WebGL rendering context.
 * @param {string} shaderSource The source code of the shader to be compiled.
 * @param {number} type The type of the shader. Can be either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
 * @returns {(WebGLShader | null)} The compiled shader or null if the compilation failed.
 */
export function createCompileShader(gl: GLRenderingContext, shaderSource: string, type: number) {
    const shader = gl.createShader(type);
    if (!shader) {
        console.error('Error creating shader');
        return null;
    }

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const infoLog: string | null = gl.getShaderInfoLog(shader);
        console.error('Shader compilation failed: ' + infoLog);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
