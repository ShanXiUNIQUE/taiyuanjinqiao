$(function  () {
  $(".wq_fldh_title").click(function  () {
	  var index=$(".wq_fldh_title").index(this);
	 $($(".wq_list")[index]).toggle(200)
	 $($(".wq_fldh_sanjiao")[index]).toggleClass("wq_flah_daosanjiao");
	 $(this).toggleClass("wq_fldh_click");
   })
   $(".wq_list .wq_fldh_list:last-child").css("border","0");
    $(window).unload( function () { 
	  $(".wq_fldh_bottom").focus();
	 } );
   
   //党史上的今天 js
   !function(){
	   var ulW=$('.hnz_dsjt-list').width();
	   $('.hnz_dsjt-list li').each(function(index, element) {
		   var liW= $('.hnz_dsjt-list li:eq('+index+')').width();
	   if(liW<ulW){
		   $('.hnz_dsjt-list li:eq('+index+')').css({width:ulW});
		   }
		});
   		//auto up
	   var dt=setInterval(upup,5000)
	   function upup(){
		  var oneW=$('.hnz_dsjt-list li:first').width();
		  if(oneW>ulW){
			  var time=20000*oneW/ulW+200;
			  clearInterval(dt);
			  $('.hnz_dsjt-list li:first').animate({'margin-left':-(oneW-ulW/4)},time,'linear',function(){
				  $('.hnz_dsjt-list li:first').animate({'margin-top':-45},3000,function(){
					  $('.hnz_dsjt-list li:first').appendTo('.hnz_dsjt-list');
					  $('.hnz_dsjt-list li').css({'margin-top':0,'margin-left':0});
			  			dt=setInterval(upup,5000);
				  })
				  
				  })
			}else{
	   		  $('.hnz_dsjt-list li:first').animate({'margin-top':-45},3000,function(){
			  $('.hnz_dsjt-list li:first').appendTo('.hnz_dsjt-list');
			  $('.hnz_dsjt-list li').css({'margin-top':0});
			   })
			  }
	   }
	   //click leftbtn
	   $('.hnz_dsjt-lt').click(function(){
		   clearInterval(dt);
		   $('.hnz_dsjt-list li').stop();
		   var oneW=$('.hnz_dsjt-list li:first').width();
		  
				  $('.hnz_dsjt-list li:first').animate({'margin-top':-45},1000,function(){
					  $('.hnz_dsjt-list li:first').appendTo('.hnz_dsjt-list');
					  $('.hnz_dsjt-list li').css({'margin-top':0,'margin-left':0});
			  			dt=setInterval(upup,5000);
				  })
		   })
		   //click rightbtn
		 $('.hnz_dsjt-rt').click(function(){
		   clearInterval(dt);   
		   $('.hnz_dsjt-list li').stop();
		   		var oneW=$('.hnz_dsjt-list li:last').width();
		   		$('.hnz_dsjt-list li:last').css({'margin-top':-45,'margin-left':0});
		   		$('.hnz_dsjt-list li:last').prependTo('.hnz_dsjt-list');
				$('.hnz_dsjt-list li:first').animate({'margin-top':0},1000,function(){
					    $('.hnz_dsjt-list li').css({'margin-top':0,'margin-left':0});		
			  			dt=setInterval(upup,5000);
				  })
		   })
   }()
})