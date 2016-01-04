var scene, camera, renderer, loader, objs, light;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    light = new THREE.PointLight();
    light.position.set(50, 50, 150);
    scene.add(light);

    var geom = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );

    objs = [];
    var count = 3;
    for (var i = 0; i <= count; i++) {
        for (var j = 0; j <= count; j++) {
            for (var k = 0; k <= count; k++) {
                var mat = new THREE.ShaderMaterial({
                    uniforms: {
                        lightPos: {
                            type: 'v3',
                            value: light.position
                        },
                        baseColor: {
                            type: 'v3',
                            value: {
                                x: i / count,
                                y: j / count,
                                z: k / count
                            }
                        }
                    },
                    vertexShader: document.getElementById('baseVert').textContent,
                    fragmentShader: document.getElementById('cellFrag').textContent
                });
                var obj = new THREE.Mesh(geom, mat);
                obj.position.set(i * 50, j * 50, k * 50);
                scene.add(obj);
                objs.push(obj);
            }
        }
    }
    render();
}

function render() {
    requestAnimationFrame(render);
    var val = Math.sin(performance.now() * 0.001) * 50 + 50;
    camera.position.set(val + 25, val + 50, val);
    camera.lookAt(new THREE.Vector3(50, 50, 50));
    renderer.render(scene, camera);
}

init();
