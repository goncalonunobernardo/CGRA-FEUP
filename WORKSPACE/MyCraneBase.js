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

    this.materialDefault = new CGFappearance(this.scene);

    this.craneArm = new MyCraneArm(scene);

    this.base = new MyToppedCylinder(scene, 30, 3, this.materialDefault, this.materialDefault);
    this.arm = new MyToppedCylinder(scene, 30, 10, this.materialDefault, this.materialDefault);

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
      this.base.display();
    this.scene.popMatrix();

    this.craneArm.display();
  };
};
