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
		let vf = {};

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
		let x = target.x + (target.w * 0.5);
		let y = target.y + (target.h * 0.5);
		
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

function project_ios_fix_init()
{
	document.addEventListener("gesturestart", project_ios_fix_event, false);
	// document.addEventListener("touchstart", project_ios_fix_event, false);
	document.addEventListener("touchcancel", project_ios_fix_event, false);
}

function project_ios_fix_event(event)
{
	event.preventDefault();
}

function section_init()
{
	sectionsARR = new Array();

	displayList.section0 = document.querySelector(".section0");
	displayList.section1 = document.querySelector(".section1");
	displayList.section2 = document.querySelector(".section2");
	displayList.section3 = document.querySelector(".section3");
	
	let s0 = new Section(displayList.section0, 100, 100, 40, 40, "#333");
	let s1 = new Section(displayList.section1, 320, 568, 1500, 400, "#F49390");
	let s2 = new Section(displayList.section2, 180, 180, 200, 1000, "#C45AB3");
	let s3 = new Section(displayList.section3, 200, 200, 400, 10, "#631A86");

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
	
	for(let i in ui.list)
	{
		ui.list[i].show = false;
		ui.list[i].hasEvent = false;
	}

	ui.HINT_U = {};
	ui.HINT_D = {};
	ui.HINT_L = {};
	ui.HINT_R = {};

	ui.hintList = new Array();

	ui.HINT_U.htmlAttach = document.querySelector(".ui-hint .ui-u");
	ui.HINT_D.htmlAttach = document.querySelector(".ui-hint .ui-d");
	ui.HINT_L.htmlAttach = document.querySelector(".ui-hint .ui-l");
	ui.HINT_R.htmlAttach = document.querySelector(".ui-hint .ui-r");

	ui.hintList.push(ui.HINT_U);
	ui.hintList.push(ui.HINT_D);
	ui.hintList.push(ui.HINT_L);
	ui.hintList.push(ui.HINT_R);

	for(let j in ui.hintList)
	{
		ui.hintList[j].show = false;
	}
}

function ui_required()
{
	if(sectionFocus === 0)
	{
		ui_activate(ui.R);
		ui_activate(ui.D);

		hint_activate(ui.HINT_R);
		hint_activate(ui.HINT_D);
	}
	
	else if(sectionFocus === 1)
	{
		ui_activate(ui.L);
		ui_activate(ui.U);

		hint_activate(ui.HINT_L);
		hint_activate(ui.HINT_U);	
	}
	
	else if(sectionFocus === 2)
	{
		ui_activate(ui.R);
		ui_activate(ui.U);

		hint_activate(ui.HINT_R);
		hint_activate(ui.HINT_U);	
	}
	
	else if(sectionFocus === 3)
	{
		ui_activate(ui.L);
		ui_activate(ui.R);
		ui_activate(ui.D);

		hint_activate(ui.HINT_L);
		hint_activate(ui.HINT_R);
		hint_activate(ui.HINT_D);	
	}

	control_on();
}

function ui_path(direction, keyInput)
{
	let activated = false;

	switch(sectionFocus)
	{
		case 0:
		{
			if(direction === "R")
			{
				section_request(3);
				activated = true;
			}
			
			else if(direction === "D")
			{
				section_request(2);
				activated = true;
			}
			
			break;
		}
		
		case 1:
		{
			if(direction === "U")
			{
				section_request(3);
				activated = true;
			}
			
			else if(direction === "L")
			{
				section_request(2);
				activated = true;
			}
			
			break;
		}
		
		case 2:
		{
			if(direction === "U")
			{
				section_request(3);
				activated = true;
			}
			
			else if(direction === "R")
			{
				section_request(1);
				activated = true;
			}
			
			break;
		}
		
		case 3:
		{
			if(direction === "L")
			{
				section_request(0);
				activated = true;
			}
			
			else if(direction === "R")
			{
				section_request(1);
				activated = true;
			}
			
			else if(direction === "D")
			{
				section_request(2);
				activated = true;
			}
			
			break;
		}
	}

	if(activated && keyInput)
	{
		ui_reset();
		hint_reset();
	}
}

function ui_activate(obj)
{
	obj.show = true;
	obj.hasEvent = true;
	obj.htmlAttach.classList.remove("ui-default");
	obj.htmlAttach.addEventListener("click", ui_event, false);
	obj.htmlAttach.addEventListener("touchstart", ui_event, false);
	obj.htmlAttach.addEventListener("touchend", ui_event, false);
}

function ui_reset()
{
	for(let i in ui.list)
	{
		if(ui.list[i].show)
		{
			ui.list[i].show = false;
			ui.list[i].htmlAttach.classList.add("ui-default");	
		}
		
		
		if(ui.list[i].hasEvent)
		{
			ui.list[i].htmlAttach.removeEventListener("click", ui_event, false);
			ui.list[i].htmlAttach.removeEventListener("touchstart", ui_event, false);
			ui.list[i].htmlAttach.removeEventListener("touchend", ui_event, false);
		}
	}

	control_off();	
}

function ui_event(event)
{
	let direction; 
	
	event.preventDefault();
	
	trace(event.type);
	trace(event);
	
	if(event.type === "touchstart")
	{
		event.target.classList.add("ui-touch");
	}
	
	else if(event.type === "click" || event.type === "touchend")
	{
		ui_reset();
		hint_reset();
		
		if(event.type === "touchend")
		{
			event.target.classList.remove("ui-touch");
		}
		
		direction = event.target.dataset.direction;
		
		ui_path(direction, false);	
	}
}

function hint_activate(obj)
{
	obj.show = true;
	obj.htmlAttach.classList.remove("ui-default");
}

function hint_reset()
{
	for(let i in ui.hintList)
	{
		if(ui.hintList[i].show)
		{
			ui.hintList[i].show = false;
			ui.hintList[i].htmlAttach.classList.add("ui-default");	
		}
	}
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







