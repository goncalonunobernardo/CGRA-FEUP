/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends CGFobject
{
	constructor(scene, nrDivs, altimetry) //ROTATION ARGS 
	{
		super(scene);

        this.land = new Plane(this.scene, nrDivs, altimetry);

        this.landAppearance = new CGFappearance(this.scene);
        //this.wheelAppearance.setAmbient(r, g, b, a);
        //this.wheelAppearance.setDiffuse(r, g, b, a);
        //this.wheelAppearance.setSpecular(r, g, b, a);
        //this.wheelAppearance.setShininess(n);
        //thiis.wheelAppearance.loadTexture("../resources/images/.png");

        this.initBuffers();
	};

	display(scene) 
	{
	this.scene.pushMatrix();
	  this.landAppearance.apply();
	  this.land.display();
	  this.scene.popMatrix();
	};
};