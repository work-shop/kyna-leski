
//global variables
var cw,ch;
var loaded = false;
var state = 'intro';
var moving = false;
var parallaxed = false;

var spy = ScrollSpy();

//initial events, and general event binding
jQuery(document).ready(function($) {

	device();

	$('.pronunciation').click(function(event) {
		event.preventDefault();
	  	var audio = $(this).find('audio').get(0);
	  	audio.play();
	});	

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

	$(".nav-toggle").click(function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		href = href.toLowerCase();		
		blockToggle(href,this);	
	});				

	/* for touch scrolling, this event fires when touch point is moved*/
	document.addEventListener("touchmove", scrollStart, false);	

});//end document.ready


//called when the user resizes the window
$(window).resize(function() {

	view();	
	
});//end window.resize


$(window).scroll(function() { 

	scrollStart();
		
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
	      slideshowSpeed: 2000,           
		  animationSpeed: 700,
	      directionNav: true,
	      controlNav: true
	 });	 		 
	 	 	
}

//animate jump links
function scrollLink(destination,speed){
	if(!speed){
		speed = 1500;
	}
	$('html,body').animate({
		scrollTop: $(destination).offset().top - 0
	},speed);
}

function function_name (argument) {
	// body...
}

//open and close the menu
function blockToggle(blockTarget,navLink){	

	if(blockTarget == '#top'){
		$('.block').removeClass('on');	
		$('.block').addClass('off');
		$('.nav-toggle').removeClass('on');	
		$('.nav-toggle').addClass('off');		
		$('body').removeClass('blocks-open');
		$('body').addClass('blocks-closed');

	}else{

	if($('body').hasClass('blocks-closed')){
		$('body').addClass('blocks-open');
	}

	$('.block').removeClass('on');	
	$('.block').addClass('off');	
	$(blockTarget).removeClass('off');
	$(blockTarget).addClass('on');	
	
	$('.nav-toggle').removeClass('on');	
	$('.nav-toggle').addClass('off');				
	$(navLink).removeClass('off');
	$(navLink).addClass('on');	

	}

	scrollLink('#top',250);

}


//measure, resize, and adjust the viewport
function view(){
	
	windowHeight = $(window).height();
	windowWidth = $(window).width();

		
	//if the loadPage function has not been called yet, call it
	if(!loaded){
		loadPage();
	}		


}

//once all elements are sized, slideshows initialized, fade in the content
function loadPage(){
	loaded = true;
	
	setTimeout(function(){
		$('.loading').addClass('loaded');
		$('.landing').removeClass('landing').addClass('landed');
		view();
		loadPreviews();		

		// var video = document.getElementById('video');
		// video.addEventListener('click',function(){
		//   video.play();
		// },false);


		// window.addEventListener('click',function(){
		// 	var video = document.getElementById('landing-clip');	
		//   	video.play();
		//   $('#play-button').hide();
		// },false);


		// var video = document.getElementById('landing-clip');
		// var button = document.getElementById('play-button');
		// button.addEventListener('click',function(){
		//   video.play();
		//   //$('#play-button').hide();
		// },false);
		
	},500);	
		
}


function scrollStart(){
	requestAnimationFrame( scrollAfter );
}


function scrollAfter(){
	//number of pixels after which we consider the user to have begun to scroll
	var after = 40;
	       
	if($(window).scrollTop() >= after && $("body").hasClass('before')){
		$("body").removeClass('before').addClass('after');
		//console.log('adding after');
	} 
	else if($(window).scrollTop() < after && $("body").hasClass('after')){
		$("body").removeClass('after').addClass('before');	
		//console.log('removing after');
	} 
}



