/*#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float vehicleSpeed;
uniform float timeFactor;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0.0,0.0,0.0);

    offset.z += sin(timeFactor*(vehicleSpeed*5.0+0.1) + 15.0*(aVertexPosition.x+0.5))*0.04*(aVertexPosition.x+0.5);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
*/

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float vehicleSpeed;

varying vec2 vTextureCoord;


void main() {
vec3 offset=vec3(0.0,0.0,0.0);
    
    vTextureCoord = aTextureCoord;
    
    offset.z += sin(timeFactor*(vehicleSpeed*100.0+0.5) + 20.0*(aVertexPosition.x+0.5))*0.1*(aVertexPosition.x+0.5);
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
    
}
