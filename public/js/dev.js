// DEBUG
var trace = function(msg){ console.log(msg); };


var devMode = false;

function pageLoad_init()
{
	trace("pageLoad_init();");
	
	project_ios_fix_init();

	project_setup();
}

function project_setup()
{
	displayList = {};

	displayList.camera = document.querySelector(".camera");
	displayList.viewer = document.querySelector(".viewer");
	displayList.layer0 = document.querySelector(".layer0");
	displayList.player = document.querySelector(".player");

	section_init();
	camera_init();

	// LAST
	resize_init(true);
	
	ui_init();
	
	player_init();
	
	stars_init();
	
	project_start();

	control_init();
}

function project_start()
{
	if(devMode)
	{
		dev_run();	
	}
	
	else
	{
		let destroy = document.querySelector(".dev");
		
		destroy.classList.add("destroy");
	}
	
	section_request(0);
	
	player.playerMoveTo(sectionsARR[0]);
}

function dev_run()
{
	dev_btns();
}


function dev_btns()
{
	displayList.btn0 = document.querySelector(".t0");
	displayList.btn1 = document.querySelector(".t1");
	displayList.btn2 = document.querySelector(".t2");
	displayList.btn3 = document.querySelector(".t3");

	dev_init();
}

function dev_init()
{
	for(let i = 0; i < 4; i++)
	{
		displayList["btn" + i].addEventListener("click", dev_event, false);
	}
}

function dev_event(event)
{
	event.preventDefault();
	
	section_request(event.target.dataset.num);
}