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

		this.base = new MyCraneBase(scene);

		this.angArmD = [50, 40, 30,  20, 10, 9, 8, 7, 6, 5];
		this.xArmD = [2.3, 2.3, 2.3, 2.3, 2.1, 2.1, 2, 2, 1.9, 1.7];
		this.yArmD = [-1.8, -1.9, -1.9, -2, -2.4, -2.5, -2.5, -2.7, -2.8, -2.8];

		this.count1 = 0;
		this.count2 = 9;

		this.currPos = 'D';
		this.rot = false;
		this.trans = false;

		this.initBuffers();
	};

	getRot(){
		return this.rot;
	};

	getTrans(){
		return this.trans;
	};

	display(scene)
	{
		this.base.display();
	};

	update(currTime, dir){
		if(dir == 0 && this.currPos == 'D'){
			this.rotateBase_DR();			//Rotates [Base + Arm] de D -> R
		//	console.log("ROT_DR");
		}else if(dir == 0 && this.currPos == 'R'){
			this.rotateBase_RD();			//Rotates [Base + Arm] (+ car) de R -> D
		//	console.log("ROT_RD");
		}

		if(dir == 1 && this.currPos == 'D'){
			this.armDown_DR();				//Translate [Arm]
			//console.log("TRANS_D");
		}else if(dir == 1 && this.currPos == 'R'){
			this.armUp_RD();					//Translate [Arm] (+ car)
		//	console.log("TRANS_U");
		}

	};

	rotateBase_DR(){
		if(this.base.getAngleB() > 0){
			this.base.decAngleB(Math.PI/20);
		}else{
			this.rot = true;
		}
	};

	rotateBase_RD(){
		if(this.base.getAngleB() <= 0 && this.base.getAngleB() > -Math.PI){
			this.base.decAngleB(Math.PI/20);
		}else{
			this.rot = true;
		}
	};

	armDown_DR(){
		if(this.count1 < 10){
			this.base.downArm(-Math.PI/this.angArmD[this.count1], this.xArmD[this.count1], this.yArmD[this.count1]);
			this.count1++;
		}else{
			this.count1 = 0;
			this.trans = true;
			this.currPos = 'R';
		}
	};

	armUp_RD(){
		if(this.count2 >= 0){
			this.base.downArm(-Math.PI/this.angArmD[this.count2], this.xArmD[this.count2], this.yArmD[this.count2]);
			this.count2--;
		}else{
			this.trans = true;
			this.count2 = 0;
		}
	};

	pos(){
		return this.currPos;
	};

	reset(){
		this.rot = false;
		this.trans = false;
	}


};
