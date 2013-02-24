
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
	if (navigator.userAgent.indexOf("WebKit") == -1) {
		alert("Please use a WebKit kernel browser, like Google Chrome.");
		location.href = "http://chrome.google.com";
	}

	function playAudio(name)
	{
		var audio = $("#audio" + name)[0];
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	}

	$(".nano").nanoScroller();

	// startup animation
	var audioCount = $("audio").length;
	$("audio").bind("canplaythrough", function() {
		if (--audioCount) return;

		$("#menu")
			.transition({}, 500)
			.center(".fullscreen")
			.transition({opacity: 1, y: "+=34"}, 500, 'ease')
		;
		$("#title")
			.stop()
			.transition({}, 800, '', function() {
				playAudio("Title");
			})
			.transition({y: "-=20"}, 500, 'ease')
		;
	});

	// events
	$(window).resize(function() {
		var menu = $("#menu").stop();
		if (menu.data("downed")) {
			var myHeight = parseInt(menu.css("height"));
			var paHeight = parseInt($(".fullscreen").css("height"));
			var myTop = paHeight - myHeight - 50;
			menu
				.transition({top: myTop})
				.centerX(".fullscreen")
			;
		}
		else menu.center(".fullscreen");
	});

	$("#menu li").click(function() {
		var me = $(this);
		$(window).resize();
		$(".detail")
			.stop()
			.transition({opacity: 0}, 0)
			.css("display", "none")
		;
		$("#" + me.text())
			.stop()
			.css("display", "block")
			.transition({opacity: 1}, 500, 'ease');
		;

		if (!$("#menu").data("downed")) playAudio("Fade");
		else playAudio("Fade2");

		$("#menu").data("downed", true);
		$(window).resize();

		$("#title").css({
			height: "auto",
			position: "fixed",
			top: "50px"
		});
	});

	$(window).resize();
});

