$( document ).ready(function() {


	$(".sidebar-toggle").on("click", function(){
		$( ".sidebar" ).toggleClass( "sidebar-open" );
	})


	var link = $(".nav-link");
	var subir = $(".subir");
	var sidebar =$(".sidebar");

	link.on("click", function(){
		var seletor = $(this).attr("href");
		var posicao = $(seletor).offset().top;
		$("html, body").animate({scrollTop: posicao},1000);
	})

	$(window).scroll(function(){
		minhaposicao = $(this).scrollTop();
		if (minhaposicao >= 1100) {
			subir.fadeIn();
		}else{ subir.fadeOut(); }

		minhaposicao2 = $(this).scrollTop();
		if (minhaposicao2 >= 100) {
			sidebar.fadeIn();
		}else{ sidebar.fadeOut(); }
	})

	subir.on("click", function(){
		$("html, body").animate({scrollTop: 0},1000);
	})



})