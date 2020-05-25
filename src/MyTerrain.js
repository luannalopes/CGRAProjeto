/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(0,this.scene, 20);
        this.plane.initBuffers();
        
        this.waterMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.waterTex = new CGFtexture(this.scene, "images/terrain.jpg");
        
        // shaders initialization
		this.testShaders = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.testShaders.setUniformsValues({ waterTex: 1});
        
    }
    display() {
        this.scene.setActiveShader(this.testShaders);
        this.waterTex.bind(0);
        this.waterMap.bind(1);
    
        this.scene.pushMatrix();
        
        this.scene.rotate(-90*Math.PI / 180, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.scene.translate(0,0,0.01)
        this.plane.display();
       
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }


}
