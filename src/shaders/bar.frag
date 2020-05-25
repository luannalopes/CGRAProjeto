
#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
uniform float nSupplies;


void main() {
    float aux;
    aux = float(nSupplies)/5.0;
    
    if(coords.x <  aux -0.5)
        gl_FragColor.rgba = vec4(1.0 -(0.5 + coords.x),(0.5 + coords.x),0,1);
    else
        gl_FragColor.rgba = vec4(0.5,0.5,0.5,1);
}