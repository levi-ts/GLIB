/**
 * The Program interface represents a WebGL program.
 *
 * @export
 * @interface Program
 * @typedef {Program}
 */
export interface Program {
    /**
     * The WebGL program.
     *
     * @type {WebGLProgram}
     */
    program: WebGLProgram;
    /**
     * The uniforms of the program.
     *
     * @type {{
     *         matWorld: WebGLUniformLocation | null;
     *         matView: WebGLUniformLocation | null;
     *         matProj: WebGLUniformLocation | null;
     *         ambientColor: WebGLUniformLocation | null;
     *         diffuseColor: WebGLUniformLocation | null;
     *         specularColor: WebGLUniformLocation | null;
     *         emissiveColor: WebGLUniformLocation | null;
     *         ambientIntensity: WebGLUniformLocation | null;
     *         diffuseIntensity: WebGLUniformLocation | null;
     *         specularIntensity: WebGLUniformLocation | null;
     *         emissiveIntensity: WebGLUniformLocation | null;
     *         shininess: WebGLUniformLocation | null;
     *         opacity: WebGLUniformLocation | null;
     *         environmentMap: WebGLUniformLocation | null;
     *     }}
     */
    uniforms: {
        /**
         * The matrix uniform for the world matrix.
         */
        matWorld: WebGLUniformLocation | null;
        /**
         * The matrix uniform for the view matrix.
         */
        matView: WebGLUniformLocation | null;
        /**
         * The matrix uniform for the projection matrix.
         */
        matProj: WebGLUniformLocation | null;
        /**
         * The color uniform for the ambient color.
         */
        ambientColor: WebGLUniformLocation | null;
        /**
         * The color uniform for the diffuse color.
         */
        diffuseColor: WebGLUniformLocation | null;
        /**
         * The color uniform for the specular color.
         */
        specularColor: WebGLUniformLocation | null;
        /**
         * The color uniform for the emissive color.
         */
        emissiveColor: WebGLUniformLocation | null;
        /**
         * The float uniform for the ambient intensity.
         */
        ambientIntensity: WebGLUniformLocation | null;
        /**
         * The float uniform for the diffuse intensity.
         */
        diffuseIntensity: WebGLUniformLocation | null;
        /**
         * The float uniform for the specular intensity.
         */
        specularIntensity: WebGLUniformLocation | null;
        /**
         * The float uniform for the emissive intensity.
         */
        emissiveIntensity: WebGLUniformLocation | null;
        /**
         * The float uniform for the shininess.
         */
        shininess: WebGLUniformLocation | null;
        /**
         * The float uniform for the opacity.
         */
        opacity: WebGLUniformLocation | null;
        /**
         * The sampler2D uniform for the environment map.
         */
        environmentMap: WebGLUniformLocation | null;
    };
}
