/******/ var __webpack_modules__ = ({

/***/ "./src/cameras/Camera.ts":
/*!*******************************!*\
  !*** ./src/cameras/Camera.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");


/**
 * Represents a camera which can be used to render a scene.
 *
 * @export
 * @class Camera
 * @typedef {Camera}
 */
class Camera {
    /**
     * The position of the camera in the scene.
     *
     * @public
     * @type {Vector3}
     */
    position;
    /**
     * The view matrix of the camera.
     *
     * @public
     * @type {Matrix4}
     */
    matView;
    /**
     * Creates an instance of Camera.
     *
     * @constructor
     */
    constructor() {
        this.position = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3();
        this.matView = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__.Matrix4();
    }
    /**
     * Sets the view matrix of the camera based on the given parameters.
     *
     * @param {Matrix4} out The matrix in which the view matrix should be stored.
     * @param {Vector3} eye The position of the camera.
     * @param {Vector3} center The point the camera is looking at.
     * @param {Vector3} up The up vector of the camera.
     * @returns {Matrix4} The matrix in which the view matrix has been stored.
     */
    lookAt = (out, eye, center, up) => {
        return out.lookAt(eye, center, up);
    };
    /**
     * Moves the camera forward by the given velocity.
     *
     * @param {number} vel The velocity to move the camera forward.
     * @returns {this}
     */
    moveForward = (vel) => {
        const forward = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(this.matView[2], this.matView[6], this.matView[10]);
        const direction = forward.divide(forward.magnitude());
        this.position[0] += vel * direction[0];
        this.position[1] += vel * direction[1];
        this.position[2] += vel * direction[2];
        return this;
    };
    /**
     * Moves the camera backward by the given velocity.
     *
     * @param {number} vel The velocity to move the camera backward.
     * @returns {this}
     */
    moveBackward = (vel) => {
        const forward = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(this.matView[2], this.matView[6], this.matView[10]);
        const direction = forward.divide(forward.magnitude());
        this.position[0] -= vel * direction[0];
        this.position[1] -= vel * direction[1];
        this.position[2] -= vel * direction[2];
        return this;
    };
    /**
     * Moves the camera to the left by the given velocity.
     *
     * @param {number} vel The velocity to move the camera to the left.
     * @returns {this}
     */
    moveLeft = (vel) => {
        const right = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(this.matView[0], this.matView[4], this.matView[8]);
        const direction = right.divide(right.magnitude());
        this.position[0] -= vel * direction[0];
        this.position[1] -= vel * direction[1];
        this.position[2] -= vel * direction[2];
        return this;
    };
    /**
     * Moves the camera to the right by the given velocity.
     *
     * @param {number} vel The velocity to move the camera to the right.
     * @returns {this}
     */
    moveRight = (vel) => {
        const right = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(this.matView[0], this.matView[4], this.matView[8]);
        const direction = right.divide(right.magnitude());
        this.position[0] += vel * direction[0];
        this.position[1] += vel * direction[1];
        this.position[2] += vel * direction[2];
        return this;
    };
    /**
     * Moves the camera up by the given velocity.
     *
     * @param {number} vel The velocity to move the camera up.
     * @returns {this}
     */
    moveUp = (vel) => {
        this.position[1] += vel;
        return this;
    };
    /**
     * Moves the camera down by the given velocity.
     *
     * @param {number} vel The velocity to move the camera down.
     * @returns {this}
     */
    moveDown = (vel) => {
        this.position[1] -= vel;
        return this;
    };
}


/***/ }),

/***/ "./src/cameras/PerspectiveCamera.ts":
/*!******************************************!*\
  !*** ./src/cameras/PerspectiveCamera.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerspectiveCamera: () => (/* binding */ PerspectiveCamera)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/randomUUID */ "./src/utils/randomUUID.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Camera */ "./src/cameras/Camera.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index__WEBPACK_IMPORTED_MODULE_0__]);
_index__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





/**
 * A perspective camera.
 *
 * @export
 * @class PerspectiveCamera
 * @typedef {PerspectiveCamera}
 * @extends {Camera}
 */
class PerspectiveCamera extends _Camera__WEBPACK_IMPORTED_MODULE_4__.Camera {
    fov;
    aspect;
    near;
    far;
    /**
     * The projection matrix of the camera.
     *
     * @public
     * @type {Matrix4}
     */
    matProj;
    /**
     * The uuid of the camera.
     *
     * @public
     * @type {UUID}
     */
    uuid;
    /**
     * Creates an instance of PerspectiveCamera.
     *
     * @constructor
     * @param {number} fov The vertical field of view of the camera in degrees.
     * @param {number} aspect The aspect ratio of the camera.
     * @param {number} near The near clipping plane of the camera.
     * @param {number} far The far clipping plane of the camera.
     */
    constructor(fov, aspect, near, far) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.matProj = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__.Matrix4().identity();
        this.perspective(this.matProj, (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.toRadian)(this.fov), this.aspect, this.near, this.far);
        this.uuid = (0,_utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__.randomUUID)();
        _index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.cameras[this.uuid] = this;
    }
    /**
     * Sets the projection matrix of the camera.
     *
     * @param {Matrix4} out The projection matrix.
     * @param {number} fovy The vertical field of view of the camera in radians.
     * @param {number} aspect The aspect ratio of the camera.
     * @param {number} near The near clipping plane of the camera.
     * @param {number} far The far clipping plane of the camera.
     * @returns {Matrix4} The projection matrix.
     */
    perspective = (out, fovy, aspect, near, far) => {
        let f = 1.0 / Math.tan(fovy / 2), nf;
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
            nf = 1 / (near - far);
            out[10] = (far + near) * nf;
            out[14] = 2 * far * near * nf;
        }
        else {
            out[10] = -1;
            out[14] = -2 * near;
        }
        return out;
    };
    /**
     * Updates the projection matrix of the camera.
     */
    updatePerspective = () => {
        this.perspective(this.matProj, (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.toRadian)(this.fov), this.aspect, this.near, this.far);
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/core/Mesh.ts":
/*!**************************!*\
  !*** ./src/core/Mesh.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mesh: () => (/* binding */ Mesh)
/* harmony export */ });
/**
 * A mesh is an object which is composed of a geometry and a material.
 *
 * @export
 * @class Mesh
 * @typedef {Mesh}
 */
class Mesh {
    geometry;
    material;
    /**
     * Creates an instance of Mesh.
     *
     * @constructor
     * @param {Geometry} geometry The geometry of the mesh.
     * @param {Material} material The material of the mesh.
     */
    constructor(geometry, material) {
        this.geometry = geometry;
        this.material = material;
        this.geometry = geometry;
        this.material = material;
    }
}


