precision mediump float;
precision mediump int;

uniform vec3 baseColor;

varying vec3 eyeDirV;
varying vec3 lightDirV;
varying vec3 normalV;

void main() {
  vec3 N = normalize(normalV);
  vec3 E = normalize(eyeDirV);
  vec3 L = normalize(lightDirV);
  vec3 R = normalize(reflect(-E, N));

  if(max(dot(E, N), 0.0) < 0.3) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    float i = max(dot(N, L), 0.0);
    if (i > 0.6) {
        gl_FragColor = vec4(baseColor + vec3(0.2), 1.0);
    } else if (i > 0.4 && i <= 0.6) {
        gl_FragColor = vec4(baseColor, 1.0);
    } else if (i > 0.2 && i <= 0.4) {
        gl_FragColor = vec4(baseColor - vec3(0.2), 1.0);
    } else {
        gl_FragColor = vec4(baseColor - vec3(0.4), 1.0);
    }
    float spec = pow(max(dot(R, L), 0.0), 5.0);
    if(spec > 0.5) {
        gl_FragColor = vec4(baseColor + vec3(0.3), 1.0);
    }
  }
}
