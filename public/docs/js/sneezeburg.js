/* S N E E Z E B U R G .js | 06.15.12 | Casey A. Gollan */

// SETUP CANVAS

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// GENERIC SLUGIFY FUNCTION!

function makeSlug(slugcontent)
{
    // convert to lowercase (important: since on next step special chars are defined in lowercase only)
    slugcontent = slugcontent.toLowerCase();
    // convert special chars
    var   accents={a:/\u00e1/g,e:/u00e9/g,i:/\u00ed/g,o:/\u00f3/g,u:/\u00fa/g,n:/\u00f1/g};
    for (var i in accents) slugcontent = slugcontent.replace(accents[i],i);

	var slugcontent_hyphens = slugcontent.replace(/\s/g,'-');
	var finishedslug = slugcontent_hyphens.replace(/[^a-zA-Z0-9\-]/g,'');
    finishedslug = finishedslug.toLowerCase();
    return finishedslug;
}

// TURN COMMA SEPERATED PROJECT TAGS INTO LI'S

$(".project ul.tags").each(function(){
	var tagList = $(this);
	var tagOutput = $(this).text(); // get the tags
	var tags = new Array();
	var tags = $.map(tagOutput.split(','), $.trim);
	tagList.html("");
	$.each(
	tags,
	function( intIndex, objValue ){
		tagList.append("<li class='" + makeSlug(objValue) + "'>" + objValue + "</li>");
		tagList.parent().addClass(makeSlug(objValue));
	});
});

// CONCATENATE PROJECT TAGS & POPULATE TAG-SELECT DROPDOWN

var tagOutput = $("#tag-list").text();
$("#tag-list").remove();
var tags = new Array();
var tags = $.map(tagOutput.split(','), $.trim);

function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

function SortByName(a, b){
  var aName = a.toLowerCase();
  var bName = b.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

tags.sort(SortByName);

var tags = eliminateDuplicates(tags);

tags.splice(0,1);

$.each(
	tags,
	function( intIndex, objValue ){
	 
		// Create a new LI HTML element out of the
		// current value (in the iteration) and then
		// add this value to the list.
		$("body select").append(
			$( "<option value='" + makeSlug(objValue) + "'>" + objValue + "</option>" )
		);
	}
);

$("#tag-select").select2({
    placeholder: "Select a State"
});

// SET UP ISOTOPE

var $container = $('#projects>ul');

$($container).imagesLoaded( function( $images, $proper, $broken ) {
	$($container).isotope({
		// options
		itemSelector : '.project',
		animationEngine : 'best-available',
		getSortData : {
			name : function ( $elem ) {
				return $elem.find('h2 a').text();
			}
		},
		onLayout: function() {
			if($("*").hasClass("double-highlight")) {
				erase();
				$("#overlay").css({"width" : $(window).width(),"height" : $(window).height()}); // show overlay
				drawLines(content, true);
			}
		}
	});
});

// ISOTOPE FILTERING NAV

$("#options #layout-mode a[data-option-value=masonry]").click(function(){
	$("#projects>ul").addClass('grid').removeClass('list');
});
$("#options #layout-mode a[data-option-value=straightDown]").click(function(){
	$("#projects>ul").addClass('list').removeClass('grid');
});

var $optionSets = $('#options'),
$optionLinks = $optionSets.find('a');

$optionLinks.click(function(){ // when clicked
	var $this = $(this);
	// if already selected
	if ( $this.hasClass('selected') && $this.hasClass('toggle') ) { // if selected treat it like a toggle
		if ( $this.hasClass('sort-descending') ) {
			$($container).isotope({sortAscending : true});
			$this.removeClass('sort-descending').addClass('sort-ascending');
			return false;
		} else {
			$($container).isotope({sortAscending : false});
			$this.removeClass('sort-ascending').addClass('sort-descending');
			return false;
		}
		return false;
	}
	var $optionSet = $this.parents('.option-set');
	$optionSet.find('.selected').removeClass('selected'); // remove all selections
	$optionSet.find('.sort-descending').removeClass('sort-descending'); //
	$optionSet.find('.sort-ascending').removeClass('sort-ascending');
	$this.addClass('selected');
	if ( $this.hasClass('toggle') ) {
		$this.addClass('sort-ascending');
	}
	// make option object dynamically, i.e. { filter: '.my-filter-class' }
	var options = {"sortAscending" : "true", },
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
	// parse 'false' as false boolean
	value = value === 'false' ? false : value;
	options[ key ] = value;
	if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
		// changes in layout modes need extra logic
		changeLayoutMode( $this, options )
	} else {
		// otherwise, apply new options
		$container.isotope( options );
	}
	return false;
});

// MAKE FILTER NAV STICKY

$("nav#main").waypoint(function(event, direction) {
	if (direction === 'down') {
		$("nav#main li:nth-child(1) a").removeClass("active");
		$("nav#main li:nth-child(2) a").addClass("active");
	}
	else {
		$("nav#main li:nth-child(1) a").addClass("active");
		$("nav#main li:nth-child(2) a").removeClass("active");
	}
});

$("nav#filters").waypoint(function(event, direction) {
	if (direction === 'down') {
		$(this).css("position","fixed");
		$("#projects>ul").css("margin-top", ($("#content nav#filters").height() + 50));
	}
	else {
		$(this).css("position","relative");
		$("#projects>ul").css("margin-top", "0")
	}
});

// ERASE FUNCTION

function erase() {
	$(".number").remove();
	canvas.width = $(document).width();
	canvas.height = $(document).height();
}

// TOOLTIPS

$('.project').tooltip({
  selector: "a[rel=tooltip]"
});

