/* /* 
* MyCylinder - based on MyPyramid.js and MySphere.js
* @constructor
*/
class MyCylinder extends CGFobject {
    /** Based on MySphere.js code
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;

        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the sphere buffers
     * TODO: DEFINE TEXTURE COORDINATES
     * Based on MyPiramid.js code and MySphere.js code
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;    // atual angle
        var alphaAng = 2 * Math.PI / this.slices;  // radius = 1; angle of each slice part

        //  BASE
        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);           // sin angle
            var ca = Math.cos(ang);           // cos angle

            this.vertices.push(ca, 0, sa); // base vertices

            // cylinder normal based 1.1 photo description
            this.normals.push(ca, 0, sa); // base vertices

            // clylinder texture 
            this.texCoords.push(i / this.slices, 0);

            ang += alphaAng;
        }


        //  TOP
        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);           // sin angle
            var ca = Math.cos(ang);           // cos angle

            this.vertices.push(ca, 1, sa);    // top vertices

            // cylinder normal based 1.1 photo description
            this.normals.push(ca, 0, sa);     // top vertices

            // clylinder texture 
            this.texCoords.push(i / this.slices, 1);

            ang += alphaAng;
        }


        for (var i = 0; i < this.slices; i++)    // Normal Side, Indices
        {
            if (i == this.slices - 1) {
                this.indices.push(i, i + 1 - this.slices, i + 1);
                this.indices.push(i, i + 1, i + this.slices);
            }
            else {
                this.indices.push(i, i + 1, i + 1 + this.slices);
                this.indices.push(i, i + 1 + this.slices, i + this.slices);
            }
        }
        for (var i = 0; i < this.slices; i++)    // Reverse Side, Indices
        {
            if (i == this.slices - 1) {
                this.indices.push(i, i + 1, i + 1 - this.slices);
                this.indices.push(i, i + this.slices, i + 1);
            }
            else {
                this.indices.push(i, i + 1 + this.slices, i + 1);
                this.indices.push(i, i + this.slices, i + this.slices + 1)
            }

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    

}