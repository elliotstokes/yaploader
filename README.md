yaploader
=========

Yet another JavaScript preloader. Used to preload media to ensure it has loaded when used. Useful for games etc when you need to ensure assets are ready.

#Usage

To use first you need an array of items to preload

var items = [
	{ identifier: "enemyImage", type:"image", src: "images/house.jpeg"},
	{ identifier: "backgroudSound",type:"audio", src: "sounds/background.mp3"},
	{ identifier: "bangSound",type:"audio", src: "sounds/bang.mp3"},
	{ identifier: "explosionSound",type:"audio", src: "sounds/explosion.mp3"},
	{ identifier: "laserSound",type:"audio", src: "sounds/laser.mp3"}
];

pass these into the constructor

var preloader = new Preloader(items);

preloader.preloadComplete = function() {
	//load complete
};

preloader.progressChanged = function(percentComplete) {
	//load progressed
};

preloader.preload();

Once the preload complete event has fired you can access the loaded objcts with

var sound = _PreLoader.getItem("id");
sound.play();
