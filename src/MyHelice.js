/**
 * MyHelice
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyHelice extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.ang = 0;
        this.initBuffers();
    }

    initBuffers() {
        this.helice0 = new MySphere(this.scene, this.slices, this.stacks);
        this.helice1 = new MySphere(this.scene, this.slices, this.stacks);

        this.helice2 = new MySphere(this.scene, this.slices, this.stacks);
        this.helice3 = new MySphere(this.scene, this.slices, this.stacks);

        this.heliceTex = new CGFappearance(this.scene);
        this.heliceTex.setAmbient(0.9, 0.9, 0.9, 1);
        this.heliceTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.heliceTex.setSpecular(0.9, 0.9, 0.9, 1);
        this.heliceTex.setShininess(10.0);
        this.heliceTex.loadTexture('images/rosa_claro.jpg');
        this.heliceTex.setTextureWrap('REPEAT', 'REPEAT');
    }
    setAng(ang) {
        this.ang += ang;
    }

    display() {

        
        this.scene.pushMatrix();
        this.scene.translate(0.20, -0.5, -0.5);
        this.scene.scale(0.1, 0.1, 0.1);
        
        
        // HELICE OLHANDO DE FRENTE - ESQUERDA

        this.scene.pushMatrix();
        this.scene.rotate(this.ang, 0, 0, 1);
        this.scene.scale(0.25, 1, 0.25);
        this.heliceTex.apply();
        this.helice0.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate((this.ang + 90 * Math.PI / 180), 0, 0, 1);
        this.scene.scale(0.25, 1, 0.25);
        this.heliceTex.apply();
        this.helice1.display();
        this.scene.popMatrix();



        // HELICE OLHANDO DE FRENTE - DIREITA

        this.scene.pushMatrix();
        this.scene.translate(-4, 0, 0);
        this.scene.rotate(this.ang, 0, 0, 1);
        this.scene.scale(0.25, 1, 0.25);
        this.heliceTex.apply();
        this.helice2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4, 0, 0);
        this.scene.rotate((this.ang + 90 * Math.PI / 180), 0, 0, 1);
        this.scene.scale(0.25, 1, 0.25);
        this.heliceTex.apply();
        this.helice3.display();
        this.scene.popMatrix();
       
        this.scene.popMatrix();
        

    }
}