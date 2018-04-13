/**
 * MyPrism
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

   this.vertices = [];
    this.indices = [];
   	this.normals = [];


   	for (var q = 0; q <= this.stacks; q++) {
   		for (var i = 0; i < this.slices; i++) {
   		this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
   		this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
   		this.vertices.push(q);

   		this.normals.push(Math.cos(i*(2*Math.PI)/this.slices));
   		this.normals.push(Math.sin(i*(2*Math.PI)/this.slices));
   		this.normals.push(q);
   		}
   	}


   	for (var q = 0; q < this.stacks; q++) {
   		for (var i = 0; i < this.slices; i++) {

   			this.indices.push(this.slices*q+i);
   			this.indices.push(this.slices*q+i+1);
   			this.indices.push(this.slices*(q+1)+i);
   			if (i != (this.slices - 1)) {
   				this.indices.push(this.slices*(q+1)+i+1);
   				this.indices.push(this.slices*(q+1)+i);
   				this.indices.push(this.slices*q+i+1);
   				}
   			else {
   				this.indices.push(this.slices*q);
   				this.indices.push(this.slices*q+i+1)
   				this.indices.push(this.slices*q+i);
   				}
   		}
   }



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
