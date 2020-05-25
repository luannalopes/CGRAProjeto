/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 20);
        this.quad = new MyQuad(this);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this, 18,16);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);
        
        this.speedFactor = 0.5;
        this.scaleFactor = 3;

        this.selectedObject = 3;
        this.selectedTexture = 0;
        this.nSuppliesDelivered = 0; // 0,1,2,3,4

        this.objects = [this.incompleteSphere, this.incompleteSphere, this.cylinder, this.vehicle];
        this.objectIDs = {
            'Sphere': 0,
            'Earth': 1,
            'Cylinder': 2,
            'Vehicle': 3
        };

        this.textures = [
            new CGFtexture(this, "images/earth.jpg"),
            new CGFtexture(this, "images/cubemap.png"),
            new CGFtexture(this, "images/cubemap1.png"),
        ];

        this.textureIDs = {
            'Floresta': 0,
            'Floresta1': 1
        };

        this.supplyIds = [];
        for(var i = 0; i <= 4; i++)
            this.supplyIds[i] = new MySupply(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayEarth = false;
        this.displayCubeMap = true;
        this.displayTerrain = true;



        //------ Applied Material -- same as ex4 MyScene.js  -- quadMaterial

        // EARTH
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setShininess(10.0);
        this.earthMaterial.loadTexture('images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // DEFAULT 
        this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setShininess(10.0);

        // SPLIT CUBE MAP 

        // BACK
        this.backCubeMap = new CGFappearance(this);
        this.backCubeMap.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.backCubeMap.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.backCubeMap.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.backCubeMap.setShininess(10.0);
        this.backCubeMap.loadTexture('images/split_cubemap/back.png');
        this.backCubeMap.setTextureWrap('REPEAT', 'REPEAT');

        // BOTTOM
        this.bottomCubeMap = new CGFappearance(this);
        this.bottomCubeMap.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.bottomCubeMap.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.bottomCubeMap.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.bottomCubeMap.setShininess(10.0);
        this.bottomCubeMap.loadTexture('images/split_cubemap/bottom.png');
        this.bottomCubeMap.setTextureWrap('REPEAT', 'REPEAT');

        // FRONT
        this.frontCubeMap = new CGFappearance(this);
        this.frontCubeMap.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.frontCubeMap.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.frontCubeMap.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.frontCubeMap.setShininess(10.0);
        this.frontCubeMap.loadTexture('images/split_cubemap/front.png');
        this.frontCubeMap.setTextureWrap('REPEAT', 'REPEAT');

        // LEFT
        this.leftCubeMap = new CGFappearance(this);
        this.leftCubeMap.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.leftCubeMap.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.leftCubeMap.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.leftCubeMap.setShininess(10.0);
        this.leftCubeMap.loadTexture('images/split_cubemap/left.png');
        this.leftCubeMap.setTextureWrap('REPEAT', 'REPEAT');

        // RIGHT
        this.rightCubeMap = new CGFappearance(this);
        this.rightCubeMap.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.rightCubeMap.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.rightCubeMap.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.rightCubeMap.setShininess(10.0);
        this.rightCubeMap.loadTexture('images/split_cubemap/right.png');
        this.rightCubeMap.setTextureWrap('REPEAT', 'REPEAT');

        // TOP
        this.topCubeMap = new CGFappearance(this);
        this.topCubeMap.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.topCubeMap.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.topCubeMap.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.topCubeMap.setShininess(10.0);
        this.topCubeMap.loadTexture('images/split_cubemap/top.png');
        this.topCubeMap.setTextureWrap('REPEAT', 'REPEAT');


        // SPLIT CUBE MAP 1 

        // BACK
        this.backCubeMap1 = new CGFappearance(this);
        this.backCubeMap1.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.backCubeMap1.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.backCubeMap1.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.backCubeMap1.setShininess(10.0);
        this.backCubeMap1.loadTexture('images/split_cubemap/back1.png');
        this.backCubeMap1.setTextureWrap('REPEAT', 'REPEAT');

        // BOTTOM
        this.bottomCubeMap1 = new CGFappearance(this);
        this.bottomCubeMap1.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.bottomCubeMap1.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.bottomCubeMap1.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.bottomCubeMap1.setShininess(10.0);
        this.bottomCubeMap1.loadTexture('images/split_cubemap/bottom1.png');
        this.bottomCubeMap1.setTextureWrap('REPEAT', 'REPEAT');

        // FRONT
        this.frontCubeMap1 = new CGFappearance(this);
        this.frontCubeMap1.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.frontCubeMap1.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.frontCubeMap1.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.frontCubeMap1.setShininess(10.0);
        this.frontCubeMap1.loadTexture('images/split_cubemap/front1.png');
        this.frontCubeMap1.setTextureWrap('REPEAT', 'REPEAT');

        // LEFT
        this.leftCubeMap1 = new CGFappearance(this);
        this.leftCubeMap1.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.leftCubeMap1.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.leftCubeMap1.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.leftCubeMap1.setShininess(10.0);
        this.leftCubeMap1.loadTexture('images/split_cubemap/left1.png');
        this.leftCubeMap1.setTextureWrap('REPEAT', 'REPEAT');

        // RIGHT
        this.rightCubeMap1 = new CGFappearance(this);
        this.rightCubeMap1.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.rightCubeMap1.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.rightCubeMap1.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.rightCubeMap1.setShininess(10.0);
        this.rightCubeMap1.loadTexture('images/split_cubemap/right1.png');
        this.rightCubeMap1.setTextureWrap('REPEAT', 'REPEAT');

        // TOP
        this.topCubeMap1 = new CGFappearance(this);
        this.topCubeMap1.setAmbient(1.0, 1.0, 1.0, 1);        // strong ambient light
        this.topCubeMap1.setDiffuse(0.0, 0.0, 0.0, 1);        // null diffuse light 
        this.topCubeMap1.setSpecular(0.0, 0.0, 0.0, 1);       // null specular light 
        this.topCubeMap1.setShininess(10.0);
        this.topCubeMap1.loadTexture('images/split_cubemap/top1.png');
        this.topCubeMap1.setTextureWrap('REPEAT', 'REPEAT');

        //------
    }


    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 40, 40), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateObjectComplexity() { }

    updateAppliedTexture() { }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        if(keysPressed == false)
            this.vehicle.turnLeme(0);

        if(this.vehicle.apilot == false)
        {
        // Check for key code e.g. in https://keycode.info/s
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            this.vehicle.accelerate((0.01)*this.speedFactor);
            keysPressed = true;
            this.vehicle.turnLeme(0);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            this.vehicle.accelerate(-0.01*this.speedFactor);
            keysPressed = true;
            this.vehicle.turnLeme(0);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            this.vehicle.turn(1);
            this.vehicle.turnLeme(-1);
            keysPressed = true;

        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            this.vehicle.turn(-1);
            this.vehicle.turnLeme(+1);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            this.vehicle.reset();
            this.nSuppliesDelivered = 0;
            for(var i = 0; i <= 4; i++)
                this.supplyIds[i].reset();
            this.billboard.reset();
            keysPressed = true;
            
        }

        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            this.vehicle.apilot = true;
            this.vehicle.passTime = 0;
            this.vehicle.time = 0;
            this.vehicle.ang_x = 0;
            this.vehicle.cx = this.vehicle.x + this.vehicle.r*Math.sin((this.vehicle.ang_y+90)* Math.PI/180);
            this.vehicle.cz = this.vehicle.z + this.vehicle.r*Math.cos((this.vehicle.ang_y+90)* Math.PI/180);
            keysPressed = true;
            
        }

        if (this.gui.isKeyPressed("KeyL")) {
            text += " L ";
            if(this.nSuppliesDelivered <= 4)
            {
                this.supplyIds[this.nSuppliesDelivered].dropSupply(this.vehicle.x, this.vehicle.z);
                this.nSuppliesDelivered++;
                this.billboard.update();
            }
            keysPressed = true;
            
        }

        if (keysPressed)
            console.log(text);

    }
    else{
        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            this.vehicle.apilot = false;
            //this.vehicle.reset();
            keysPressed = true;
            
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            this.vehicle.reset();
            for(var i = 0; i <= 4; i++)
                this.supplyIds[i].reset();
            this.billboard.reset();
            keysPressed = true;
            
        }
    }
}

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        //To be done...
        this.checkKeys();
        this.vehicle.update(t);
        for(var i = 0; i <= 4; i++)
            this.supplyIds[i].update(t);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.objects[this.selectedObject].display();

        if (this.displayCubeMap)
            this.cubeMap.display();
        
        if (this.displayTerrain)
            this.terrain.display();

        for(var i = 0; i <= 4; i++)
            this.supplyIds[i].displayController();
        
        this.billboard.display();

        this.popMatrix();
        

        //This sphere does not have defined texture coordinates


        // ---- END Primitive drawing section
    }
}