function ScrollSpy(){
	
	var initialSet,currentElement,offsetDistance, menuLinks, targets, spyData;

	//initial target element, targets, nav links, offset distance
	function spyInitialize(_currentElement,_targets,_menuLinks,_offsetDistance){

		initialSet = false;

		currentElement = _currentElement;

		//get all of the targets
		targets = _targets;

		//get all of the links in the menu
		menuLinks = _menuLinks;		

	    //how close to the top of the window the section is when it becomes active
		offsetDistance = _offsetDistance;		

		//create a new array 
		spyData = new Array();
		
		spyUpdate();

	}

	function spyUpdate(){

		/*
		* iterate through each menu link
		* build an array with [i][0] = menu link element
		* and [i][1] = spied item's position
		* the each function loops through each item in an array
		* i represents a climbing integer
		*/ 
		menuLinks.each(function(i){

			//create an object to hold each pair of link and target
	        spyData[i] = {};

			/*
			* get the ID of the target element that corresponds to the menu link
			* store the ID as a string
			*/
			var targetId = $(this).attr('href');

			//use the offset method of the target to get the position of the top of the element in the window
			var targetOffset = $(targetId).offset();
			targetOffset = targetOffset.top;

			//store the information we care about	
			spyData[i].link = $(this);		
			spyData[i].targetOffset = targetOffset;
			spyData[i].target = $(targetId);
		});

		spyRun();
	}


	function spyRun(){

		for(var j = 0; j < spyData.length; j++){

			var userLocation,targetPosition,nextTargetPosition;

			userLocation = $(window).scrollTop() + offsetDistance;
			targetPosition = spyData[j].targetOffset;

			if( j < (spyData.length - 1) ){
				nextTargetPosition = spyData[j+1].targetOffset;
			}

			if( userLocation >= targetPosition && (( j == spyData.length - 1 ) || (userLocation < nextTargetPosition))) {

				if(!currentElement.is(spyData[j].target) || !initialSet ){

					menuLinks.filter('.active').removeClass('active');
					spyData[j].link.addClass('active');
					currentElement.removeClass('active');
					spyData[j].target.addClass('active');
					spyData[j].target.addClass('activated');

					currentElement = spyData[j].target;
					initialSet = true;

					if(currentElement.is($('#sanctuaries'))){
						video = document.getElementById('sanctuaries-background-video');
          				video.play();
					}

				}

			}
		}	
	}

	//return an object with three methods to initialize, update, and run the spy function
	return{
		initialize : spyInitialize,
		update : spyUpdate,
		run : spyRun
	}

}




//upon loading the page, go and fetch iframes for each link in the bio
function loadPreviews(){

	var links = $('#bio-body a').not('.pronunciation');
	var linkUrls = [];
	var destination = $('#iframes');

	for (var i = 0; i < links.length; i++) {
		
		linkUrls[i] = $(links[i]).attr('href');

		$(links[i]).data('link-id',i);
		
		var output = '<iframe src="' + linkUrls[i] + '" id="outlink-' + i + '" class="outlink off" >';
		
		$(links[i]).append(output);

	}

	$(links).hover(


		  function(event) {
		  	if($(window).width() >= 768){

			  	var mouseY = event.pageY;
			  	var windowHeight = $(window).height();

			  	var id = $(this).data('link-id')
			  	var iframe = $('iframe#outlink-' + id);

			  	if( mouseY < (windowHeight/2) ){
			  		$(iframe).addClass('bottom');
			  	}

			  	$(iframe).removeClass('off');

			  }
		  }, 

		  function(event) {
		  	if($(window).width() >= 768){
		  		$('iframe.outlink').addClass('off');
		  	}
		  }
	);

	
}


function renderPreview(){

}

function device(){
	var classNames = [];
	if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) classNames.push('device-ios');
	if (navigator.userAgent.match(/android/i)) classNames.push('device-android');

	var html = document.getElementsByTagName('html')[0];

	if (classNames.length) classNames.push('on-device');
	if (html.classList) html.classList.add.apply(html.classList, classNames);

	$('html.device-android').click(function() {
		var video = document.getElementById('landing-clip');	
	  	video.play();
	  	$('#play-button').hide();		
	});
		
}





