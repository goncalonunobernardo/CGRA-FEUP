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

    /**CRANEBASE MATERIALS **/
    //BASE
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

    /**CRANEBASE ELEMENTS **/
    //BASE
    this.base = new MyToppedCylinder(scene, 30, 3, this.baseSide, this.baseTop);
    //ARM
    this.arm = new MyToppedCylinder(scene, 30, 10, this.armAppearance, this.armAppearance);
    //AXIS
    this.axis = new MyToppedCylinder(scene, 30, 3, this.axisSide, this.axisTop);
    //CRANEARM
    this.craneArm = new MyCraneArm(scene);


    /**CRANEBASE POSITIONS **/
    this.angB= Math.PI;

    this.initBuffers();
  };

  setAngleB(ang){
    this.angle = ang;
  };

  decAngleB(ang){
    this.angB -= ang;
  };

  getAngleB(){
    return this.angB;
  };

  downArm(ang, x, y){
    this.craneArm.downArm(ang, x, y);
  };

  display(scene)
  {
    this.scene.rotate(this.angB, 0, 1, 0);

    this.scene.pushMatrix();
      this.scene.scale(1.5, 0.3, 1.5);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.base.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.rotate(-Math.PI/8, 0, 0, 1);
      this.scene.pushMatrix();
        this.scene.scale(0.35, 5.9, 0.35);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.arm.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(2.4, 5.9, -0.35);
      this.scene.scale(0.65, 0.65, 0.7);
      this.axis.display();
    this.scene.popMatrix();

    this.craneArm.display();
  };
};
