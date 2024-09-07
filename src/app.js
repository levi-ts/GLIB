import * as GLIB from 'glib';

const scene = new GLIB.Scene();
const camera = new GLIB.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);

const renderer = new GLIB.Renderer();
renderer.setClearColor(0.1412, 0.1216, 0.1922, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const car = await new GLIB.Loader().loadModel('../src/models/koenigsegg/source/koenigsegg.json');

const environmentMap = new GLIB.Loader().loadTextureCube('../src/assets/environments/lycksele');

const model = new GLIB.Model(car, { environmentMap: environmentMap });

scene.add(model);

scene.matWorld.rotate(-1.570796 * 2, [0, 0, 1]);

function animate() {
    scene.matWorld.rotate(0.01, [0, 1, 0]);

    renderer.render(scene, camera);

    camera.updatePerspective();

    requestAnimationFrame(animate);
}

animate();
