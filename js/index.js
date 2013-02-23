
$.fn.centerX = function(pa, offset)
{
	if (!offset) offset = 0;
	this.css("position", "fixed");
	var myWidth = parseInt(this.css("width"));
	var paWidth = parseInt($(pa).css("width"));
	var myLeft = (paWidth - myWidth) / 2 + offset;
	return this.transition({left: myLeft});
}

$.fn.centerY = function(pa, offset)
{
	if (!offset) offset = 0;
	this.css("position", "fixed");
	var myHeight = parseInt(this.css("height"));
	var paHeight = parseInt($(pa).css("height"));
	var myTop = (paHeight - myHeight) / 2 + offset;
	return this.transition({top: myTop});
}

$.fn.center = function(pa, offsetX, offsetY)
{
	if (!offsetX) offsetX = 0;
	if (!offsetY) offsetY = 0;
	this.css("position", "fixed");
	var myWidth = parseInt(this.css("width"));
	var paWidth = parseInt($(pa).css("width"));
	var myHeight = parseInt(this.css("height"));
	var paHeight = parseInt($(pa).css("height"));
	var myLeft = (paWidth - myWidth) / 2 + offsetX;
	var myTop = (paHeight - myHeight) / 2 + offsetY;
	return this.transition({left: myLeft, top: myTop});
}

$(function() {
	$("#content")
		.transition({opacity: 0}, 500)
		.center(".fullscreen")
		.transition({opacity: 1, y: "+=50"}, 500, 'ease')
	;

	$(window).resize(function() {
		$("#content").center(".fullscreen");
	});
});