/***/ }),

/***/ "./src/core/Renderer.ts":
/*!******************************!*\
  !*** ./src/core/Renderer.ts ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Renderer: () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/randomUUID */ "./src/utils/randomUUID.ts");
/* harmony import */ var _utils_createProgram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/createProgram */ "./src/utils/createProgram.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index__WEBPACK_IMPORTED_MODULE_0__]);
_index__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/**
 * The Renderer class is used to render a scene with a given camera.
 *
 * @export
 * @class Renderer
 * @typedef {Renderer}
 */
class Renderer {
    parameters;
    /**
     * The canvas element that the renderer renders to.
     *
     * @public
     * @type {HTMLCanvasElement}
     */
    domElement;
    /**
     * The WebGL context that the renderer uses to render.
     *
     * @public
     * @type {GLRenderingContext}
     */
    gl;
    /**
     * The UUID of the renderer.
     *
     * @public
     * @type {UUID}
     */
    uuid;
    /**
     * The program info that the renderer uses to render.
     *
     * @public
     * @type {Program}
     */
    programInfo;
    /**
     * Creates an instance of Renderer.
     *
     * @constructor
     * @param {RendererParameters} [parameters={\}]
     */
    constructor(parameters = {}) {
        this.parameters = parameters;
        this.domElement = parameters.canvas ?? document.createElement('canvas');
        this.gl = parameters.context ?? this.domElement.getContext('webgl2', parameters);
        this.uuid = (0,_utils_randomUUID__WEBPACK_IMPORTED_MODULE_2__.randomUUID)();
        _index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers[this.uuid] = this;
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);
        this.gl.frontFace(this.gl.CCW);
        this.gl.cullFace(this.gl.BACK);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        var tempProgram = (0,_utils_createProgram__WEBPACK_IMPORTED_MODULE_3__.createProgram)(this.gl, _index__WEBPACK_IMPORTED_MODULE_0__.vertexShaderSource, _index__WEBPACK_IMPORTED_MODULE_0__.fragmentShaderSource);
        if (!tempProgram)
            throw new Error('Failed to create the shader program.');
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
    setClearColor(red, green, blue, alpha) {
        this.gl.clearColor(red, green, blue, alpha);
    }
    /**
     * Sets the size of the renderer.
     *
     * @public
     * @param {number} width
     * @param {number} height
     */
    setSize(width, height) {
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
    render(scene, camera) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        camera.lookAt(camera.matView, camera.position, new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(), new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0));
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/core/Scene.ts":
/*!***************************!*\
  !*** ./src/core/Scene.ts ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scene: () => (/* binding */ Scene)
