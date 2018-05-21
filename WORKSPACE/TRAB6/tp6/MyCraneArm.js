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

    this.materialDefault = new CGFappearance(this.scene);

    this.base = new MyToppedCylinder(scene, 30, 3, this.materialDefault, this.materialDefault);
    this.arm = new MyToppedCylinder(scene, 30, 10, this.materialDefault, this.materialDefault);

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
      this.arm.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(this.xD, this.yD, 0);
      this.scene.scale(0.8, 0.1, 0.8);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.base.display();
    this.scene.popMatrix();

  };
};
