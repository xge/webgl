var scene, camera, renderer, loader, obj;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

        // add spot light
    var spLight = new THREE.SpotLight(0xffffff, 1.75, 2000, Math.PI / 3);
    spLight.castShadow = true;
    spLight.position.set(-100, 300, -50);
    scene.add(spLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    loader = new THREE.OBJLoader();
    loader.load('obj/1.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                }
            });
            obj = object;
            scene.add(obj);
            render();
        }
    );
}

function render() {
    requestAnimationFrame(render);
    obj.rotation.x += 0.01;
    obj.rotation.y = Math.sin(performance.now() * 0.001) * 4 + 4;
    renderer.render(scene, camera);
}

init();