/* harmony export */ });
/* harmony import */ var _geometries_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometries/Geometry */ "./src/geometries/Geometry.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _materials_Material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../materials/Material */ "./src/materials/Material.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _models_Model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/Model */ "./src/models/Model.ts");
/* harmony import */ var _utils_randomUUID__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/randomUUID */ "./src/utils/randomUUID.ts");
/* harmony import */ var _Mesh__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Mesh */ "./src/core/Mesh.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_geometries_Geometry__WEBPACK_IMPORTED_MODULE_0__, _index__WEBPACK_IMPORTED_MODULE_1__, _materials_Material__WEBPACK_IMPORTED_MODULE_2__]);
([_geometries_Geometry__WEBPACK_IMPORTED_MODULE_0__, _index__WEBPACK_IMPORTED_MODULE_1__, _materials_Material__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







/**
 * A scene is an object which contains a list of meshes and a world matrix.
 *
 * @export
 * @class Scene
 * @typedef {Scene}
 */
class Scene {
    /**
     * An array of meshes which are part of the scene.
     *
     * @public
     * @type {Mesh[]}
     */
    children;
    /**
     * The world matrix of the scene.
     *
     * @public
     * @type {Matrix4}
     */
    matWorld;
    /**
     * The UUID of the scene.
     *
     * @public
     * @type {UUID}
     */
    uuid;
    /**
     * Creates an instance of Scene.
     *
     * @constructor
     */
    constructor() {
        this.children = [];
        this.matWorld = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__.Matrix4().identity();
        this.uuid = (0,_utils_randomUUID__WEBPACK_IMPORTED_MODULE_5__.randomUUID)();
        _index__WEBPACK_IMPORTED_MODULE_1__.globalRegistry.scenes[this.uuid] = this;
    }
    /**
     * Adds a mesh or a model to the scene.
     *
     * @public
     * @param {Mesh|Model} child The mesh or model which should be added to the scene.
     */
    add(child) {
        if (child instanceof _Mesh__WEBPACK_IMPORTED_MODULE_6__.Mesh) {
            this.children.push(child);
        }
        else if (child instanceof _models_Model__WEBPACK_IMPORTED_MODULE_4__.Model) {
            for (let i = 0; i < child.data.meshes.length; i++) {
                const geometry = new _geometries_Geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry(child.data.meshes[i]);
                const material = new _materials_Material__WEBPACK_IMPORTED_MODULE_2__.Material(child.data.materials[child.data.meshes[i].materialindex]);
                const mesh = new _Mesh__WEBPACK_IMPORTED_MODULE_6__.Mesh(geometry, material);
                this.children.push(mesh);
            }
        }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/geometries/Geometry.ts":
/*!************************************!*\
  !*** ./src/geometries/Geometry.ts ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Geometry: () => (/* binding */ Geometry)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index__WEBPACK_IMPORTED_MODULE_0__]);
_index__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * A geometry is a set of vertices, normals, texture coordinates, and indices.
 * It can be used to define the shape and appearance of a mesh.
 *
 * @export
 * @class Geometry
 * @typedef {Geometry}
 */
class Geometry {
    parameters;
    /**
     * The name of the geometry.
     *
     * @public
     * @type {string}
     */
    name;
    /**
     * The index of the material to use for this geometry.
     *
     * @public
     * @type {number}
     */
    materialindex;
    /**
     * The vertices of the geometry.
     *
     * @public
     * @type {Float32Array}
     */
    vertices;
    /**
     * The normals of the geometry.
     *
     * @public
     * @type {Float32Array}
     */
    normals;
    /**
     * The texture coordinates of the geometry.
     *
     * @public
     * @type {Float32Array}
     */
    texturecoords;
    /**
     * The indices of the geometry.
     *
     * @public
     * @type {Uint16Array}
     */
    indices;
    /**
     * The vertex buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    vertexBuffer = null;
    /**
     * The normal buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    normalBuffer = null;
    /**
     * The texture coordinate buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    textureCoordBuffer = null;
    /**
     * The index buffer of the geometry.
     *
     * @public
     * @type {(WebGLBuffer | null)}
     */
    indexBuffer = null;
    /**
     * Creates an instance of Geometry.
     *
     * @constructor
     * @param {MeshJSON} parameters The parameters to create the geometry with.
     */
    constructor(parameters) {
        this.parameters = parameters;
        this.name = parameters.name;
        this.materialindex = parameters.materialindex;
        if (!Array.isArray(parameters.vertices) || !Array.isArray(parameters.normals) || !Array.isArray(parameters.faces)) {
            throw new Error('Invalid parameters structure');
        }
        this.vertices = new Float32Array(parameters.vertices);
        this.normals = new Float32Array(parameters.normals);
        if (parameters.texturecoords && Array.isArray(parameters.texturecoords[0])) {
            this.texturecoords = new Float32Array(parameters.texturecoords[0]);
        }
        else {
            this.texturecoords = new Float32Array([]);
        }
        this.indices = new Uint16Array(parameters.faces.flat());
        const gl = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].gl;
        const program = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].programInfo.program;
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Geometry: () => (/* reexport safe */ _geometries_Geometry__WEBPACK_IMPORTED_MODULE_4__.Geometry),
/* harmony export */   Loader: () => (/* reexport safe */ _loaders_Loader__WEBPACK_IMPORTED_MODULE_5__.Loader),
/* harmony export */   Material: () => (/* reexport safe */ _materials_Material__WEBPACK_IMPORTED_MODULE_10__.Material),
/* harmony export */   Matrix4: () => (/* reexport safe */ _math_Matrix4__WEBPACK_IMPORTED_MODULE_11__.Matrix4),
/* harmony export */   Mesh: () => (/* reexport safe */ _core_Mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh),
/* harmony export */   Model: () => (/* reexport safe */ _models_Model__WEBPACK_IMPORTED_MODULE_13__.Model),
/* harmony export */   ModelLoader: () => (/* reexport safe */ _loaders_ModelLoader__WEBPACK_IMPORTED_MODULE_6__.ModelLoader),
/* harmony export */   PerspectiveCamera: () => (/* reexport safe */ _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera),
/* harmony export */   Renderer: () => (/* reexport safe */ _core_Renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer),
/* harmony export */   Scene: () => (/* reexport safe */ _core_Scene__WEBPACK_IMPORTED_MODULE_3__.Scene),
/* harmony export */   TextLoader: () => (/* reexport safe */ _loaders_TextLoader__WEBPACK_IMPORTED_MODULE_7__.TextLoader),
/* harmony export */   TextureCubeLoader: () => (/* reexport safe */ _loaders_TextureCubeLoader__WEBPACK_IMPORTED_MODULE_8__.TextureCubeLoader),
/* harmony export */   TextureLoader: () => (/* reexport safe */ _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_9__.TextureLoader),
/* harmony export */   Vector3: () => (/* reexport safe */ _math_Vector3__WEBPACK_IMPORTED_MODULE_12__.Vector3),
/* harmony export */   fragmentShaderSource: () => (/* binding */ fragmentShaderSource),
/* harmony export */   globalRegistry: () => (/* binding */ globalRegistry),
/* harmony export */   vertexShaderSource: () => (/* binding */ vertexShaderSource)
/* harmony export */ });
/* harmony import */ var _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cameras/PerspectiveCamera */ "./src/cameras/PerspectiveCamera.ts");
/* harmony import */ var _core_Mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Mesh */ "./src/core/Mesh.ts");
/* harmony import */ var _core_Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Renderer */ "./src/core/Renderer.ts");
/* harmony import */ var _core_Scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/Scene */ "./src/core/Scene.ts");
/* harmony import */ var _geometries_Geometry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./geometries/Geometry */ "./src/geometries/Geometry.ts");
/* harmony import */ var _loaders_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loaders/Loader */ "./src/loaders/Loader.ts");
/* harmony import */ var _loaders_ModelLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loaders/ModelLoader */ "./src/loaders/ModelLoader.ts");
/* harmony import */ var _loaders_TextLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loaders/TextLoader */ "./src/loaders/TextLoader.ts");
/* harmony import */ var _loaders_TextureCubeLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loaders/TextureCubeLoader */ "./src/loaders/TextureCubeLoader.ts");
/* harmony import */ var _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loaders/TextureLoader */ "./src/loaders/TextureLoader.ts");
/* harmony import */ var _materials_Material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./materials/Material */ "./src/materials/Material.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _models_Model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./models/Model */ "./src/models/Model.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__, _core_Renderer__WEBPACK_IMPORTED_MODULE_2__, _core_Scene__WEBPACK_IMPORTED_MODULE_3__, _geometries_Geometry__WEBPACK_IMPORTED_MODULE_4__, _loaders_Loader__WEBPACK_IMPORTED_MODULE_5__, _loaders_TextureCubeLoader__WEBPACK_IMPORTED_MODULE_8__, _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_9__, _materials_Material__WEBPACK_IMPORTED_MODULE_10__]);
([_cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__, _core_Renderer__WEBPACK_IMPORTED_MODULE_2__, _core_Scene__WEBPACK_IMPORTED_MODULE_3__, _geometries_Geometry__WEBPACK_IMPORTED_MODULE_4__, _loaders_Loader__WEBPACK_IMPORTED_MODULE_5__, _loaders_TextureCubeLoader__WEBPACK_IMPORTED_MODULE_8__, _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_9__, _materials_Material__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















/**
 * A global registry which keeps track of all the objects in the scene.
 *
 * @type {{
 *     scenes: { [key: string]: Scene },
 *     cameras: { [key: string]: PerspectiveCamera },
 *     renderers: { [key: string]: Renderer },
 *     loaders: { [key: string]: Loader },
 *     geometries: { [key: string]: Geometry },
 *     materials: { [key: string]: Material },
 *     meshes: { [key: string]: Mesh },
 *     models: { [key: string]: Model }
 * \}\}
 */
const globalRegistry = {
    scenes: {},
    cameras: {},
    renderers: {},
    loaders: {},
    geometries: {},
    materials: {},
    meshes: {},
    models: {},
};
/**
 * The source code for the vertex shader.
 *
 * @type {string}
 */
const vertexShaderSource = await new _loaders_Loader__WEBPACK_IMPORTED_MODULE_5__.Loader().loadText('../src/shaders/vertexShader.glsl');
/**
 * The source code for the fragment shader.
 *
 * @type {string}
 */
const fragmentShaderSource = await new _loaders_Loader__WEBPACK_IMPORTED_MODULE_5__.Loader().loadText('../src/shaders/fragmentShader.glsl');

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/loaders/Loader.ts":
/*!*******************************!*\
  !*** ./src/loaders/Loader.ts ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Loader: () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getPropertyValue */ "./src/utils/getPropertyValue.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index__WEBPACK_IMPORTED_MODULE_0__]);
_index__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/**
 * A class which provides functionality for loading assets.
 *
 * @export
 * @class Loader
 * @typedef {Loader}
 */
class Loader {
    /**
     * Loads a text file from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<string>} A promise containing the contents of the file.
     */
    async loadText(url) {
        const response = await fetch(url);
        const text = await response.text();
        return text;
    }
    /**
     * Loads a 3D model from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<AssimpModelJSON>} A promise containing the loaded model.
     */
    async loadModel(url) {
        const response = await fetch(url);
        const model = await response.json();
        const materials = [];
        for (let i = 0; i < model.materials.length; i++) {
            const material = model.materials[i];
            materials[i] = {
                ambientColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$clr.ambient', [1, 1, 1]),
                ambientIntensity: 1,
                ambientMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$raw.AmbientColor|file', null),
                diffuseColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$clr.diffuse', [1, 1, 1]),
                diffuseIntensity: 1,
                diffuseMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$raw.DiffuseColor|file', null),
                specularColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$clr.specular', [1, 1, 1]),
                specularIntensity: 1,
                specularMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$raw.SpecularColor|file', null),
                emissiveColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$clr.emissive', [1, 1, 1]),
                emissiveIntensity: 1,
                emissiveMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$raw.EmissiveColor|file', null),
                shininess: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$mat.shininess', 20),
                opacity: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$mat.opacity', 1),
                normalMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$raw.NormalMap|file', null),
                roughnessMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_1__.getPropertyValue)(material, '$raw.ShininessExponent|file', null),
                environmentMap: null,
            };
        }
        model.materials = materials;
        return model;
    }
    /**
     * Loads a json file from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<string>} A promise containing the contents of the file.
     */
    async loadJSON(url) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
    /**
     * Loads a 2D texture from a given URL.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    loadTexture(url, onload) {
        const gl = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const image = new Image();
        image.src = url;
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.bindTexture(gl.TEXTURE_2D, null);
            if (onload)
                onload();
        };
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return texture;
    }
    /**
     * Loads a cube map texture from a given URL.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    loadTextureCube(url, onload) {
        const gl = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].gl;
        const faces = [
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, url: `${url}/posx.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, url: `${url}/negx.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, url: `${url}/posy.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, url: `${url}/negy.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, url: `${url}/posz.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, url: `${url}/negz.jpg` },
        ];
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        faces.forEach((face) => {
            const { target, url } = face;
            const image = new Image();
            image.src = url;
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                if (onload)
                    onload();
            };
        });
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, 32882, gl.CLAMP_TO_EDGE);
        return texture;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/loaders/ModelLoader.ts":
/*!************************************!*\
  !*** ./src/loaders/ModelLoader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelLoader: () => (/* binding */ ModelLoader)
/* harmony export */ });
/* harmony import */ var _utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getPropertyValue */ "./src/utils/getPropertyValue.ts");

