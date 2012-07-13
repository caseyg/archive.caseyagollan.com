# S N E E Z E B U R G .coffee  07.13.12 Casey A. Gollan

# SETUP CANVAS

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

# GENERIC SLUGIFY FUNCTION!

# TURN COMMA SEPERATED PROJECT TAGS INTO LI'S

# CONCATENATE PROJECT TAGS & POPULATE TAG-SELECT DROPDOWN

# SET UP ISOTOPE

$container = $('#projects>ul')

filterSet = ':not(.rye-high-school, .risd-pre-college, .oxbow-school, .smfa-pre-college)'

$($container).imagesLoaded ($images, $proper, $broken) ->
	$($container).isotope
					itemSelector: '.project'
					animationEngine: 'best-available'
					getSortData: name: ($elem) ->
						$elem.find('h2 a').text()
					onLayout: ->
						if $("*").hasClass "double-highlight"
							erase()
							$("#overlay").css(
								"width" : $(window).width()
								"height" : $(window).height()
								)
							drawLines(content, true)

# ISOTOPE FILTERING NAV

# MAKE FILTER NAV STICKY

# ERASE FUNCTION

erase = ->
	$(".number").remove()
	canvas.width = $(document).width()
	canvas.height = $(document).height()

# TOOLTIPS

# DRAW LINES FUNCTION

drawLines = (content,label) ->
	erase()
	$("#canvas").show()
	$("body").find("." + content).addClass("highlight")
	$(".project." + content).each() ->
		nodeCenterLeft = $(this).offset().left + $(this).width()/2
		nodeCenterTop = $(this).offset().top + $(this).height()/2
		nodeTopLeft = $(this).offset().left + 140
		nodeTopTop = $(this).offset().top + 30

		list.push({id:$(this).attr("id"),left:nodeTopLeft, top:nodeTopTop})

	i = 1
	ctx.beginPath()
	ctx.moveTo(list[0].left,list[0].top)
	$.each list, (i) ->
		ctx.quadraticCurveTo(list[i].left-100,list[i].top-100,list[i].left,list[i].top)
		i++

	ctx.strokeStyle = "blue"
	ctx.lineWidth = 5
	ctx.stroke()

	if label
		$(".number").remove()
	
	length = list.length
	$.each list, (i) ->
		ctx.strokeStyle = "blue"
		ctx.fillStyle = "blue"
		ctx.lineWidth = 5
		ctx.beginPath()
		ctx.arc(list[i].left, list[i].top, 10, 0, Math.PI*2, true)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
		if label == true
			$("#"+list[i].id).append("<p class='number'>"+ (list.length - (i)) +"</p>")
		i++

# TRIGGER LINES ON HOVER

# TRIGGER LINES ON CLICK

# TRIGGER LINES ON TAG-SELECT DROPDOWN