// DRAW LINES FUNCTION

function drawLines(content,label) {
	erase(); // reset canvas
	$("#canvas").show(); // show canvas
	$("body").find("." + content).addClass("highlight"); //
	var list = [];
	$(".project." + content).each(function(){
		var nodeCenterLeft = $(this).offset().left + $(this).width()/2;
		var nodeCenterTop = $(this).offset().top + $(this).height()/2;

		var nodeTopLeft = $(this).offset().left + 140;
		var nodeTopTop = $(this).offset().top + 30;

		list.push({id:$(this).attr("id"),left:nodeTopLeft, top:nodeTopTop}); // push their coodinates to an array
	});


	var i = 1;
	ctx.beginPath();
	ctx.moveTo(list[0].left,list[0].top);
	$.each(list, function(i) {
		ctx.quadraticCurveTo(list[i].left-100,list[i].top-100,list[i].left,list[i].top); // loop through every element
		i++;
	});
	ctx.strokeStyle = "blue";
	ctx.lineWidth = 5;
	ctx.stroke();
	console.log(list.length);
	if(label == true) {
		$(".number").remove();
	}
	var length = list.length;
	$.each(list, function(i) {
		ctx.strokeStyle = "blue";
		ctx.fillStyle = "blue";
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.arc(list[i].left, list[i].top, 10, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		if(label == true) {
			$("#"+list[i].id).append("<p class='number'>"+ (list.length - (i)) +"</p>");
		}
		i++;
	});
}

// TRIGGER LINES ON HOVER

$("body").append("<div id='overlay' style='display:none;'></div>"); // create the overlay

$(".tags li").hover( // when hovering over a project's tag
	function(){ // on mouseOver
		var content = makeSlug($(this).text()); // selected tag
		if(!$(this).parent().parent().hasClass('double-highlight')) { // if the project is not already double-highlighted (active state)
			drawLines(content); // draw lines between all projects with selected tag
		} else {
			$(".tags").find("." + content).addClass("highlight"); //
		}
	},
	function(){ // on mouseOut
		var content = makeSlug($(this).text()); // selected tag
		if(!$(this).parent().parent().hasClass('double-highlight')) { // if project is not already double-highlighted (active state)
			$("*").removeClass("highlight").removeClass("double-highlight"); // unhighlight everything highlighted and double-highlighted
			erase();
			$("#canvas").hide();
		} else {
			$(".tags").find("." + content).removeClass("highlight"); //
		}
	}
);

// TRIGGER LINES ON CLICK

$("#overlay, #canvas").click( function() {
	$("#overlay").hide(); // hide the overlay
	$("#canvas").css("opacity",".5").hide(); // set canvas back to half opacity and hide it
	$("*").removeClass("highlight").removeClass("double-highlight"); // unhighlight everything highlighted and double-highlighted
	erase(); // clear all highlights and erase the canvas
	$("#tag-select").select2("val",""); // reset the tag-select dropdown to placeholder
});


$(".project ul li").click( // when you click on a project's tag
	function(){
		if($(this).parent().parent().hasClass('double-highlight')) { // and the tag's parent .project is selected
			if(!$(this).hasClass("double-highlight")) { // and the tag clicked on isn't the active tag
				$("*").removeClass("highlight").removeClass("double-highlight"); // unhighlight everything highlighted and double-highlighted
				content = makeSlug($(this).text()); // selected tag
				$("#overlay").css({"width" : $(window).width(),"height" : $(window).height()}).show(); // show overlay
				$("#canvas").css("opacity","1") // set canvas to full opacity
				drawLines(content, true); // draw lines between all projects with selected tag
				$("body").find("." + content).addClass("double-highlight"); // double-highlight (active state) projects with selected tag
				$("#tag-select").select2("val", content); // set tag-select dropdown to clicked tag
			} else {
				$(".number").remove();
				$("#overlay").hide(); // hide the overlay
				$("#canvas").css("opacity",".5"); // set canvas back to half opacity
				$("*").removeClass("double-highlight"); // remove all double-highlights (active state)
				$("#tag-select").select2("val",""); // reset the tag-select dropdown to placeholder
			}
		} else { // and tag's parent project is not selected
			content = makeSlug($(this).text()); // selected tag
			$("#overlay").css({"width" : $(window).width(),"height" : $(window).height()}).show(); // show overlay
			$("#canvas").css("opacity","1") // set canvas to full opacity
			drawLines(content, true); // draw lines between all projects with selected tag
			$("body").find("." + content).addClass("double-highlight"); // double-highlight (active state) projects with selected tag
			$("#tag-select").select2("val", content); // set tag-select dropdown to clicked tag
		}
	}
);

// TRIGGER LINES ON TAG-SELECT DROPDOWN

function drawFromSelect(){
	var content = $("#tag-select").select2("val"); // selected tag
	var padding = $("nav#filters").height()+20; // padding for scroll to first selected project, so nav doesn't overlap project
	$("#overlay").css({"width" : $(window).width(),"height" : $(window).height()}).show(); // show overlay
	$("#canvas").css("opacity","1") // set canvas to full opacity
	$("*").removeClass("highlight").removeClass("double-highlight"); // remove all double-highlights (active state)
	drawLines(content, true); // draw lines between all projects with selected tag
	$("body").find("." + content).addClass("double-highlight"); // double-highlight (active state) projects with selected tag
	$(document.body).animate({scrollTop: $('.' + content).offset().top - padding}, 500, 'easeOutExpo'); // smoothly scroll to first project with selected tag
}

$("#tag-select").bind("change", drawFromSelect);