/**
 * The ModelLoader class is a utility class for loading 3D models from a given URL.
 *
 * @export
 * @class ModelLoader
 * @typedef {ModelLoader}
 */
class ModelLoader {
    /**
     * Loads a 3D model from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {AssimpModelJSON} A promise containing the loaded model.
     */
    async load(url) {
        const response = await fetch(url);
        const model = await response.json();
        const materials = [];
        for (let i = 0; i < model.materials.length; i++) {
            const material = model.materials[i];
            materials[i] = {
                ambientColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$clr.ambient', [1, 1, 1]),
                ambientIntensity: 1,
                ambientMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$raw.AmbientColor|file', null),
                diffuseColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$clr.diffuse', [1, 1, 1]),
                diffuseIntensity: 1,
                diffuseMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$raw.DiffuseColor|file', null),
                specularColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$clr.specular', [1, 1, 1]),
                specularIntensity: 1,
                specularMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$raw.SpecularColor|file', null),
                emissiveColor: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$clr.emissive', [1, 1, 1]),
                emissiveIntensity: 1,
                emissiveMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$raw.EmissiveColor|file', null),
                shininess: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$mat.shininess', 20),
                opacity: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$mat.opacity', 1),
                normalMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$raw.NormalMap|file', null),
                roughnessMap: (0,_utils_getPropertyValue__WEBPACK_IMPORTED_MODULE_0__.getPropertyValue)(material, '$raw.ShininessExponent|file', null),
                environmentMap: null,
            };
        }
        model.materials = materials;
        return model;
    }
}


/***/ }),

/***/ "./src/loaders/TextLoader.ts":
/*!***********************************!*\
  !*** ./src/loaders/TextLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextLoader: () => (/* binding */ TextLoader)
/* harmony export */ });
/**
 * The TextLoader class is a utility class for loading text files from a given URL.
 *
 * @export
 * @class TextLoader
 * @typedef {TextLoader}
 */
class TextLoader {
    /**
     * Loads a text file from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<string>} A promise containing the contents of the file.
     */
    async load(url) {
        const response = await fetch(url);
        const text = await response.text();
        return text;
    }
}


/***/ }),

/***/ "./src/loaders/TextureCubeLoader.ts":
/*!******************************************!*\
  !*** ./src/loaders/TextureCubeLoader.ts ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextureCubeLoader: () => (/* binding */ TextureCubeLoader)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index__WEBPACK_IMPORTED_MODULE_0__]);
_index__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * The TextureCubeLoader class is a utility class for loading cube map textures from a given URL.
 *
 * @export
 * @class TextureCubeLoader
 * @typedef {TextureCubeLoader}
 */
class TextureCubeLoader {
    /**
     * Loads a cube map texture from a given URL.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    load(url, onload) {
        const gl = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].gl;
        const faces = [
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, url: `${url}/posx.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, url: `${url}/negx.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, url: `${url}/posy.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, url: `${url}/negy.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, url: `${url}/posz.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, url: `${url}/negz.jpg` },
        ];
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        faces.forEach((face) => {
            const { target, url } = face;
            const image = new Image();
            image.src = url;
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                if (onload)
                    onload();
            };
        });
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, 32882, gl.CLAMP_TO_EDGE);
        return texture;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/loaders/TextureLoader.ts":
/*!**************************************!*\
  !*** ./src/loaders/TextureLoader.ts ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextureLoader: () => (/* binding */ TextureLoader)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index__WEBPACK_IMPORTED_MODULE_0__]);
