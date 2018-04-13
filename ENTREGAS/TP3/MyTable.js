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
	this.materialC = new CGFappearance(this.scene);
	this.materialC.setAmbient(0.1,0.1,0.1,1);
	this.materialC.setDiffuse(0.627,0.322,0.176,1);
	this.materialC.setSpecular(0.1,0.03,0.03,1);	
	this.materialC.setShininess(120);

	this.materialD = new CGFappearance(this.scene);
	this.materialD.setAmbient(0.6, 0.6, 0.6, 1);
	this.materialD.setDiffuse(0.7, 0.7, 0.7, 1);
	this.materialD.setSpecular(0.8, 0.8, 0.8, 1);	
	this.materialD.setShininess(120);

	};

	display(scene)
	{
	    //Tampo
        this.scene.pushMatrix();
        this.scene.translate(0,3.5+0.3/2,0);
        this.scene.scale(5,0.3,3);
        this.materialC.apply();
        this.cube.display();
        this.scene.popMatrix();
        
	    //Perna 1
	    this.scene.pushMatrix();
	    this.scene.translate(2,3.5/2,1);
	    this.scene.scale(0.3,3.5,0.3);
	    this.materialD.apply();
		this.cube.display();
		this.scene.popMatrix();

		//Perna 2
		this.scene.pushMatrix();
		this.scene.translate(-2,3.5/2,1);
		this.scene.scale(0.3,3.5,0.3);
	    this.materialD.apply();
		this.cube.display();
		this.scene.popMatrix();

		//Perna 3
		this.scene.pushMatrix();
		this.scene.translate(-2,3.5/2,-1);
		this.scene.scale(0.3,3.5,0.3);
	    this.materialD.apply();
        this.cube.display();
        this.scene.popMatrix();

        //Perna 4
        this.scene.pushMatrix();
        this.scene.translate(2,3.5/2,-1);
        this.scene.scale(0.3,3.5,0.3);
        this.materialD.apply();
        this.cube.display();
        this.scene.popMatrix();

        
	};

};
