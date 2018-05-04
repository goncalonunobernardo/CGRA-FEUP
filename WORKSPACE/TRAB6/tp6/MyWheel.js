/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{
	constructor(scene) //ROTATION ARGS 
	{
		super(scene);

        this.cylinder = new MyToppedCylinder(this.scene, 20, 3);

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

	};
};