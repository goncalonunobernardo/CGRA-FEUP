 
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

		this.gui.add(this.scene, 'activate_axis');
		this.gui.add(this.scene, 'deactivate_axis');	
		

		// add a group of controls (and open/expand by defult)

		var group=this.gui.addFolder('LIGHTS');
		group.open();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		group.add(this.scene, 'Light1');
		group.add(this.scene, 'Light2');
		group.add(this.scene, 'Light3');
		group.add(this.scene, 'Light4');


		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'speed', -5, 5);

		this.initKeys();

		return true;
	};

	/**
	 * initKeys
	 */
	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}

	/**
	 * processKeyDown
	 * @param event {Event}
	 */
	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	/**
	 * processKeyUp
	 * @param event {Event}
	 */
	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	/**
	 * isKeyPressed
	 * @param keyCode {int}
	 */
	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}


/**
 * processKeyboard
 * @param event {Event}
 */
	processKeyboard(event) {
	//Process to obtain unicode
		var x = event.keyCode || event.which;

		if (x == 65 || x == 97){
			this.scene.car.pushLeft(-.003);
		}
		else
		if (x == 68 ||x == 100)	{
			this.scene.car.pushRight(-.003)
		}
		else
		if (x == 87 || x == 119){
			this.scene.car.pushForward(0.03);
		}
		else
		if (x == 83 || x == 115)	{
			this.scene.car.pushBackwards(0.03);
		}
	}
};