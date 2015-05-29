function $$(selector,obj){
    if(typeof selector=="string"){
        var obj=obj||document;
        if(selector.charAt(0)=="#"){
            return document.getElementById(selector.substring(1));
        }else if(selector.charAt(0)=="."){
            return getClass(selector.substring(1),obj);
        }else if(/^[a-z][1-6a-z]{0,10}$/.test(selector)){
            return obj.getElementsByTagName(selector);
        }else if(/^<[a-z][1-6a-z]{0,10}>$/.test(selector)){
            return obj.createElement(selector.slice(1,-1));
        }
    }else if(typeof selector=="function"){
        addEvent(window,"load",function(){
            selector();
        });
    }
}

//解决 IE6-8不支持document.getElementsByClassName方法
function getClass(classname,obj){
    var obj=obj||document;
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(classname);
    }else{
        var arr=[];
        var all=obj.getElementsByTagName("*");
        for(var i =0;i<all.length;i++){
            if(checkClass(all[i].className,classname)){
                arr.push(all[i]);
            }
        }
        return arr;
    }
}
function checkClass(oldclass,newclass){
    var arr=oldclass.split(" ");
    for(var i=0;i<arr.length;i++){
        if(arr[i]==newclass){
            return true;
        }
    }
    return false;
}

//获取纯文本
function getText(obj,val){
    if(obj.innerText==undefined){
    //如果对象中没有文本内容 为"" 字符串 也为false 所以此处条件需要 更改 obj.innerText==undefined
        if(val==undefined){
            return obj.textContent;
        }else{
            obj.textContent=val;
        }
    }else{
        if(val==undefined){
            return obj.innerText;
        }else{
            obj.innerText=val;
        }
     }
}
//操作属性
/*
 * attr(obj,width)
 * attr(obj,{aa:bb,cc:dd})
 * attr(obj,"width","100px")
 */
