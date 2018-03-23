/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
        this.cube = new  MyUnitCubeQuad(this.scene);
	};

	display(scene)
	{
	    //Tampo
        this.scene.pushMatrix();
        this.scene.translate(0,3.5+0.3/2,0);
        this.scene.scale(5,0.3,3);
        this.cube.display();
        this.scene.popMatrix();
        
	    //Perna 1
	    this.scene.pushMatrix();
	    this.scene.translate(2,3.5/2,1);
	    this.scene.scale(0.3,3.5,0.3);
		this.cube.display();
		this.scene.popMatrix();

		//Perna 2
		this.scene.pushMatrix();
		this.scene.translate(-2,3.5/2,1);
		this.scene.scale(0.3,3.5,0.3);
		this.cube.display();
		this.scene.popMatrix();

		//Perna 3
		this.scene.pushMatrix();
		this.scene.translate(-2,3.5/2,-1);
		this.scene.scale(0.3,3.5,0.3);
        this.cube.display();
        this.scene.popMatrix();

        //Perna 4
        this.scene.pushMatrix();
        this.scene.translate(2,3.5/2,-1);
        this.scene.scale(0.3,3.5,0.3);
        this.cube.display();
        this.scene.popMatrix();

        
	};

};
