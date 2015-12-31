precision mediump float;
precision mediump int;

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
    vec3 color = vec3(1.0);
    vec3 kd = vec3(1, 0, 1);
    if (i > 0.9) {
        color = kd + vec3(0.4);
    } else if (i > 0.6 && i <= 0.9) {
        color = kd + vec3(0.2);
    } else if (i > 0.4 && i <= 0.6) {
        color = kd;
    } else if (i > 0.2 && i <= 0.4) {
        color = kd - vec3(0.2);
    } else {
        color = kd - vec3(0.4);
    }
    float spec = pow(max(dot(R, L), 0.0), 5.0);
    if(spec > 0.5) {
      color = kd + vec3(0.8);
    }
    gl_FragColor = vec4(color, 1.0);
  }
}
