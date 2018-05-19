/**
 * MyWheelR
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheelR extends CGFobject
{
	constructor(scene) //ROTATION ARGS
	{
		super(scene);

        this.cylinder = new MyToppedCylinder(this.scene, 40, 3);
        this.cover = new MySemiSphere(this.scene, 40, 10);

        //MATERIAL AND TEXTURE
        this.wheelAppearance = new CGFappearance(this.scene);
        //this.wheelAppearance.setAmbient(r, g, b, a);
        //this.wheelAppearance.setDiffuse(r, g, b, a);
        //this.wheelAppearance.setSpecular(r, g, b, a);
        //this.wheelAppearance.setShininess(n);
        //thiis.wheelAppearance.loadTexture("../resources/images/tire.png");
        this.initBuffers();
	};

	
	display(scene)
	{
	   //ROTATION
	   this.scene.pushMatrix();
	       this.scene.scale(0.6, 0.6, 0.5);
	       this.wheelAppearance.apply();
	       this.cylinder.display();
	   this.scene.popMatrix();

	   //COVER
	   this.scene.pushMatrix();
	   		this.scene.rotate(Math.PI, 1, 0, 0);
	   		this.scene.scale(0.45, 0.45, 0.25);
	   		this.cover.display();
	   this.scene.popMatrix();

	};
};