_index__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * TextureLoader is a class that loads and creates a WebGLTexture from a given URL.
 *
 * @export
 * @class TextureLoader
 * @typedef {TextureLoader}
 */
class TextureLoader {
    /**
     * Loads a texture from a given URL and creates a WebGLTexture.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    load(url, onload) {
        const gl = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const image = new Image();
        image.src = url;
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.bindTexture(gl.TEXTURE_2D, null);
            if (onload)
                onload();
        };
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return texture;
    }
    /**
     * Creates a white 1x1 texture.
     *
     * @public
     * @returns {WebGLTexture} The white 1x1 texture.
     */
    null() {
        const gl = Object.values(_index__WEBPACK_IMPORTED_MODULE_0__.globalRegistry.renderers)[0].gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const whitePixel = new Uint8Array([255, 255, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
        return texture;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/materials/Material.ts":
/*!***********************************!*\
  !*** ./src/materials/Material.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Material: () => (/* binding */ Material)
/* harmony export */ });
/* harmony import */ var _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loaders/Loader */ "./src/loaders/Loader.ts");
/* harmony import */ var _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loaders/TextureLoader */ "./src/loaders/TextureLoader.ts");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_loaders_Loader__WEBPACK_IMPORTED_MODULE_0__, _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__]);
([_loaders_Loader__WEBPACK_IMPORTED_MODULE_0__, _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/**
 * A material is a collection of properties that can be used to define the appearance of a mesh.
 * Properties include ambient color, diffuse color, specular color, emissive color, shininess, opacity,
 * and texture coordinates.
 *
 * @export
 * @class Material
 * @typedef {Material}
 */
class Material {
    parameters1;
    parameters2;
    /**
     * The ambient color of the material.
     *
     * @public
     * @type {number[]}
     */
    ambientColor;
    /**
     * The ambient intensity of the material.
     *
     * @public
     * @type {number}
     */
    ambientIntensity;
    /**
     * The ambient texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    ambientMap;
    /**
     * The diffuse color of the material.
     *
     * @public
     * @type {number[]}
     */
    diffuseColor;
    /**
     * The diffuse intensity of the material.
     *
     * @public
     * @type {number}
     */
    diffuseIntensity;
    /**
     * The diffuse texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    diffuseMap;
    /**
     * The specular color of the material.
     *
     * @public
     * @type {number[]}
     */
    specularColor;
    /**
     * The specular intensity of the material.
     *
     * @public
     * @type {number}
     */
    specularIntensity;
    /**
     * The specular texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    specularMap;
    /**
     * The emissive color of the material.
     *
     * @public
     * @type {number[]}
     */
    emissiveColor;
    /**
     * The emissive intensity of the material.
     *
     * @public
     * @type {number}
     */
    emissiveIntensity;
    /**
     * The emissive texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    emissiveMap;
    /**
     * The shininess of the material.
     *
     * @public
     * @type {number}
     */
    shininess;
    /**
     * The opacity of the material.
     *
     * @public
     * @type {number}
     */
    opacity;
    /**
     * The normal texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    normalMap;
    /**
     * The roughness texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    roughnessMap;
    /**
     * The environment texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    environmentMap;
    /**
     * Creates an instance of Material.
     *
     * @constructor
     * @param {MaterialJSON} [parameters1={}]
     * @param {MaterialJSON\} [parameters2={\}]
     */
    constructor(parameters1 = {}, parameters2 = {}) {
        this.parameters1 = parameters1;
        this.parameters2 = parameters2;
        this.ambientColor = this.removeAlpha(parameters1.ambientColor ?? [1, 1, 1]);
        this.ambientIntensity = parameters1.ambientIntensity ?? 1;
        this.ambientMap = typeof parameters1.ambientMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTexture(parameters1.ambientMap) : parameters1.ambientMap ?? new _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().null();
        this.diffuseColor = this.removeAlpha(parameters1.diffuseColor ?? [1, 1, 1]);
        this.diffuseIntensity = parameters1.diffuseIntensity ?? 1;
        this.diffuseMap = typeof parameters1.diffuseMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTexture(parameters1.diffuseMap) : parameters1.diffuseMap ?? new _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().null();
        this.specularColor = this.removeAlpha(parameters1.specularColor ?? [1, 1, 1]);
        this.specularIntensity = parameters1.specularIntensity ?? 1;
        this.specularMap = typeof parameters1.specularMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTexture(parameters1.specularMap) : parameters1.specularMap ?? new _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().null();
        this.emissiveColor = this.removeAlpha(parameters1.emissiveColor ?? [1, 1, 1]);
        this.emissiveIntensity = parameters1.emissiveIntensity ?? 1;
        this.emissiveMap = typeof parameters1.emissiveMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTexture(parameters1.emissiveMap) : parameters1.emissiveMap ?? new _loaders_TextureLoader__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().null();
        this.shininess = parameters1.shininess ?? 20;
        this.opacity = parameters1.opacity ?? 1;
        this.normalMap = typeof parameters1.normalMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTexture(parameters1.normalMap) : parameters1.normalMap ?? null;
        this.roughnessMap = typeof parameters1.roughnessMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTexture(parameters1.roughnessMap) : parameters1.roughnessMap ?? null;
        this.environmentMap = typeof parameters1.environmentMap === 'string' ? new _loaders_Loader__WEBPACK_IMPORTED_MODULE_0__.Loader().loadTextureCube(parameters1.environmentMap) : parameters1.environmentMap ?? null;
        Object.assign(this, parameters2);
    }
    /**
     * Removes the alpha channel from a color.
     *
     * @private
     * @param {number[]} color The color to remove the alpha channel from.
     * @returns {number[]} The color without the alpha channel.
     */
    removeAlpha(color) {
        return color.length === 4 ? color.slice(0, 3) : color;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/math/Matrix4.ts":
/*!*****************************!*\
  !*** ./src/math/Matrix4.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Matrix4: () => (/* binding */ Matrix4)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");

/**
 * ${1:Description placeholder}
 *
 * @export
 * @class Matrix4
 * @typedef {Matrix4}
 * @extends {Float32Array}
 */
class Matrix4 extends Float32Array {
    /**
     * Creates an instance of Matrix4.
     *
     * @constructor
     */
    constructor() {
        super(16);
        this.identity();
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {this}
     */
    identity() {
        this.fill(0);
        this[0] = this[5] = this[10] = this[15] = 1;
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Vector3} eye
     * @param {Vector3} center
     * @param {Vector3} up
     * @returns {this}
     */
    lookAt(eye, center, up) {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        const [eyex, eyey, eyez] = eye;
        const [upx, upy, upz] = up;
        const [centerx, centery, centerz] = center;
        if (Math.abs(eyex - centerx) < _utils_constants__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyey - centery) < _utils_constants__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyez - centerz) < _utils_constants__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
            return this.identity();
        }
        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;
        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.hypot(x0, x1, x2);
        if (len === 0) {
            x0 = x1 = x2 = 0;
        }
        else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.hypot(y0, y1, y2);
        if (len === 0) {
            y0 = y1 = y2 = 0;
        }
        else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        this.set([x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0, -(x0 * eyex + x1 * eyey + x2 * eyez), -(y0 * eyex + y1 * eyey + y2 * eyez), -(z0 * eyex + z1 * eyey + z2 * eyez), 1]);
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @param {Vector3} axis
     * @returns {this}
     */
    rotate(rad, axis) {
        let [x, y, z] = axis;
        let len = Math.hypot(x, y, z);
        if (len < _utils_constants__WEBPACK_IMPORTED_MODULE_0__.EPSILON)
            return this;
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;
        const a00 = this[0], a01 = this[1], a02 = this[2], a03 = this[3];
        const a10 = this[4], a11 = this[5], a12 = this[6], a13 = this[7];
        const a20 = this[8], a21 = this[9], a22 = this[10], a23 = this[11];
        const b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
        this.set([
            a00 * b00 + a10 * b01 + a20 * b02,
            a01 * b00 + a11 * b01 + a21 * b02,
            a02 * b00 + a12 * b01 + a22 * b02,
            a03 * b00 + a13 * b01 + a23 * b02,
            a00 * b10 + a10 * b11 + a20 * b12,
            a01 * b10 + a11 * b11 + a21 * b12,
            a02 * b10 + a12 * b11 + a22 * b12,
            a03 * b10 + a13 * b11 + a23 * b12,
            a00 * b20 + a10 * b21 + a20 * b22,
            a01 * b20 + a11 * b21 + a21 * b22,
            a02 * b20 + a12 * b21 + a22 * b22,
            a03 * b20 + a13 * b21 + a23 * b22,
            this[12],
            this[13],
            this[14],
            this[15],
        ]);
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Matrix4} other
     * @returns {this}
     */
    multiply(other) {
        const a = this;
        const b = other;
        const result = new Float32Array(16);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = a[i * 4 + 0] * b[0 * 4 + j] + a[i * 4 + 1] * b[1 * 4 + j] + a[i * 4 + 2] * b[2 * 4 + j] + a[i * 4 + 3] * b[3 * 4 + j];
            }
        }
        this.set(result);
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @returns {this}
     */
    rotateX(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a10 = this[4], a11 = this[5], a12 = this[6], a13 = this[7];
        const a20 = this[8], a21 = this[9], a22 = this[10], a23 = this[11];
        this[4] = a10 * c + a20 * s;
        this[5] = a11 * c + a21 * s;
        this[6] = a12 * c + a22 * s;
        this[7] = a13 * c + a23 * s;
        this[8] = a20 * c - a10 * s;
        this[9] = a21 * c - a11 * s;
        this[10] = a22 * c - a12 * s;
        this[11] = a23 * c - a13 * s;
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @returns {this}
     */
    rotateY(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = this[0], a01 = this[1], a02 = this[2], a03 = this[3];
        const a20 = this[8], a21 = this[9], a22 = this[10], a23 = this[11];
        this[0] = a00 * c - a20 * s;
        this[1] = a01 * c - a21 * s;
        this[2] = a02 * c - a22 * s;
        this[3] = a03 * c - a23 * s;
        this[8] = a00 * s + a20 * c;
        this[9] = a01 * s + a21 * c;
        this[10] = a02 * s + a22 * c;
        this[11] = a03 * s + a23 * c;
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @returns {this}
     */
    rotateZ(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = this[0], a01 = this[1], a02 = this[2], a03 = this[3];
        const a10 = this[4], a11 = this[5], a12 = this[6], a13 = this[7];
        this[0] = a00 * c + a10 * s;
        this[1] = a01 * c + a11 * s;
        this[2] = a02 * c + a12 * s;
        this[3] = a03 * c + a13 * s;
        this[4] = a10 * c - a00 * s;
        this[5] = a11 * c - a01 * s;
        this[6] = a12 * c - a02 * s;
        this[7] = a13 * c - a03 * s;
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Vector3} v
     * @returns {this}
     */
    scale(v) {
        const [x, y, z] = v;
        this[0] *= x;
        this[1] *= x;
        this[2] *= x;
        this[3] *= x;
        this[4] *= y;
        this[5] *= y;
        this[6] *= y;
        this[7] *= y;
        this[8] *= z;
        this[9] *= z;
        this[10] *= z;
        this[11] *= z;
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Vector3} v
     * @returns {this}
     */
    translate(v) {
        const [x, y, z] = v;
        this[12] = this[0] * x + this[4] * y + this[8] * z + this[12];
        this[13] = this[1] * x + this[5] * y + this[9] * z + this[13];
        this[14] = this[2] * x + this[6] * y + this[10] * z + this[14];
        this[15] = this[3] * x + this[7] * y + this[11] * z + this[15];
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {(this | null)}
     */
    invert() {
        const m = this;
        const inv = new Float32Array(16);
        inv[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] + m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
        inv[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] - m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
        inv[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] + m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
        inv[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] - m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
        inv[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] - m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
        inv[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] + m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
        inv[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] - m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
        inv[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] + m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
        inv[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] + m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
        inv[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] - m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
        inv[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] + m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
        inv[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] - m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
        inv[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] - m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
        inv[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] + m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
        inv[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] - m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
        inv[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] + m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];
        let det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];
        if (det === 0)
            return null;
        det = 1.0 / det;
        for (let i = 0; i < 16; i++) {
            this[i] = inv[i] * det;
        }
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {this}
     */
    transpose() {
        const m = this;
        let temp;
        temp = m[1];
        m[1] = m[4];
        m[4] = temp;
        temp = m[2];
        m[2] = m[8];
        m[8] = temp;
        temp = m[6];
        m[6] = m[9];
        m[9] = temp;
        temp = m[3];
        m[3] = m[12];
        m[12] = temp;
        temp = m[7];
        m[7] = m[13];
        m[13] = temp;
        temp = m[11];
        m[11] = m[14];
        m[14] = temp;
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {number}
     */
    determinant() {
        const m = this;
        const m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
        const m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
        const m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
        const m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
        return (m00 * (m11 * (m22 * m33 - m23 * m32) - m12 * (m21 * m33 - m23 * m31) + m13 * (m21 * m32 - m22 * m31)) -
            m01 * (m10 * (m22 * m33 - m23 * m32) - m12 * (m20 * m33 - m23 * m30) + m13 * (m20 * m32 - m22 * m30)) +
            m02 * (m10 * (m21 * m33 - m23 * m31) - m11 * (m20 * m33 - m23 * m30) + m13 * (m20 * m31 - m21 * m30)) -
            m03 * (m10 * (m21 * m32 - m22 * m31) - m11 * (m20 * m32 - m22 * m30) + m12 * (m20 * m31 - m21 * m30)));
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {Matrix4}
     */
    copy() {
        const copy = new Matrix4();
        copy.set(this);
        return copy;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {string}
     */
    toString() {
        return `
            [${this[0]}, ${this[4]}, ${this[8]}, ${this[12]}]
            [${this[1]}, ${this[5]}, ${this[9]}, ${this[13]}]
            [${this[2]}, ${this[6]}, ${this[10]}, ${this[14]}]
            [${this[3]}, ${this[7]}, ${this[11]}, ${this[15]}]
        `;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number[]} array
     * @returns {this}
     */
    fromArray(array) {
        this.set(array);
        return this;
    }
    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {number[]}
     */
    toArray() {
        return Array.from(this);
    }
}


/***/ }),

/***/ "./src/math/Vector3.ts":
/*!*****************************!*\
  !*** ./src/math/Vector3.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vector3: () => (/* binding */ Vector3)
/* harmony export */ });
/**
 * 3D vector class.
 *
 * @export
 * @class Vector3
 * @typedef {Vector3}
 * @extends {Float32Array}
 */
class Vector3 extends Float32Array {
    /**
     * Creates an instance of Vector3.
     *
     * @constructor
     * @param {number} [x=0] - The x-component of the vector.
     * @param {number} [y=0] - The y-component of the vector.
     * @param {number} [z=0] - The z-component of the vector.
     */
    constructor(x = 0, y = 0, z = 0) {
        super(3);
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }
    /**
     * Calculates the magnitude of the vector.
     *
     * @public
     * @returns {number} - The magnitude of the vector.
     */
    magnitude() {
        return Math.sqrt(this[0] ** 2 + this[1] ** 2 + this[2] ** 2);
    }
    /**
     * Normalizes the vector.
     *
     * @public
     * @returns {this} - The normalized vector.
     */
    normalize() {
        const mag = this.magnitude();
        if (mag > 0) {
            this[0] /= mag;
            this[1] /= mag;
            this[2] /= mag;
        }
        return this;
    }
    /**
     * Adds a vector to this vector.
     *
     * @public
     * @param {Vector3} other - The vector to add.
     * @returns {this} - The resulting vector.
     */
    add(other) {
        this[0] += other[0];
        this[1] += other[1];
        this[2] += other[2];
        return this;
    }
    /**
     * Subtracts a vector from this vector.
     *
     * @public
     * @param {Vector3} other - The vector to subtract.
     * @returns {this} - The resulting vector.
     */
    subtract(other) {
        this[0] -= other[0];
        this[1] -= other[1];
        this[2] -= other[2];
        return this;
    }
    /**
     * Scales the vector by a scalar value.
     *
     * @public
     * @param {number} scalar - The scalar to scale by.
     * @returns {this} - The scaled vector.
     */
    scale(scalar) {
        this[0] *= scalar;
        this[1] *= scalar;
        this[2] *= scalar;
        return this;
    }
    /**
     * Calculates the dot product of this vector and another vector.
     *
     * @public
     * @param {Vector3} other - The vector to dot with.
     * @returns {number} - The dot product of the two vectors.
     */
    dot(other) {
        return this[0] * other[0] + this[1] * other[1] + this[2] * other[2];
    }
    /**
     * Calculates the cross product of this vector and another vector.
     *
     * @public
     * @param {Vector3} other - The vector to cross with.
     * @returns {Vector3} - The cross product of the two vectors.
     */
    cross(other) {
        const x = this[1] * other[2] - this[2] * other[1];
        const y = this[2] * other[0] - this[0] * other[2];
        const z = this[0] * other[1] - this[1] * other[0];
        return new Vector3(x, y, z);
    }
    /**
     * Divides the vector by a scalar value.
     *
     * @public
     * @param {number} scalar - The scalar to divide by.
     * @returns {this} - The divided vector.
     */
    divide(scalar) {
        if (scalar !== 0) {
            this[0] /= scalar;
            this[1] /= scalar;
            this[2] /= scalar;
        }
        else {
            throw new Error('Cannot divide by zero');
        }
        return this;
    }
}
Vector3.prototype.set = function (x, y, z) {
    this[0] = x;
    this[1] = y ?? this[1];
    this[2] = z ?? this[2];
};


/***/ }),

