/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends CGFobject
{
	constructor(scene) //ROTATION ARGS 
	{
		super(scene);

        this.land = new Plane(this.scene, 0, 50, 0, 50, 100);

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
	  this.landAppearance.apply();
	  this.land.display();
	};
};