function attr(){
    var obj=arguments[0];
    if(arguments.length==2){
        if(typeof arguments[1]=="string"){
            return obj.getAttribute(arguments[1]);
        }else if(typeof arguments[1]=="Object"){
            for(var i in arguments[1]){
                obj.setAttribute(i,arguments[1][i]);
            }
        }
    }else if(arguments.length==3){
        obj.setAttribute(arguments[1],arguments[2]);
    }
}
//获取样式
function getStyle(obj,attr){
    if(obj.currentStyle){//if(window.getComputedStyle)
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}


/*去除空格*/
function trim(str,type){
    var type=type||"side";
    if(type=="side"){
        return str.replace(/^\s*|\s*$/g,"");
    }else if(type=="left"){
        return str.replace(/^\s*/g,"");
    }else if(type=="right"){
        return str.replace(/\s*$/g,"");
    }else if(type=="all"){
        return str.replace(/\s*/g,"");
    }
}
/*给String 对象原型添加trim方法
参数：
    type:[side||left||right||all]
    默认side  两边空格
*/
String.prototype.trim=function(type){
    var type=type||"side";
    if(type=="side"){
        return this.replace(/^\s*|\s*$/g,"");
    }else if(type=="left"){
        return this.replace(/^\s*/g,"");
    }else if(type=="right"){
        return this.replace(/\s*$/g,"");
    }else if(type=="all"){
        return this.replace(/\s*/g,"");
    }
}

function getChilds(obj){
    var childs=obj.childNodes;
    var all=[];
    for(var i=0;i<childs.length;i++){
       if(childs[i].nodeType!=8||!(childs[i].nodeType==3&&childs[i].nodeValue.trim()=="")){
           all.push(childs[i])
       }
    }
    return all;
}

function getFirst(obj){
    return getChilds(obj)[0];
}
function getLast(obj){
    var all=getChilds(obj);
    return all[all.length-1];
}

/*
获取下一个兄弟节点的引用
 (next.nodeType==3 && next.nodeValue.replace(/^\s+|\s+$/g,"")=="")|| next.nodeType==8
*/
function getNext(obj){
    var next=obj.nextSibling; 
    if(next==null){
        return false;
    }
    while((next.nodeType==3&&next.nodeValue.replace(/^\s+|\s+$/g,"")=="") || next.nodeType==8){   
            next=next.nextSibling;
            if(next==null){
                return false;
            }
    }     
    return next;
}
/*
getUp(obj)  获取上一个兄弟节点的引用
*/

function getUp(obj){
    var up=obj.previousSibling;
    if(up==null){
        return false;
    } 
    while((up.nodeType==3&&up.nodeValue.replace(/^\s+|\s+$/g,"")=="") || up.nodeType==8){
            up=up.previousSibling;
            if(up==null){
                return false;
            }  
    }     
    return up;
}
/* 插入到某个元素之前
   obj 要插入的对象
   obj1 之前的对象
*/
function insertBefore(obj,obj1){
    var parent=obj1.parentNode;
    parent.insertBefore(obj,obj1);
}

/*插入到某个元素之后
 obj 要插入的对象
 obj1 之前的对象
*/
function insertAfter(obj,obj1){
    var parent=obj1.parentNode;
    var next=getNext(obj1);
    if(next){
        parent.insertBefore(obj,next);
    }else{
        parent.appendChild(obj);
    }
}

/*给对象绑定事件*/
function addEvent(obj,ev,callback){
    if(obj.addEventListener){
        obj.addEventListener(ev,callback,false);
    }else{
        obj.attachEvent("on"+ev,callback);
    }
}
/*删除对象绑定事件*/
function delEvent(obj,ev,callback){
    if(obj.removeEventListener){
        obj.removeEventListener(ev,callback,false);
    }else{
        obj.detachEvent("on"+ev,callback);
    }
}

/*
鼠标滚动事件
 wheel(对象,上处理程序,下处理程序)

*/

function wheel(obj,upfun,downfun){
    if(document.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera
    }else if(document.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);  
        //chrome,safari    -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  
        //firefox     -moz-
    }
    function scrollFn(e){
        var ev=window.event||e;
        var val=ev.wheelDelta||ev.detail;
        if(val==120||val==-1||val==-3){//上
            upfun.call(obj);
        }
        if(val==-120||val==1||val==3){//下
            downfun.call(obj);
        } 
    }
}
/*
获取时间差
time=new  Date(2015,4,1,0,0,0);
getDiff(time)
time设置的时间

返回值：
{"day":days,"hour":hours,"minute":mints,"second":scd}
*/
function getDiff(time){
    var now=new Date();
    var diff=(time.getTime()-now.getTime())/1000;
    var days=parseInt(diff/(24*60*60));
    var diff=diff%(24*60*60);
    var hours=parseInt(diff/(60*60));
    var diff=diff%(60*60);
    var mints=parseInt(diff/60);
    var scd=parseInt(diff%60);
    var obj={"day":days,"hour":hours,"minute":mints,"second":scd};
    return obj;
}

/*
  hover(obj,overFn,outFn)  鼠标移入移除事件 
  obj   要操作的对象
  overFn   鼠标移入需要处理的函数
  outfun    鼠标移除需要处理的函数
*/
function hover (obj,overFn,outFn) {
    if(overFn){
        obj.onmouseover=function  (e) {
            if(checkHover(e,obj)){
                overFn.call(obj);
            }
        }
    }
    if(outFn){
        obj.onmouseout=function  (e) {
            if(checkHover(e,obj)){
                outFn.call(obj);
            }
        }
    }
}

//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
    if(parent.contains){
        return parent.contains(child) && parent!=child;
    }else{
        return (parent.compareDocumentPosition(child)===20);
    }
}
//判断鼠标是否真正的从外部移入，或者是真正的移出到外部
function checkHover (e,target) {
    if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
    }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
}
//获得事件对象
function getEvent (e) {
    return e||window.event;
}