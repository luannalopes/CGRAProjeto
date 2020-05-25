/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */

const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
        this.state = SupplyStates.INACTIVE;
        this.quad = new MyQuad2(scene);

        this.tDrop = 0;
        this.passedTime = 0;
        this.time = 0;
        this.x = 0;
        this.y = 9; // para não aparecer que sai de dentro da parte de ar e nem dos passageiros.
        this.z = 0;

        this.initBuffers();
        this.initMaterials();
    }
    initMaterials(scene)
    {
        this.boxMaterial = new CGFappearance(this.scene);
        this.boxMaterial.setAmbient(1.0, 1.0, 1.0, 1);        
        this.boxMaterial.setDiffuse(0.9, 0.9, 0.9, 1);         
        this.boxMaterial.setSpecular(0.9, 0.9, 0.9, 1);       
        this.boxMaterial.setShininess(10.0);
        this.boxMaterial.loadTexture('images/caixa.png');
        this.boxMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(t)
    {
        // Mesma ideia do uso do piloto automatico
        if(this.time == 0)
            this.time = t;
        this.passedTime = t-this.time;
        this.time = t;
        if(this.state == SupplyStates.FALLING)
        {
            this.y = this.y - this.passedTime *9/3000; // cair 9 blocos em Y em 3s
            if(this.y <= 0.3)
                this.landedSupply();
        }
    }

    reset()
    {
        this.x = 0;
        this.y = 9;
        this.z = 0;
        this.state = SupplyStates.INACTIVE;
    }

    dropSupply(x,z)
    {
        this.y = 9;
        this.x = x;
        this.z = z;
        this.time = 0;
        this.passedTime = 0;
        this.tDrop = 0;
        this.state = SupplyStates.FALLING;
    }

    landedSupply()
    {
        this.state = SupplyStates.LANDED;
        this.passedTime = 0;
        this.tDrop = 0;
        this.time = 0;
        this.y = 0.1;
    }
    displayF() {

        // Código igual ao MyUnitCubeQuad.js

        // Face de Baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate((90*Math.PI) / 180, 1,0,0);
        this.boxMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face da Frente
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate((90*Math.PI) / 180, 0,1,0);
        this.boxMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face da Esquerda
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.boxMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face da Direita
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate((180*Math.PI)/180,0,1,0);
        this.boxMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face de Tras
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate((90*Math.PI)/180,0,1,0);
        this.boxMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        // Face de Cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate((-90*Math.PI)/180,1,0,0);
        this.boxMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

    }

    displayL(){
  
        // Considerando que a face de cima e a baixo caem uma sobre a outra
        // Olhando de lado para o dirigível( visão: lado direito do dirigivel visto de frente) 

        // Face Esquerda
         this.scene.pushMatrix();
         this.scene.translate(this.x, 0.1, this.z +1);
         this.scene.rotate(90*Math.PI/ 180, 1, 0, 0);
         this.boxMaterial.apply();
         this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
         this.quad.display();
         this.scene.popMatrix();

         // Face Direita
         this.scene.pushMatrix();
         this.scene.translate(this.x, 0.1, this.z -1);
         this.scene.rotate(90*Math.PI/ 180, 1, 0, 0);
         this.boxMaterial.apply();
         this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
         this.quad.display();
         this.scene.popMatrix();
  
         // Face de Cima
         this.scene.pushMatrix();
         this.scene.translate(this.x -1, 0.1, this.z);
         this.scene.rotate(90*Math.PI/ 180, 1, 0, 0);
         this.boxMaterial.apply();
         this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
         this.quad.display();
         this.scene.popMatrix();
  
         // Face de Baixo
         this.scene.pushMatrix();
         this.scene.translate(this.x +1, 0.1, this.z);
         this.scene.rotate(90*Math.PI/ 180, 1, 0, 0);
         this.boxMaterial.apply();
         this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
         this.quad.display();
         this.scene.popMatrix();

         // Face central
         this.scene.pushMatrix();
         this.scene.translate(this.x, 0.1, this.z);
         this.scene.rotate(90*Math.PI/ 180, 1, 0, 0);
         this.boxMaterial.apply();
         this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
         this.quad.display();
         this.scene.popMatrix();
  
         
      }
      displayController() {
        if (this.state == SupplyStates.FALLING)
        {
	        this.scene.pushMatrix();
	        this.scene.translate(this.x, this.y, this.z);
	        this.displayF();
            this.scene.popMatrix();
        }
        
        else if (this.state == SupplyStates.LANDED)
        {
           this.scene.pushMatrix();
	       this.displayL();
	       this.scene.popMatrix();
	    }   

	};



}