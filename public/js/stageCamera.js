// DEBUG
var trace = function(msg){ console.log(msg); };

class Camera
{
	constructor(main)
	{
		this.htmlAttach = main;
		this.viewerAdvanced = false;
	}

	updateResizeCamera()
	{
		this.w = this.htmlAttach.offsetWidth;
		this.h = this.htmlAttach.offsetHeight;
		
		this.x = 0;
		this.y = 0;
	}

	connectViewer(div)
	{
		this.viewer = div;
		this.viewW = this.viewer.offsetWidth;
		this.viewH = this.viewer.offsetHeight;
		
		this.viewer.x = 0;
		this.viewer.y = 0;
	}
	
	connectViewerOther(div)
	{
		this.viewerAdvanced = true;
		this.viewerOther = div;
	}
	
	connectPlayer(obj)
	{
		this.player = obj;
	}

	viewerFind(target)
	{
		var vf = {};

		vf.cx = -(target.x) + ((this.w * 0.5) - (target.w * 0.5));
		vf.cy = -(target.y) + ((this.h * 0.5) - (target.h * 0.5));

		this.viewerShift(vf.cx, vf.cy);
	}

	viewerShift(x, y)
	{
		this.viewer.x = x;
		this.viewer.y = y;
		
		if(this.viewer.x != this.x || this.viewer.y != this.y)
		{
			this.viewerTransition();
			this.player.playerMoveTo(sectionsARR[sectionFocus]);
		}
	}

	viewerTransition()
	{
		this.viewer.addEventListener("transitionend", this.viewerTransitionEvent, false);

		this.viewer.setAttribute("style", "transform: translate(" + this.viewer.x + "px, " + this.viewer.y + "px);");
		
		if(this.viewerAdvanced)
		{
			this.viewerOther.setAttribute("style", "transform: translate(" + -(this.viewer.x * 0.25) + "px, " + -(this.viewer.y * 0.25) + "px);");
		}
	}

	// OUT OF SCOPE
	viewerTransitionEvent(event)
	{
		event.target.removeEventListener("transitionend", this.viewerTransitionEvent, false);

		// LINK BACK VALUES
		camera_newFocus();
	}

	viewerUpdateValues()
	{
		this.x = this.viewer.x;
		this.y = this.viewer.y;	
	}
}

class Section
{
	constructor(main, w, h, x, y, bg)
	{
		this.htmlAttach = main;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		this.bg = bg;	
	}

	placement()
	{
		this.htmlAttach.setAttribute("style", "width: " + this.w + "px; height: " + this.h + "px; transform: translate(" + this.x + "px, " + this.y + "px); background: " + this.bg + ";");
	}
}

class Player
{
	constructor(htmlAttach, w, h, x, y)
	{
		this.htmlAttach = htmlAttach;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
	}
	
	playerMoveTo(target)
	{
		var x = target.x + (target.w * 0.5);
		var y = target.y + (target.h * 0.5);
		
		this.htmlAttach.setAttribute("style", "transform: translate(calc(" + x + "px - " + (this.w * 0.5) + "px), calc(" + y + "px - " + (this.h * 0.5) + "px));");	
	}
}


var CAM; 
var displayList;
var resizeTimeout;
var sectionsARR;
var sectionFocus;

var ui;

var player;

var devMode = false;

function pageLoad_init()
{
	trace("pageLoad_init();");
	
	document.addEventListener("gesturestart", project_iosKillScale, false);

	project_setup();
}

function project_iosKillScale(event)
{
	event.preventDefault();
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
}

function project_start()
{
	if(devMode)
	{
		dev_run();	
	}
	
	else
	{
		var destroy = document.querySelector(".dev");
		
		destroy.classList.add("destroy");
	}
	
	section_request(0);
	
	player.playerMoveTo(sectionsARR[0]);
}

function section_init()
{
	sectionsARR = new Array();

	displayList.section0 = document.querySelector(".section0");
	displayList.section1 = document.querySelector(".section1");
	displayList.section2 = document.querySelector(".section2");
	displayList.section3 = document.querySelector(".section3");
	
	var s0 = new Section(displayList.section0, 100, 100, 40, 40, "#333");
	var s1 = new Section(displayList.section1, 320, 568, 1500, 400, "#F49390");
	var s2 = new Section(displayList.section2, 180, 180, 200, 1000, "#C45AB3");
	var s3 = new Section(displayList.section3, 200, 200, 400, 10, "#631A86");

	s0.placement();
	s1.placement();
	s2.placement();
	s3.placement();

	sectionsARR.push(s0);
	sectionsARR.push(s1);
	sectionsARR.push(s2);
	sectionsARR.push(s3);
}

