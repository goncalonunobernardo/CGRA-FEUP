/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends CGFobject
{
	constructor(scene, nrDivs, altimetry)
	{
		super(scene);

        this.land = new Plane(this.scene, nrDivs, altimetry, 0, 1, 0, 1);

				this.terrainAppearance = new CGFappearance(this.scene);
				this.terrainAppearance.loadTexture("../resources/images/terrain.png");

        this.initBuffers();
	};

	display(scene)
	{
	this.scene.pushMatrix();
	  this.terrainAppearance.apply();
	  this.land.display();
	  this.scene.popMatrix();
	};
};
