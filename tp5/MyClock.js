function MyClock(scene) {
	CGFobject.call(this,scene);

		this.lastUpdate = -1;

	this.cylinder  = new MyCylinder(this.scene,12,1);
	this.surface = new MyClockSurface(this.scene,12);
	this.hourHand = new MyClockHand(this.scene,0.8,0);
	this.secondHand = new MyClockHand(this.scene,0.8,270);
	this.minuteHand = new MyClockHand(this.scene,0.65,180);
	this.hourHand = new MyClockHand(this.scene,0.4,90);



	this.clockAppearence = new CGFappearance(this.scene);
	this.clockAppearence.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.clockAppearence.setSpecular(0.1,0.1,0.1,1);
	this.clockAppearence.setShininess(10);
	this.clockAppearence.loadTexture("../resources/images/clock.png");

	this.blackAppearence = new CGFappearance(this.scene);
	this.blackAppearence.setAmbient(0,0,0,0);
	this.blackAppearence.setDiffuse(0,0,0,0);
	this.blackAppearence.setSpecular(0,0,0,0);
	this.blackAppearence.setShininess(0);




};

MyClock.prototype = Object.create(CGFobject.prototype);

MyClock.prototype.constructor= MyClock;


MyClock.prototype.display= function () {

	this.cylinder.display();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.clockAppearence.apply();
	this.surface.display();
	this.scene.popMatrix();



	this.blackAppearence.apply();

	var degToRad = Math.PI / 180.0;

//second hand
	this.scene.pushMatrix();
	this.scene.translate(0,0,1.1);
	this.scene.rotate(this.secondHand.angle * degToRad, 0, 0, 1);
	this.secondHand.display();
	this.scene.popMatrix();

	//minute hand
		this.scene.pushMatrix();
		this.scene.translate(0,0,1.1);
		this.scene.rotate(this.minuteHand.angle * degToRad, 0, 0, 1);
		this.minuteHand.display();
		this.scene.popMatrix();

		//hour hand
			this.scene.pushMatrix();
			this.scene.translate(0,0,1.1);
			this.scene.rotate(this.hourHand.angle * degToRad, 0, 0, 1);
			this.hourHand.display();
			this.scene.popMatrix();

	this.scene.materialDefault.apply();




};

MyClock.prototype.update = function(currTime){
	if (this.lastUpdate == -1) {
			this.lastUpdate = currTime;
			secInc = 6;
		}
		else {
			var diff = currTime - this.lastUpdate;

			this.lastUpdate = currTime;
			secInc = diff * (360 / (60 * 1000));
		}

		this.secondHand.setAngle(this.secondHand.angle  - secInc);
		this.minuteHand.setAngle(this.minuteHand.angle - secInc / 60);
	this.hourHand.setAngle(this.hourHand.angle - secInc / 3600);

};
