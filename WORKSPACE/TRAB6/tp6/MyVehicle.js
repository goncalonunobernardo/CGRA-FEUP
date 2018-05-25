/**
* MyVehicle
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyVehicle extends CGFobject
{
  constructor(scene)
  {
    super(scene);

    //VEHICLE POSITION
    this.x = 0;
    this.y = 0;
    this.z = 0;

    //VEHICLE LOGIC
    //angularspeed
    this.a = 0;

    //angle
    this.b = 0;
    this.h_speed = 0;
    this.h_angspeed = 0;

    this.time = 0;
    this.max_h_speed = .5;
    this.max_h_angspeed = .07;
    this.h_rotation_ang =0;

    this.wheelAngle = 0;

    this.lastUpdatedTime = -1;

    this.mov = false;

    //STRUCTURE
    this.body = new MyUnitCubeQuad(this.scene, 0, 1, 0, 1);
    this.upperBody = new MyUpperBody(this.scene);
    this.wheelL = new MyWheelL(this.scene);
    this.wheelR = new MyWheelR(this.scene);
  };

  display(scene)
  {
    this.scene.pushMatrix();

      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(this.b, 0, 1, 0);

      //MAIN BODY
      this.scene.pushMatrix();
        this.scene.scale(4, 1.5, 2);
        this.body.display();
      this.scene.popMatrix();

      //UPPER BODY
      this.scene.pushMatrix();
        this.upperBody.display();
      this.scene.popMatrix();

      //FRONT LEFT WHEEL
      this.scene.pushMatrix();
        this.scene.translate(1.4, -0.7, 0.8);
        this.scene.rotate(this.wheelAngle,0,1,0);
        this.wheelL.display();
      this.scene.popMatrix();

      //BACK LEFT WHEEL
      this.scene.pushMatrix();
        this.scene.translate(-1.4, -0.7, 0.8);
        this.wheelL.display();
      this.scene.popMatrix();

      //FRONT RIGHT WHEEL
      this.scene.pushMatrix();
        this.scene.translate(1.4, -0.7, -1.3);
        this.scene.rotate(this.wheelAngle,0,1,0);
        this.wheelR.display();
      this.scene.popMatrix();

      //BACK RIGHT WHEEL
      this.scene.pushMatrix();
        this.scene.translate(-1.4, -0.7, -1.3);
        this.wheelR.display();
      this.scene.popMatrix();

    this.scene.popMatrix();
  };

  update(currTime)
  {
    this.moveForward(this.h_speed);
    this.rotateRight(this.h_angspeed);

    this.h_speed *=.99;
    this.h_angspeed *=0.95;

    if(this.scene.car.h_rotation_ang >0) {
      this.scene.car.h_rotation_ang -= 1.5;
      this.scene.car.wheelAngle += 0.01;
    }
    if(this.scene.car.h_rotation_ang <0) {
      this.scene.car.h_rotation_ang += 1.5;
      this.scene.car.wheelAngle -= 0.01;
    }
    if(this.a<0 ) {this.a+= 0.4; }

    if(this.a>0) this.a-= 0.4;
  }

  moveForward(amount) {
    var xval = amount * Math.cos(this.b);
    var zval = amount * Math.sin(this.b);

    this.x+= xval;
    this.z-= zval;

    this.wheelL.setAng(-this.x);
    this.wheelR.setAng(-this.x);
  };

  pushForward(amount) {
    if(this.y != 0) return;
    if(Math.abs(this.h_speed + amount) <= this.max_h_speed) this.h_speed += amount;
    else if (this.h_speed > 0) this.h_speed = this.max_h_speed;
    else this.h_speed = - this.max_h_speed;

  };

  pushBackwards(amount) {
    if(this.y != 0) return;
    this.pushForward(-amount);
  };

  pushLeft(amount) {
    if(this.y != 0) return;
    if(Math.abs(this.h_speed) < 0.05) { this.h_angspeed = 0; amount = 0}
    if(Math.abs(this.h_angspeed + amount) <= this.max_h_angspeed)
    this.h_angspeed+=amount;
    else if(this.h_angspeed > 0) this.h_angspeed = this.max_h_angspeed;
    else this.h_angspeed = -this.max_h_angspeed
  };

  pushRight(amount){
    if(this.y != 0) return;
    if(Math.abs(this.h_speed) < 0.05) { this.h_angspeed =0; amount = 0}
    if(Math.abs(this.h_angspeed - amount) <= this.max_h_angspeed)
    this.h_angspeed-=amount;
    else if(this.h_angspeed > 0) this.h_angspeed = this.max_h_angspeed;
    else this.h_angspeed = -this.max_h_angspeed;
  };

  rotateRight(amount)
  {
    this.b -= amount;

    if(this.scene.car.h_rotation_ang < 45 && amount >0.01) { this.scene.car.h_rotation_ang += 5; this.scene.car.wheelAngle = -Math.PI/6 + 0.2; }
    if(this.scene.car.h_rotation_ang > -45 && amount <-0.01){ this.scene.car.h_rotation_ang -= 5; this.scene.car.wheelAngle = Math.PI/6 - 0.2; }
    if(this.scene.car.h_speed == 0) { this.scene.car.wheelAngle = 0 }
  };

  get_x() {
    return this.x;
  };

  get_z() {
    return this.z;
  };

  get_h_angle() {
    return this.h_angspeed;
  };

  set_x(x){
    this.x = x;
  };

  set_y(y){
    this.y = y;
  };

  set_z(z){
    this.z = z;
  };

  inc_x(x){
    this.x +=x;
  };

  inc_y(y){
    this.y += y;
  };

  inc_z(z){
    this.z += z;
  };

  resetMov(){
    this.mov = false;
  };

  getPos(){
    if(this.mov) return 'R';

    if(this.z == 0){
      if(this.x >= 6.5 && this.x <= 7.5){
        this.mov = true;
        return 'R';
      }
    }else{
      return 'M';
    }
  };
};
