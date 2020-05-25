/**
 * Billboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.quadrado = new MyQuad2(this.scene);

        this.shader = new CGFshader(this.scene.gl, "shaders/bar.vert", "shaders/bar.frag");
        this.shader.setUniformsValues({nSupplies: this.scene.nSuppliesDelivered});

        this.billboard = new CGFappearance(this.scene);
        this.billboard.setAmbient(0.9,0.9,0.9,1);
        this.billboard.setDiffuse(0.9,0.9,0.9,1);
        this.billboard.setDiffuse(0.9,0.9,0.9,1);
        this.billboard.setShininess(10);
        this.billboard.loadTexture('images/billboard.png');
        this.billboard.setTextureWrap('REPEAT','REPEAT');

        this.load = new CGFappearance(this.scene);
        this.load.setAmbient(0.9,0.9,0.9,1);
        this.load.setDiffuse(0.9,0.9,0.9,1);
        this.load.setDiffuse(0.9,0.9,0.9,1);
        this.load.setShininess(10);
        this.load.loadTexture('images/white.jpg');
        this.load.setTextureWrap('REPEAT','REPEAT');


    }

    update(){
        this.shader.setUniformsValues({nSupplies: this.scene.nSuppliesDelivered});
    }

    reset(){
        this.shader.setUniformsValues({nSupplies: 0});
    }

    display()
    {
        this.scene.pushMatrix();
        
        this.scene.translate(2,0,0);
        this.scene.translate(0,7,0);
        this.scene.translate(0,0,10);
        //this.scene.scale(10,10,10);
        //this.scene.rotate(180*Math.Pi/ 180, 0,1,0);
        this.scene.pushMatrix();
        this.billboard.apply();

        // Placa Rosa
        this.scene.pushMatrix();
        this.scene.translate(0.95,1,0);
        this.scene.scale(2,1,1);
        this.quadrado.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.load.apply();
       
        // barra Esquerda
        this.scene.pushMatrix();
        this.scene.scale(0.1,1,1);
        this.quadrado.display();
        this.scene.popMatrix();
        
        // Barra Direita
        this.scene.pushMatrix();
        this.scene.translate(1.9,0,0);
        this.scene.scale(0.1,1,1);
        this.quadrado.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // Barra do Progress
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0.95,1,0);
        this.scene.scale(1.5,0.2,1);
        this.quadrado.display();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        
        this.scene.popMatrix();

    }
}