/**
* MyCraneArm
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyCraneArm extends CGFobject
{
  constructor(scene)
  {
    super(scene);
    /**CRANE ARM MATERIALS **/
    //ARM
    this.armAppearance = new CGFappearance(this.scene);
    this.armAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.armAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.armAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.armAppearance.setShininess(25);
    this.armAppearance.loadTexture("../resources/images/C_arms.png");
    //POST
    this.postAppearance = new CGFappearance(this.scene);
    this.postAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.postAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.postAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.postAppearance.setShininess(100);
    this.postAppearance.loadTexture("../resources/images/C_post.png");
    //MAGNET
    this.magnetSide = new CGFappearance(this.scene);
    this.magnetSide.setDiffuse(0.5, 0.5, 0.5, 1);
    this.magnetSide.setSpecular(0.5, 0.5, 0.5, 1);
    this.magnetSide.setShininess(25);
    this.magnetSide.loadTexture("../resources/images/C_magnetSide.png");

    this.magnetTop = new CGFappearance(this.scene);
    this.magnetTop.setAmbient(0.8, 0.8, 0.8, 1);
    this.magnetTop.setDiffuse(0.5, 0.5, 0.5, 1);
    this.magnetTop.setShininess(25);
    this.magnetTop.loadTexture("../resources/images/C_magnetTop.png");

    /**CRANEARM ELEMENTS **/
    //ARM
    this.arm = new MyToppedCylinder(scene, 30, 10, this.armAppearance, this.armAppearance);
    //POST
    this.post = new MyToppedCylinder(scene, 30, 10, this.postAppearance, this.postAppearance);
    //MAGNET
    this.magnet = new MyToppedCylinder(scene, 30, 3, this.magnetSide, this.magnetTop);

    /**CRANEARM POSITION**/
    this.angD = -Math.PI/50;
    this.xD = 2.3;
    this.yD = -1.8;

    this.initBuffers();
  };

  downArm(ang, x, y){
    this.angD = ang;
    this.xD = x;
    this.yD = y;
  };

  display(scene)
  {
    this.scene.translate(2.9, 5.9, 0);

    this.scene.pushMatrix();
      this.scene.rotate(this.angD, 0, 0, 1);
      this.scene.pushMatrix();
        this.scene.scale(2.5, 0.25, 0.25);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.arm.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(this.xD, this.yD, 0);
      this.scene.scale(0.1, 1.5, 0.1);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.post.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(this.xD, this.yD, 0);
      this.scene.scale(0.8, 0.1, 0.8);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.magnet.display();
    this.scene.popMatrix();

  };
};
