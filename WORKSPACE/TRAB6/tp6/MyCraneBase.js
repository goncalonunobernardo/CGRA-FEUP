/**
* MyCraneBase
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyCraneBase extends CGFobject
{
  constructor(scene)
  {
    super(scene);

    /** CRANE BASE MATERIALS **/
    //BASE SIDE
    this.baseSide = new CGFappearance(this.scene);
    this.baseSide.setDiffuse(0.5, 0.5, 0.5, 1);
    this.baseSide.setSpecular(0.5, 0.5, 0.5, 1);
    this.baseSide.setShininess(15);
    this.baseSide.loadTexture("../resources/images/C_baseSide.png");

    //BASE TOP
    this.baseTop = new CGFappearance(this.scene);
    this.baseTop.setAmbient(0.6, 0.6, 0.6, 1);
    this.baseTop.setDiffuse(0.5, 0.5, 0.5, 1);
    this.baseTop.setSpecular(0.5, 0.5, 0.5, 1);
    this.baseTop.setShininess(15);
    this.baseTop.loadTexture("../resources/images/C_baseTop.png");

    //ARM
    this.armAppearance = new CGFappearance(this.scene);
    this.armAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.armAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.armAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.armAppearance.setShininess(25);
    this.armAppearance.loadTexture("../resources/images/C_arms.png");

    //AXIS SIDE
    this.axisSide = new CGFappearance(this.scene);
    this.axisSide.setDiffuse(0.5, 0.5, 0.5, 1);
    this.axisSide.setShininess(15);
    this.axisSide.loadTexture("../resources/images/C_axisSide.png");

    //AXIS TOP
    this.axisTop = new CGFappearance(this.scene);
    this.axisTop.setDiffuse(0.5, 0.5, 0.5, 1);
    this.axisTop.setShininess(15);
    this.axisTop.loadTexture("../resources/images/C_axisTop.png");

    /**CRANE BASE ELEMENTS **/
    //BASE
    this.base = new MyToppedCylinder(scene, 30, 3, this.baseSide, this.baseTop);
    //ARM
    this.arm = new MyToppedCylinder(scene, 30, 10, this.armAppearance, this.armAppearance);
    //AXIS
    this.axis = new MyToppedCylinder(scene, 30, 3, this.axisSide, this.axisTop);
    //CRANE ARM
    this.craneArm = new MyCraneArm(scene);

    /**CRANE BASE POSITIONS **/
    this.ang= Math.PI;

    this.initBuffers();
  };

  display(scene)
  {
    this.scene.rotate(this.ang, 0, 1, 0);

    this.scene.pushMatrix();
      this.scene.scale(1.5, 0.7*Math.cos(3*Math.PI/8), 1.5);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.base.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.rotate(-Math.PI/8, 0, 0, 1);
      this.scene.pushMatrix();
        this.scene.scale(0.35, 7.3, 0.35);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.arm.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(7.3*Math.cos(3*Math.PI/8) + 0.35*Math.cos(Math.PI/8), 7.3*Math.sin(3*Math.PI/8) - 0.35*Math.sin(Math.PI/8), -0.35);
      this.scene.scale(0.7, 0.7, 0.7);
      this.axis.display();
    this.scene.popMatrix();

    this.craneArm.display();
  };

  decAngle(ang)
  {
    this.ang -= ang;
  };

  getAngle()
  {
    return this.ang;
  };

  movArm(ang)
  {
    this.craneArm.movArm(ang);
  };

  getArmX()
  {
    return this.craneArm.get_x();
  };

  getArmY()
  {
    return this.craneArm.get_y();
  };
};