/***/ "./src/models/Model.ts":
/*!*****************************!*\
  !*** ./src/models/Model.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Model: () => (/* binding */ Model)
/* harmony export */ });
/**
 * A class representing a 3D model.
 *
 * @export
 * @class Model
 * @typedef {Model}
 */
class Model {
    data;
    parameters;
    /**
     * Creates an instance of Model.
     *
     * @constructor
     * @param {ModelJSON} data The JSON representation of the model.
     * @param {MaterialJSON} [parameters={}] The material properties which should be applied to the model.
     */
    constructor(data, parameters = {}) {
        this.data = data;
        this.parameters = parameters;
        this.data = data;
        for (let i = 0; i < this.data.materials.length; i++) {
            this.data.materials[i] = { ...this.data.materials[i], ...parameters };
        }
    }
}


/***/ }),

/***/ "./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EPSILON: () => (/* binding */ EPSILON)
/* harmony export */ });
/**
 * A small value used to determine whether a floating point number is close to zero.
 *
 * @type {number} A small value, 0.000001.
 */
const EPSILON = 0.000001;


/***/ }),

/***/ "./src/utils/createCompileShader.ts":
/*!******************************************!*\
  !*** ./src/utils/createCompileShader.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCompileShader: () => (/* binding */ createCompileShader)
