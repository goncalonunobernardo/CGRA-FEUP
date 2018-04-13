
 function MyClockHand(scene,length,angle) {
 	CGFobject.call(this,scene);

    this.length= length;
    this.angle = -angle;
    this.quad = new MyQuad(this.scene);
    this.quad.initBuffers();


 	this.initBuffers();
 };


 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.initBuffers = function() {



 	this.vertices = [];
 	this.indices = [];
	this.normals = [];

	//Desenho da base do cilindro

	this.vertices.push(0,0,0);
	this.vertices.push(0.02,this.length*3/4,0);
  this.vertices.push(0,this.length,0);
	this.vertices.push(-0.02,this.length*3/4,0);

	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
  this.normals.push(0,0,1);

	this.indices.push(3,0,1);
  this.indices.push(3,1,2);




this.primitiveType = this.scene.gl.TRIANGLES;
this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angle){

this.angle = angle;

};
