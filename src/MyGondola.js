/**
 * MyGondola
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyGondola extends CGFobject {
	constructor(scene,slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();
	}
	initBuffers() {
        //this.cylinder = new MyCylinder(this.scene, this.slices);
        this.sphere = new MySphere(this.scene,this.slices,this.stacks);
        this.sphere0 = new MySphere(this.scene,this.slices,this.stacks);

        this.sphere1 = new MySphere(this.scene,this.slices,this.stacks);
        this.sphere2 = new MySphere(this.scene,this.slices,this.stacks);
        

        this.gondola = new CGFappearance(this.scene);
        this.gondola.setAmbient(0.9, 0.9, 0.9, 1);
        this.gondola.setDiffuse(0.9, 0.9, 0.9, 1);
        this.gondola.setSpecular(0.9, 0.9, 0.9, 1);
        this.gondola.setShininess(10.0);
        this.gondola.loadTexture('images/arcoiris.png');
        this.gondola.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){


        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,1); // 2 de comprimento, 1 de altura e 1 de largura
        this.gondola.apply();
        //this.cylinder.display();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(0.1,0.1,0.3);
        this.sphere0.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2,-0.5,-0.3);
        this.scene.scale(0.1,0.1,0.2);
        this.sphere1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2,-0.5,-0.3);
        this.scene.scale(0.1,0.1,0.2);
        this.sphere2.display();
        this.scene.popMatrix();
    }
}