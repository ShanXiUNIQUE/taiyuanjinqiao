$$(function(){
    //banner
    var banl=$$(".hnz_banner_list")[0];
    var blinks=$$("a",banl);
    var lbtn=$$(".hnz_btn_l")[0];
    var rbtn=$$(".hnz_btn_r")[0];
    var bnum=0;
    blinks[bnum].style.zIndex=1;
    var at=setInterval(bannerMove,3000);
    function bannerMove(){
        bnum++;
        if(bnum==blinks.length){
            bnum=0;
        }
        for(var i=0;i<blinks.length;i++){
            blinks[i].style.zIndex=0;
        }
        blinks[bnum].style.zIndex=1;
    }
    lbtn.onclick=function(){
        bnum++;
        if(bnum==blinks.length){
            bnum=0;
        }
        for(var i=0;i<blinks.length;i++){
            blinks[i].style.zIndex=0;
        }
        blinks[bnum].style.zIndex=1;
    }
    rbtn.onclick=function(){
        bnum--;
        if(bnum<0){
            bnum=blinks.length-1;
        }
        for(var i=0;i<blinks.length;i++){
            blinks[i].style.zIndex=0;
        }
        blinks[bnum].style.zIndex=1;
    }
    lbtn.onmouseover=function(){
        clearInterval(at)
    }
    lbtn.onmouseout=function(){
        at=setInterval(bannerMove,3000);
    }
    rbtn.onmouseover=function(){
        clearInterval(at)
    }
    rbtn.onmouseout=function(){
        at=setInterval(bannerMove,3000);
    }
    //快速导航
    var qnav_list=$$(".hnz_qnav_l_list")[0];
    var qnav_box=$$(".hnz_qnav_l_box")[0];
    var qnav_one=$$("li",qnav_box);
    var qoneh=qnav_one[0].offsetHeight;
    var qnav_listh=qnav_one.length*qoneh;
    qnav_list.style.height=qnav_listh+"px";
    var btnUp=$$(".hnz_btn_up")[0];
    var btnDown=$$(".hnz_btn_down")[0];
    var outboxh=qnav_box.offsetHeight;
    var max=Math.ceil(qnav_one.length/5);
    var num=0;
    if(qnav_listh>outboxh){
        btnUp.onclick=function(){
            num++;
            if(num>=max){
                num=max-1;
                return;
            }else{
                animate(qnav_list,{"marginTop":-5*num*qoneh})
            }
        }
        btnDown.onclick=function(){
            num--;
            console.log(num)
            if(num<0){
                num=0;
                return;
            }else{
                animate(qnav_list,{"marginTop":-5*num*qoneh})
            }
        }
    }
    /*快速导航右侧tab*/
    var qlinks=$$("a",$$(".hnz_qnav_l_list")[0]);
    var qlists=$$("li",$$(".hnz_qnav_r")[0]);
    var qup=0;
    for(var i=0;i<qlinks.length;i++){
        qlinks[i].index=i;
        qlists[i].style.display="none";
        qlists[qup].style.display="block";
        qlinks[qup].style.color="#fb601f";
        qlinks[i].onclick=function(){
            qlists[qup].style.display="none";
            qlinks[qup].style.color="";
            qup=this.index;
            qlinks[qup].style.color="#fb601f";
            qlists[qup].style.display="block";
        }
    }
    /*imglist*/
    var hnz_imglist1=$$(".hnz_img_list")[0];
    var hnz_imglist2=$$(".hnz_img_list")[1];
    imgBanner(hnz_imglist1);
    imgBanner(hnz_imglist2);
    function imgBanner(obj){
        var hnz_imgs=$$("li",obj);
        var hnz_iw=hnz_imgs[0].offsetWidth;
        obj.style.width=hnz_imgs.length*(hnz_iw+20)+"px";
        var hnz_tt=setInterval(move,3000);
        hover(obj,function(){
            clearInterval(hnz_tt);
        },function(){
            hnz_tt=setInterval(move,3000);
        })
        function move(){
            animate(obj,{"marginLeft":-(hnz_iw+20)},function(){
                obj.appendChild(getFirst(obj));
                obj.style.marginLeft=0;
            })
        }
    }

})