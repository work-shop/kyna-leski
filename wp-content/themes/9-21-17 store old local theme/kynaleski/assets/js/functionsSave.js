
//global variables
var cw,ch;
var loaded = false;
var state = 'intro';
var moving = false;
var parallaxed = false;


//initial events, and general event binding
jQuery(document).ready(function($) {

	view();
	
	$('#backtotop').click(function(event) {
	  	event.preventDefault();
		$('body,html').animate({scrollTop:0},2000);
	});
	
	$('.menu-toggle').click(function(event) {
	  	event.preventDefault();
		menuToggle();
		console.log('.menu-toggle clicked');
	});

	$(".jump").click(function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		href = href.toLowerCase();
		scrollLink(href);	
	});

	/* for touch scrolling, this event fires when touch point is moved*/
	document.addEventListener("touchmove", scrollStart, false);	

});//end document.ready


//called when the user resizes the window
$(window).resize(function() {

	view();	
	
});//end window.resize


$(window).scroll(function() { 

	requestAnimationFrame(spy);	

	requestAnimationFrame(parallax);

	//number of pixels after which we consider the user to have begun to scroll
	var after = 60;
	       
	if($(this).scrollTop() >= after && $("body").hasClass('before')){
		$("body").removeClass('before').addClass('after');
		console.log('adding after');
	} 
	else if($(this).scrollTop() < after && $("body").hasClass('after')){
		$("body").removeClass('after').addClass('before');	
		console.log('removing after');
	} 
		
});//end window.scroll



//FUNCTIONS

//keyboard pressed m or M	
$(document).keypress(function(e) {
	if(e.which == 109 || e.which == 77) {	
		if($("input:focus")){
			var elem = document.activeElement;
			if (! elem.type ){ 
				menuToggle();
				console.log('m and menu toggle');	
			}
		}
	}
});

//keyboard pressed up arrow	
$(document).keypress(function(e) {
	if(e.which == 38){	
		if($("input:focus")){
			var elem = document.activeElement;
			if (! elem.type ){ 

			}
		}
	}	
});	

//keyboard pressed left arrow	
$(document).keypress(function(e) {
	if(e.which == 37) {	
		if($("input:focus")){
			var elem = document.activeElement;
			if (! elem.type ){ 

			}
		}
	}	
});			


//keyboard pressed right arrow	
$(document).keypress(function(e) {
	if(e.which == 39) {	
		if($("input:focus")){
			var elem = document.activeElement;
			if (! elem.type ){ 

			}
		}
	}	
});			


//initialize flexslider slideshows
function flexsliderSetup(){
	$('.flexslider').flexslider({	
	      animation: 'fade',
	      slideshowSpeed: 8000,           
		  animationSpeed: 700,
	      directionNav: true,
	      controlNav: true
	 });	 		 
	 	 	
}

//animate jump links
function scrollLink(destination){
	$('html,body').animate({
		scrollTop: $(destination).offset().top - 0
	},1500);
}

//open and close the menu
function menuToggle(){	
	if($('body').hasClass('menu-closed')){
		$('#menu').removeClass('closed');
		$('#menu').addClass('open');
		$('body').removeClass('menu-closed');
		$('body').addClass('menu-open');
	}
	
	else if($('body').hasClass('menu-open')){
		$('#menu').removeClass('open');
		$('#menu').addClass('closed');
		$('body').removeClass('menu-open');
		$('body').addClass('menu-closed');
	}
	
}


//measure, resize, and adjust the viewport
function view(){

	spy();
	
	windowHeight = $(window).height();
	windowWidth = $(window).width();

	if($(window).width() >= 768){		
		$('.height-full').css('height',windowHeight);	
		$('.height-min').css('min-height',windowHeight);		
		$('.height-half').css('height',windowHeight*.75);				
		$('.height-three-quarter').css('height',windowHeight*.75);
		$('.height-ninety').css('height',windowHeight*.9);	
		$('.height-ninety').css('margin-top',windowHeight*.05);	
	}
	else{
		$('.height-full').css('height',windowHeight);	
		$('.height-min').css('min-height',windowHeight);		
		$('.height-half').css('height',windowHeight*.75);				
		$('.height-three-quarter').css('height',windowHeight*.75);	
		$('.height-ninety').css('height',windowHeight*.9);						
	}
	
	//if the loadPage function has not been called yet, call it
	if(!loaded){
		loadPage();
	}		

}

//once all elements are sized, slideshows initialized, fade in the content
function loadPage(){
	loaded = true;
	
	flexsliderSetup();

	setTimeout(function(){
		$('.loading').addClass('loaded');
		$('.landing').removeClass('landing').addClass('landed');
		view();
		if ( $('.spy').length > 0 ) { $(document).trigger('spy-init'); }	
	},500);	
		
}

var currentElement = $('.spy-initial')
function spy(){

    //how close to the top of the window the section is when it becomes active
	//var offsetDistance = ($(window).height())/2;
	var offsetDistance = 0;

	//get all of the links in the menu
	var menuLinks = $('#nav-spy a');
 
	//get all of the targets
	var targets = $('.target');	

	//create a new array 
	var spy = new Array();
	
	/*
	* iterate through each menu link
	* build an array with [i][0] = menu link element
	* and [i][1] = spied item's position
	* the each function loops through each item in an array
	* i represents a climbing integer
	*/ 
	menuLinks.each(function(i){

		//create an object to hold each pair of link and target
        spy[i] = {};

		/*
		* get the ID of the target element that corresponds to the menu link
		* store the ID as a string
		*/
		var targetId = $(this).attr('href');

		//use the offset method of the target to get the position of the top of the element in the window
		var targetOffset = $(targetId).offset();
		targetOffset = targetOffset.top;

		//store the information we care about	
		spy[i].link = $(this);		
		spy[i].targetOffset = targetOffset;
		spy[i].target = $(targetId);

	});

	/*
	* iterate through each spied item
	* check if it's currently active
	* apply an active class
	*/ 	
	for(var j = 0; j < spy.length; j++){
		userLocation = $(window).scrollTop() + offsetDistance;
		targetPosition = spy[j].targetOffset;

		if(userLocation >= targetPosition){

			if(spy[j].target != currentElement){
				menuLinks.filter('.active').removeClass('active');
				spy[j].link.addClass('active');
				currentElement.removeClass('active');
				spy[j].target.addClass('active');
				spy[j].target.addClass('activated');

				currentElement = spy[j].target;
			}
		}
	}	

}


function scrollStart(){
	
}


function parallax(){
	
	scrollTop = $(window).scrollTop();

	var pOpacity;

	if(!parallaxed){
		pOpacity = 1;
		parallaxed = true;
	}

	pDistance = ($(window).height()) / 2;
	pOpacityTop = 1;
	pOpacityBottom = 0;
	pProgress = scrollTop / pDistance;
	pOpacity = 1 - pProgress;

	pTopFactor = 4;
	pTop = (scrollTop / pTopFactor) * -1;
	
	//console.log('pTop = ' + pTop);
	//console.log('pOpacity = ' + pOpacity);
	
	$('#tagline').css('top',pTop);
	$('#tagline').css('opacity',pOpacity);
	$('#tagline').css('line-height',pOpacity);
}