function section_request(num)
{
	if(num != sectionFocus)
	{
		sectionFocus = num;
		
		CAM.viewerFind(sectionsARR[sectionFocus]);
	}
}

function player_init()
{
	player = new Player(displayList.player, 112, 307, 0, 0);
	
	CAM.connectPlayer(player);
}


function camera_init()
{
	CAM = new Camera(displayList.camera);

	CAM.updateResizeCamera();
	CAM.connectViewer(displayList.viewer);
	CAM.connectViewerOther(displayList.layer0);
}

function camera_newFocus()
{
	CAM.viewerUpdateValues();
	
	ui_required();
}

function ui_init()
{
	ui = {};
	
	ui.U = {};
	ui.D = {};
	ui.L = {};
	ui.R = {};
	
	ui.list = new Array();
	
	ui.U.htmlAttach = document.querySelector(".ui .ui-u");
	ui.D.htmlAttach = document.querySelector(".ui .ui-d");
	ui.L.htmlAttach = document.querySelector(".ui .ui-l");
	ui.R.htmlAttach = document.querySelector(".ui .ui-r");
	
	ui.list.push(ui.U);
	ui.list.push(ui.D);
	ui.list.push(ui.L);
	ui.list.push(ui.R);
	
	for(var i in ui.list)
	{
		ui.list[i].show = false;
		ui.list[i].hasEvent = false;
	}
}

function ui_required()
{
	if(sectionFocus === 0)
	{
		ui_activate(ui.R);
		ui_activate(ui.D);
	}
	
	else if(sectionFocus === 1)
	{
		ui_activate(ui.L);
		ui_activate(ui.U);		
	}
	
	else if(sectionFocus === 2)
	{
		ui_activate(ui.R);
		ui_activate(ui.U);		
	}
	
	else if(sectionFocus === 3)
	{
		ui_activate(ui.L);
		ui_activate(ui.R);
		ui_activate(ui.D);		
	}
}

function ui_path(direction)
{
	switch(sectionFocus)
	{
		case 0:
		{
			if(direction === "R")
			{
				section_request(3);
			}
			
			else if(direction === "D")
			{
				section_request(2);
			}
			
			break;
		}
		
		case 1:
		{
			if(direction === "U")
			{
				section_request(3);
			}
			
			else if(direction === "L")
			{
				section_request(2);
			}
			
			break;
		}
		
		case 2:
		{
			if(direction === "U")
			{
				section_request(3);
			}
			
			else if(direction === "R")
			{
				section_request(1);
			}
			
			break;
		}
		
		case 3:
		{
			if(direction === "L")
			{
				section_request(0);
			}
			
			else if(direction === "R")
			{
				section_request(1);
			}
			
			else if(direction === "D")
			{
				section_request(2);
			}
			
			break;
		}
	}
}

function ui_activate(obj)
{
	obj.show = true;
	obj.hasEvent = true;
	obj.htmlAttach.classList.remove("ui-default");
	obj.htmlAttach.addEventListener("click", ui_event, false);
}

function ui_reset()
{
	for(var i in ui.list)
	{
		if(ui.list[i].show)
		{
			ui.list[i].show = false;
			ui.list[i].htmlAttach.classList.add("ui-default");	
		}
		
		
		if(ui.list[i].hasEvent)
		{
			ui.list[i].htmlAttach.removeEventListener("click", ui_event, false);
		}
	}	
}

function ui_event(event)
{
	var direction; 
	
	event.preventDefault();
	
	ui_reset();
	
	direction = event.target.dataset.direction;
	
	ui_path(event.target.dataset.direction);
}

function resize_init(run)
{
	if(run)
	{
		window.addEventListener("resize", resize_throttler, false);
	}

	else
	{
		window.removeEventListener("resize", resize_throttler, false);
	}
}

function resize_throttler()
{
	if(!resizeTimeout)
	{
		resizeTimeout = setTimeout(resize_call, 66);
	}
}

function resize_call()
{
	resizeTimeout = null;
	resize_apply();
}

function resize_apply()
{
	CAM.updateResizeCamera();
	CAM.viewerFind(sectionsARR[sectionFocus]);
}







