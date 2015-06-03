$(function(){
	//banner
	var links=$(".hnz_banner_list a");
	var lbtn=$(".hnz_btn_l");
	var rbtn=$(".hnz_btn_r");
	var bNum=0;
	links.eq(0).css("zIndex",1)
	var btt=setInterval(bMove,3000)
	function bMove(){
		bNum++;
		if(bNum==links.length){
			bNum=0;
		}
		links.css("zIndex",0);
		links.eq(bNum).css("zIndex",1);
	}
	lbtn.hover(function(){
		clearInterval(btt);
	},function(){
		btt=setInterval(bMove,3000)
	});
	rbtn.hover(function(){
		clearInterval(btt);
	},function(){
		btt=setInterval(bMove,3000)
	});
	//lbtn
	lbtn.click(function(){
		bMove();
	});
	//rbtn
	rbtn.click(function(){
		bNum--;
		if(bNum<0){
			bNum=links.length-1;
		}
		links.css("zIndex",0);
		links.eq(bNum).css("zIndex",1);
	})


	//快速导航
	var qList=$(".hnz_qnav_l_list");
	var qbox=$(".hnz_qnav_l_box");
	var qone=$(".hnz_qnav_l_box li");
	var oneh=qone.eq(0).height();
	qList.css("height",oneh*qone.length);
	var btnU=$(".hnz_btn_up");
	var btnD=$(".hnz_btn_down");
	var outH=qbox.height();
	var max=Math.ceil(qone.length/5);
	var qnum=0;
	if(qone.length*oneh>outH){
		btnU.click(function(){
			qnum++;
			if(qnum>=max){
				qnum=max-1;
				return;
			}else{
				qList.animate({"marginTop":-5*qnum*oneh});
			}
		});
		btnD.click(function(){
			qnum--;
			if(qnum<0){
				qnum=0;
				return;
			}else{
				qList.animate({"marginTop":-5*qnum*oneh});
			}
		})
	}
	// 快速导航  tab
		var qlinks=$(".hnz_qnav_l_list a");
		qlinks.eq(0).css('color','#fb601f');
		var qlists=$(".hnz_qnav_r li");
		qlinks.click(function(){
			qlists.css("display","none");
			qlists.eq(qlinks.index($(this))).css("display","block");
			qlinks.css('color','');
			$(this).css({color:'#fb601f'});
		})
	// img list
	var ilist1=$(".hnz_img_list:eq(0)");
	var ilist2=$(".hnz_img_list:eq(1)");
	imgBan(ilist1);
	imgBan(ilist2);
	function imgBan(obj){
		var imgs=obj.find('li');
		var imgW=imgs.width();
		obj.css({width:imgs.length*(imgW+20)});
		var tt=setInterval(banMove,3000);
		obj.hover(function(){
            clearInterval(tt);
        },function(){
            tt=setInterval(banMove,3000);
        })
		function banMove(){
			obj.animate({'marginLeft':-(imgW+20)},1000,function(){
				obj.first().appendTo(obj);
				obj.css('marginLeft',0);
			})
		}
	}
})