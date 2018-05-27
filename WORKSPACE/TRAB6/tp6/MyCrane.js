/**
* MyCrane
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyCrane extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		/** CRANE ELEMENTS **/
		//BASE
		this.base = new MyCraneBase(scene);

		this.currPos = 'D';
		this.armPos = 'I';

		this.angArm = [40, 30, 20, 10, 9, 8, 7, 6, 5];
		this.count1 = 0;
		this.count2 = 8;

		this.initBuffers();
	};

	display(scene)
	{
		this.base.display();
	};

	update(currTime, dir)
	{
		switch (dir) {
			case 0:
				this.rotDR();
				break;
			case 1:
				this.armDown();
				break;
			case 2:
				this.armUp();
				break;
			case 3:
				this.rotRD();
				break;
		}
	};

	rotDR()
	{
		if(this.base.getAngle() > 0){
			this.base.decAngle(Math.PI/20);
		}else{
			this.currPos = 'R';
		}
	};

	armDown()
	{
		if(this.count1 < 9){
			this.base.movArm(Math.PI/this.angArm[this.count1++]);
		}else{
			this.armPos = 'F';
		}
	};

	armUp()
	{
		if(this.count2 >= 0){
			this.base.movArm(Math.PI/this.angArm[this.count2--]);
		}else{
			this.armPos = 'I';
		}
	};

	rotRD()
	{
		if(this.base.getAngle() <= 0 && this.base.getAngle() > -Math.PI){
			this.base.decAngle(Math.PI/20);
		}else{
			this.currPos = 'D';
		}
	};

	getPos()
	{
		return this.currPos;
	};

	getArmPos(){
		return this.armPos;
	};

	getArmX(){
		return this.base.getArmX();
	};

	getArmY(){
		return this.base.getArmY();
	};
};
