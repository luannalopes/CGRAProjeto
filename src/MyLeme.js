/**
 * MyLeme
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyLeme extends CGFobject {
	constructor(scene) {
        super(scene);
        
		this.initBuffers();
	}
	initBuffers() {
        this.triangle = new MyTriangle(this.scene);
        this.triangle1 = new MyTriangle(this.scene);
        this.triangle2 = new MyTriangle(this.scene);

        this.lemeTex = new CGFappearance(this.scene);
        this.lemeTex.setAmbient(0.9, 0.9, 0.9, 1);
        this.lemeTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.lemeTex.setSpecular(0.9, 0.9, 0.9, 1);
        this.lemeTex.setShininess(10.0);
        this.lemeTex.loadTexture('images/arcoiris.png');
        this.lemeTex.setTextureWrap('REPEAT', 'REPEAT');

    }
    
    display(){
        this.lemeTex.apply();
        
        this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(180*Math.PI/ 180,0, 1, 0);
        this.scene.translate(-1,0,-1);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.triangle2.display();
        this.scene.popMatrix();
       
        
    }

}