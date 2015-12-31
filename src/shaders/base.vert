precision mediump float;
precision mediump int;

uniform vec3 lightPos;

varying vec3 eyeDirV;
varying vec3 lightDirV;
varying vec3 normalV;

void main() {
    vec4 positionV = modelViewMatrix * vec4(position, 1.0);

    eyeDirV = -positionV.xyz;
    lightDirV = lightPos - positionV.xyz;
    normalV = (modelViewMatrix * vec4(normal, 0.0)).xyz;

    gl_Position = projectionMatrix * positionV;
}
