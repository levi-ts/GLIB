import { PerspectiveCamera } from './cameras/PerspectiveCamera';
import { Mesh } from './core/Mesh';
import { Renderer } from './core/Renderer';
import { Scene } from './core/Scene';
import { Geometry } from './geometries/Geometry';
import { JSONLoader } from './loaders/JSONLoader';
import { Loader } from './loaders/Loader';
import { ModelLoader } from './loaders/ModelLoader';
import { TextLoader } from './loaders/TextLoader';
import { TextureCubeLoader } from './loaders/TextureCubeLoader';
import { TextureLoader } from './loaders/TextureLoader';
import { Material } from './materials/Material';
import { Matrix4 } from './math/Matrix4';
import { Vector2 } from './math/Vector2';
import { Vector3 } from './math/Vector3';
import { Vector4 } from './math/Vector4';
import { Model } from './models/Model';

export { Scene, PerspectiveCamera, Renderer, Loader, ModelLoader, TextLoader, TextureLoader, TextureCubeLoader, JSONLoader, Model, Geometry, Material, Mesh, Matrix4, Vector2, Vector3, Vector4 };

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
export const globalRegistry: {
    scenes: { [key: string]: Scene };
    cameras: { [key: string]: PerspectiveCamera };
    renderers: { [key: string]: Renderer };
    loaders: { [key: string]: Loader };
    geometries: { [key: string]: Geometry };
    materials: { [key: string]: Material };
    meshes: { [key: string]: Mesh };
    models: { [key: string]: Model };
} = {
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
export const vertexShaderSource = await new Loader().loadText('../src/shaders/vertexShader.glsl');

/**
 * The source code for the fragment shader.
 *
 * @type {string}
 */
export const fragmentShaderSource = await new Loader().loadText('../src/shaders/fragmentShader.glsl');
