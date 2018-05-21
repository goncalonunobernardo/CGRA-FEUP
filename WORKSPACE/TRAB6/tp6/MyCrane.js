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

		this.posD = true;
		this.posR = false;

		this.flag = false;

		this.angArmD = [50, 40, 30,  20, 10, 9, 8, 7, 6, 5];
		this.xArmD = [2.3, 2.3, 2.3, 2.3, 2.1, 2.1, 2, 2, 1.9, 1.7];
		this.yArmD = [-1.8, -1.9, -1.9, -2, -2.4, -2.5, -2.5, -2.7, -2.8, -2.8];

		this.count1 = 0;
		this.count2 = 9;

		this.currPos = true;

		this.initBuffers();
	};

	pos(){
		return this.currPos;
	}

	display(scene)
	{
		this.base.display();
	};

	update(currTime, dir){
		if(dir == 0){					// D -> R

			if(this.base.getAngleB() > 0){
				this.base.decAngleB(Math.PI/20);
			}else{
				this.flag = true;
			}

			if(this.count1 < 10 && this.posD && this.flag){
				this.base.downArm(-Math.PI/this.angArmD[this.count1], this.xArmD[this.count1], this.yArmD[this.count1]);
				this.count1++;
			}

			if(this.base.getAngleB() == 0 && this.count1 == 10){			//currPos == R
				this.posD = false;
				this.currPos = false;
				this.posR = true;
			}

		}else if(dir == 1){																					//R -> D

			if(this.count2 >= 0){
				this.base.downArm(-Math.PI/this.angArmD[this.count2], this.xArmD[this.count2], this.yArmD[this.count2]);
				this.count2--;
			}else{
				this.flag = false;
				this.base.setAngleB(0);
			}

			if(this.base.getAngleB() <= 0 && this.base.getAngleB() >= -Math.PI && !this.flag){
				this.base.decAngleB(Math.PI/10);
				console.log(this.base.getAngleB());
			}

		}
	};
};
