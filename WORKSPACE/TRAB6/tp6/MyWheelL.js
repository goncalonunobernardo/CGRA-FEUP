/**
 * MyWheelL
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheelL extends CGFobject
{
	constructor(scene) //ROTATION ARGS
	{
		super(scene);

        this.cylinder = new MyToppedCylinder(this.scene, 20, 3);
        this.cover = new MySemiSphere(this.scene, 20, 6);

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
	   		this.scene.translate(0, 0, 0.5);
	   		this.scene.scale(0.45, 0.45, 0.25);
	   		this.cover.display();
	   this.scene.popMatrix();

	};
};
