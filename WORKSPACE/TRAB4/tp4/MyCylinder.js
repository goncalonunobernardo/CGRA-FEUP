/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

        this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();

	};

	initBuffers() 
	{
	    //VERTICES & NORMALS
		this.vertices = [];
		this.normals = [];
        
        var ang = 2 * Math.PI / this.slices;
        for(var i = 0; i <= this.stacks; i++){
            for(var j = 0; j < this.slices; j++){
                this.vertices.push(Math.cos(j*ang), Math.sin(j*ang), i*1/this.stacks);
              
                this.normals.push(Math.cos(ang*j), Math.sin(ang*j), 0);
            }
        }

        //INDICES
		this.indices = [];
		
	    var nVert = this.stacks * this.slices;

	    for(var i = 0; i < nVert; i++){
	        if((i+1) % this.slices == 0){
				this.indices.push(i, i+1-this.slices, i+1);
				this.indices.push(i, i+1, i+this.slices);
			}else{
				this.indices.push(i, i+1, i+1+this.slices);
				this.indices.push(i, i+1+this.slices, i+this.slices);
			}
	    }

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
