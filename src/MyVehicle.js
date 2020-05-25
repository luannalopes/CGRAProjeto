/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        
        this.ang_y = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        // Variaveis para auxiliar na movimentação dos lemes, ao clicar A e D.s
        this.angLemeRotarion = 0;

        // Variaveis para auxiliar movimentaçao do piloto automatico
        this.apilot = false;
        this.passTime = 0;
        this.time = 0;
        this.ang_x = 0;
        this.cx = 0;
        this.cz = 0;
        this.r = 5;
    }

    initBuffers()
    {
        this.gondola = new MyGondola(this.scene,this.slices,this.stacks);
        this.leme = new MyLeme(this.scene);
        this.leme1 = new MyLeme(this.scene);
        this.leme2 = new MyLeme(this.scene);
        this.leme3 = new MyLeme(this.scene);
        this.helices = new MyHelice(this.scene,this.slices,this.stacks);
        this.flag = new MyPlane(1,this.scene,20);

        this.texture = new CGFtexture(this.scene,'images/bandeira.jpg');
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shader.setUniformsValues({vehicleSpeed: 0});
        this.shader.setUniformsValues({timeFactor: 0});
        this.shader.setUniformsValues({uSampler1: 0});


    }
    

    update(t){
        if(this.apilot != false)
        {
            // Fazer com que dure 5s em todos os computadores
            if(this.time == 0)
                this.time = t;
            this.passTime = t-this.time;
            this.ang_y = this.ang_y + this.passTime*360/5000;

            this.time = t;
            this.x = -this.r*Math.cos(this.ang_y*Math.PI/ 180) + this.cx;
            this.z = this.r*Math.sin(this.ang_y*Math.PI/ 180) + this.cz;
            this.turnLeme(-1);
        }
        this.x += this.velocity * Math.sin(this.ang_y*Math.PI/180);
        this.z += this.velocity * Math.cos(this.ang_y*Math.PI/180); 
        
        if (Math.round(this.ang_x*10)/10 == -Math.round(2*Math.PI*10)/10){
            this.apilot = false;
            this.passTime = 0;
            this.time = 0;
            this.ang_x = 0;
        }
        // Velocidade de rotação da helice proporcional a velocidade
        // Multiplica-se por 10 para tentar ter uma diferença entre a velocidade angular da turbina e
        // a velocidade escalar do dirigível
        this.helices.setAng((this.velocity)*10);

        // Flag
        this.shader.setUniformsValues({vehicleSpeed: this.speed});
        this.shader.setUniformsValues({timeFactor: t / 100 % 1000 });
    }

    turn(val){
        if(this.velocity < 0){
            this.ang_y -= val;
        }
        else {
            this.ang_y += val;
        }
    }

    accelerate(val){
       this.velocity += val;
    }

    reset(){
        this.ang_y = 0;
        this.velocity = 0; 
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angLemeRotarion = 0;
        this.apilot = false;
        this.passTime = 0;
        this.time = 0;
        this.ang_x = 0;
        this.cx = 0;
        this.cz = 0;

    }
    
    display() {
        
        this.scene.pushMatrix();
    
        this.scene.translate(this.x, 0, this.z);
        this.scene.translate(this.x, 10, this.z);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.scene.rotate(this.ang_y*Math.PI/180, 0, 1, 0);
        

        this.gondola.display();

        // Leme de cima esquerda
        this.scene.pushMatrix();
        this.scene.rotate(-90*Math.PI/180, 0,1,0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(-4.0,0,1);
        this.leme.display();
        this.scene.popMatrix();
        
        // Leme de cima direita
        this.scene.pushMatrix();
        this.scene.rotate(-90*Math.PI/180,0,1,0);
        this.scene.rotate(180*Math.PI/ 180, 1,0,0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(-4.0,0,1);
        this.leme1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.angLemeRotarion, 0,1,0);

        // Leme de lado em cima
        this.scene.pushMatrix();
        this.scene.rotate(-90*Math.PI/180, 1,0,0);
        this.scene.rotate(-90*Math.PI/180, 0,0,1);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(-4,0,0.5);
        this.leme2.display();
        this.scene.popMatrix();

        // Leme de lado em baixo
        this.scene.pushMatrix();
        this.scene.rotate(90*Math.PI/180, 1,0,0);
        this.scene.rotate(90*Math.PI/180, 0,0,1);

        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(-4,0,0.5);
        this.leme3.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // Helices
        this.helices.display();
        
        // Bandeira
        this.scene.setActiveShader(this.shader);
        this.texture.bind(0);

        this.scene.pushMatrix();
        this.scene.translate(0,0,-1.8);
        this.scene.rotate(90*Math.PI/ 180, 0,1,0);
        this.scene.scale(0.8,0.5,0.5);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix(); 
       
    }

    turnLeme(direction)
    {
        if(direction == -1) //está virando para a esquerda
            this.angLemeRotarion = +Math.PI/20;
        if(direction == 0)
            this.angLemeRotarion = 0;
        if(direction == +1) // esta virando para a direita
            this.angLemeRotarion = -Math.PI/20;
    }
    
}