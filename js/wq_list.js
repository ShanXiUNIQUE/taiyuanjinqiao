$(function(){
$.fn.extend({
	//手风琴
	accordion:function(l){
	var that=this;
	l.each(function  (index,obj) {
	  $(obj).css("left",function  () {
	   return (that.width()/l.length)*index;
	  })
	})
   
    var liW=l.width(); 
    l.hover(function  () {
	   l.stop();
	  var current=$(l).index(this);
	  var n=(that.width()-liW)/(l.length-1);
	  l.each(function  (index,obj) {
	     if(current>=index){
          $(obj).animate({left:index*n})	
		 }else	if(current<index){
          $(obj).animate({left:current*n+liW+(index-current-1)*n})
		 }
	  })
    })
	that.hover(function  () {
	},function  () {
	  l.stop();
	  l.each(function  (index,obj) {
	  $(obj).animate({left:(that.width()/l.length)*index})
	})
	})
	 }
})
 $(".wq_sfq").accordion($(".wq_sfq a"));
})