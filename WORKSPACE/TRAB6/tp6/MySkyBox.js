/**
* MySkyBox
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MySkyBox extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT)
	{
		super(scene);

    this.materialDefault = new CGFappearance(this.scene);

    /** SKYBOX MATERIALS **/
    this.top = new CGFappearance(this.scene);
    this.top.loadTexture("../resources/images/SB_top.png");

    this.bottom = new CGFappearance(this.scene);
    this.bottom.loadTexture("../resources/images/SB_bottom.png");

    this.right = new CGFappearance(this.scene);
    this.right.loadTexture("../resources/images/SB_1.png");

    this.front = new CGFappearance(this.scene);
    this.front.loadTexture("../resources/images/SB_2.png");

    this.left = new CGFappearance(this.scene);
    this.left.loadTexture("../resources/images/SB_3.png");

    this.back = new CGFappearance(this.scene);
    this.back.loadTexture("../resources/images/SB_4.png");

    /** SKYBOX ELEMENTS **/
		 this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);

    this.quad.initBuffers();
	};

	display(scene)
	{
    //FRONT
		this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.front.apply();
			this.quad.display();
		this.scene.popMatrix();

    //BACK
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI,1,0,0);
			this.scene.translate(0,0,0.5);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.scene.rotate(Math.PI, 0, 0, 1);
      this.back.apply();
			this.quad.display();
		this.scene.popMatrix();

    //TOP
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.scene.translate(0,0,0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.top.apply();
      this.quad.display();
		this.scene.popMatrix();

    //BOTTOM
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.translate(0,0,0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.bottom.apply();
			this.quad.display();
		this.scene.popMatrix();

    //RIGHT
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(0,0,0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.right.apply();
			this.quad.display();
		this.scene.popMatrix();

    //LEFT
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.scene.translate(0,0,0.5);
      this.scene.rotate(-Math.PI, 0, 1, 0);
      this.left.apply();
			this.quad.display();
		this.scene.popMatrix();
	};
};
