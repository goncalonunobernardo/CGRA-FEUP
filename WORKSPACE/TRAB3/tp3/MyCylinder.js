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
	    //Implementacao com vertices duplicados
	    //VERTICES & NORMALS
		this.vertices = [];
		this.normals = [];
        
        var ang = 2 * Math.PI / this.slices;
        for(var i = 0; i <= this.stacks; i++){
            for(var j = 0; j < this.slices; j++){
                //Cada vertice e adicionado 2 vezes pq tamanho do array normals 
                //tem que ser igual ao array dos vertices,e como cada vertice tem
                //2 normais e preciso duplicar
                this.vertices.push(Math.cos(j*ang), Math.sin(j*ang), i*1/this.stacks);
                this.vertices.push(Math.cos((j+1)*ang), Math.sin((j+1)*ang), i*1/this.stacks);
                
                //A normal e igual em cada face varia apenas o ang de face para face
                this.normals.push(Math.cos(ang*j), Math.sin(ang*j), 0);
                this.normals.push(Math.cos(ang*j+ang), Math.sin(ang*j+ang), 0);
            }
        }

        //INDICES
		this.indices = [];
		
	    var nVert = 2 * this.stacks * this.slices;

	    for(var i = 0; i < nVert; i += 2){
	        this.indices.push(i, i+1, i+1+this.slices*2);
	        this.indices.push(i, i+1+this.slices*2, i+this.slices*2);
	    }

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