/* harmony export */ });
/**
 * Compiles a shader from a given source and type.
 *
 * @export
 * @param {GLRenderingContext} gl The WebGL rendering context.
 * @param {string} shaderSource The source code of the shader to be compiled.
 * @param {number} type The type of the shader. Can be either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
 * @returns {(WebGLShader | null)} The compiled shader or null if the compilation failed.
 */
function createCompileShader(gl, shaderSource, type) {
    const shader = gl.createShader(type);
    if (!shader) {
        console.error('Error creating shader');
        return null;
    }
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const infoLog = gl.getShaderInfoLog(shader);
        console.error('Shader compilation failed: ' + infoLog);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}


/***/ }),

/***/ "./src/utils/createProgram.ts":
/*!************************************!*\
  !*** ./src/utils/createProgram.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProgram: () => (/* binding */ createProgram)
/* harmony export */ });
/* harmony import */ var _createCompileShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createCompileShader */ "./src/utils/createCompileShader.ts");

/**
 * Creates a WebGL program from a given vertex and fragment shader source.
 *
 * @export
 * @param {GLRenderingContext} gl The WebGL rendering context.
 * @param {string} vertexShaderSource The source code of the vertex shader.
 * @param {string} fragmentShaderSource The source code of the fragment shader.
 * @returns {WebGLProgram | null} The created WebGL program or null if the creation failed.
 */
