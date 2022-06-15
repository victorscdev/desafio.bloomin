$(document).ready(function () {
	$('.card_trend_slick_play__carousel').slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		fade: true,
		cssEase: 'linear',
	});

	$('.card_trend_slick_personal__carousel').slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		fade: true,
		cssEase: 'linear',
	});
});
