/**
 * MyCubeMap 
 * @constructor
 * @param scene - Reference to MyUnitCubeQuad.js ex4 
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
        
	}
	display() {

        this.scene.pushMatrix();
        this.scene.translate(0,25,0);
        this.scene.scale(50,50,50);
      
        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate((90*Math.PI) / 180, 1,0,0);
        if(this.scene.selectedTexture == 0)
            this.scene.bottomCubeMap.apply();
        else
            this.scene.bottomCubeMap1.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        // RIGHT
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate((90*Math.PI) / 180, 0,1,0);
        if(this.scene.selectedTexture == 0)
            this.scene.rightCubeMap.apply();
        else
            this.scene.rightCubeMap1.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        // FRONT
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        if(this.scene.selectedTexture == 0)
            this.scene.frontCubeMap.apply();
        else
            this.scene.frontCubeMap1.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        // BACK
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate((180*Math.PI)/180,0,1,0);
        if(this.scene.selectedTexture == 0)
            this.scene.backCubeMap.apply();
        else
            this.scene.backCubeMap1.apply();
       // this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
                
        // TOP
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate((-90*Math.PI)/180,1,0,0);
        if(this.scene.selectedTexture == 0)
            this.scene.topCubeMap.apply();
        else
            this.scene.topCubeMap1.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        // LEFT
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate((-90*Math.PI)/180,0,1,0);
        if(this.scene.selectedTexture == 0)
            this.scene.leftCubeMap.apply();
        else
            this.scene.leftCubeMap1.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}


