var scene, camera, renderer, loader, obj, light;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    light = new THREE.PointLight();
    light.position.set(50, 50, 50);
    scene.add(light);

    loader = new THREE.OBJLoader();
    loader.load('obj/1.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.ShaderMaterial({
                        uniforms: {
                            lightPos: { type: 'v3', value: light.position }
                        },
                        vertexShader: document.getElementById('baseVert').textContent,
                        fragmentShader: document.getElementById('cellFrag').textContent
                    });
                }
            });
            obj = object;
            obj.rotation.y = 45;
            scene.add(obj);
            render();
        }
    );
}

function render() {
    requestAnimationFrame(render);
    var val = Math.sin(performance.now() * 0.001) * 4 + 4;
    obj.rotation.x += 0.01;
    obj.rotation.y = -val;
    light.position.set(val, val, val);
    renderer.render(scene, camera);
}

init();
