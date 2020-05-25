#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform sampler2D waterTex;
//uniform float timeFactor;

void main() {
	vec4 color = texture2D(waterMap, vTextureCoord);
	
	gl_FragColor = color;
}