function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = (0,_createCompileShader__WEBPACK_IMPORTED_MODULE_0__.createCompileShader)(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = (0,_createCompileShader__WEBPACK_IMPORTED_MODULE_0__.createCompileShader)(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader)
        return null;
    const program = gl.createProgram();
    if (!program) {
        console.error('Error creating WebGL program');
        return null;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const infoLog = gl.getProgramInfoLog(program);
        console.error('Program linking failed: ' + infoLog);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }
    return program;
}


/***/ }),

/***/ "./src/utils/getPropertyValue.ts":
/*!***************************************!*\
  !*** ./src/utils/getPropertyValue.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPropertyValue: () => (/* binding */ getPropertyValue)
/* harmony export */ });
/**
 * Retrieves a property value from a given material.
 *
 * @export
 * @param {AssimpMaterialJSON} material The material to retrieve the property from.
 * @param {string} key The key of the property to retrieve.
 * @param {(string | number | number[] | null)} [def=null] The default value to return if the property is not found.
 * @returns {(string | number | number[] | null)} The value of the property or the default value if not found.
 */
function getPropertyValue(material, key, def = null) {
    const keyProperty = material.properties.find((prop) => prop.key === key);
    const value = keyProperty ? keyProperty.value : def;
    return value;
}


/***/ }),

/***/ "./src/utils/randomUUID.ts":
/*!*********************************!*\
  !*** ./src/utils/randomUUID.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomUUID: () => (/* binding */ randomUUID)
/* harmony export */ });
/**
 * Generates a random UUID (version 4).
 *
 * The generated UUID is a string of 32 hexadecimal digits, displayed in 5 groups separated by hyphens, in the form 8-4-4-4-12.
 * The first group is 8 hexadecimal digits, the second group is 4 hexadecimal digits, the third group is 4 hexadecimal digits, the fourth group is 4 hexadecimal digits, and the fifth group is 12 hexadecimal digits.
 * The generated UUID is a random UUID (version 4).
 *
 * @export
 * @returns {string} A random UUID (version 4).
 */
function randomUUID() {
    let timestamp = new Date().getTime();
    let microseconds = typeof performance !== 'undefined' && performance.now ? performance.now() * 1000 : 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        let randomValue = Math.random() * 16;
        if (timestamp > 0) {
            randomValue = (timestamp + randomValue) % 16 | 0;
            timestamp = Math.floor(timestamp / 16);
        }
        else {
            randomValue = (microseconds + randomValue) % 16 | 0;
            microseconds = Math.floor(microseconds / 16);
        }
        return (char === 'x' ? randomValue : (randomValue & 0x3) | 0x8).toString(16);
    });
}


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toRadian: () => (/* binding */ toRadian)
/* harmony export */ });
/**
 * Converts a given angle in degrees to radians.
 *
 * @export
 * @param {number} degrees The angle in degrees to convert.
 * @returns {number} The converted angle in radians.
 */
function toRadian(degrees) {
    return degrees * (Math.PI / 180);
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && queue.d < 1) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__webpack_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = -1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && queue.d < 0 && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ var __webpack_exports__Geometry = __webpack_exports__.Geometry;
/******/ var __webpack_exports__Loader = __webpack_exports__.Loader;
/******/ var __webpack_exports__Material = __webpack_exports__.Material;
/******/ var __webpack_exports__Matrix4 = __webpack_exports__.Matrix4;
/******/ var __webpack_exports__Mesh = __webpack_exports__.Mesh;
/******/ var __webpack_exports__Model = __webpack_exports__.Model;
/******/ var __webpack_exports__ModelLoader = __webpack_exports__.ModelLoader;
/******/ var __webpack_exports__PerspectiveCamera = __webpack_exports__.PerspectiveCamera;
/******/ var __webpack_exports__Renderer = __webpack_exports__.Renderer;
/******/ var __webpack_exports__Scene = __webpack_exports__.Scene;
/******/ var __webpack_exports__TextLoader = __webpack_exports__.TextLoader;
/******/ var __webpack_exports__TextureCubeLoader = __webpack_exports__.TextureCubeLoader;
/******/ var __webpack_exports__TextureLoader = __webpack_exports__.TextureLoader;
/******/ var __webpack_exports__Vector3 = __webpack_exports__.Vector3;
/******/ var __webpack_exports__fragmentShaderSource = __webpack_exports__.fragmentShaderSource;
/******/ var __webpack_exports__globalRegistry = __webpack_exports__.globalRegistry;
/******/ var __webpack_exports__vertexShaderSource = __webpack_exports__.vertexShaderSource;
/******/ export { __webpack_exports__Geometry as Geometry, __webpack_exports__Loader as Loader, __webpack_exports__Material as Material, __webpack_exports__Matrix4 as Matrix4, __webpack_exports__Mesh as Mesh, __webpack_exports__Model as Model, __webpack_exports__ModelLoader as ModelLoader, __webpack_exports__PerspectiveCamera as PerspectiveCamera, __webpack_exports__Renderer as Renderer, __webpack_exports__Scene as Scene, __webpack_exports__TextLoader as TextLoader, __webpack_exports__TextureCubeLoader as TextureCubeLoader, __webpack_exports__TextureLoader as TextureLoader, __webpack_exports__Vector3 as Vector3, __webpack_exports__fragmentShaderSource as fragmentShaderSource, __webpack_exports__globalRegistry as globalRegistry, __webpack_exports__vertexShaderSource as vertexShaderSource };
/******/ 

//# sourceMappingURL=glib.js.map