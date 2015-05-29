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

//��� IE6-8��֧��document.getElementsByClassName����
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

//��ȡ���ı�
function getText(obj,val){
    if(obj.innerText==undefined){
    //���������û���ı����� Ϊ"" �ַ��� ҲΪfalse ���Դ˴�������Ҫ ���� obj.innerText==undefined
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
//��������
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
//��ȡ��ʽ
function getStyle(obj,attr){
    if(obj.currentStyle){//if(window.getComputedStyle)
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}


/*ȥ���ո�*/
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
/*��String ����ԭ�����trim����
������
    type:[side||left||right||all]
    Ĭ��side  ���߿ո�
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
��ȡ��һ���ֵܽڵ������
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
getUp(obj)  ��ȡ��һ���ֵܽڵ������
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
/* ���뵽ĳ��Ԫ��֮ǰ
   obj Ҫ����Ķ���
   obj1 ֮ǰ�Ķ���
*/
function insertBefore(obj,obj1){
    var parent=obj1.parentNode;
    parent.insertBefore(obj,obj1);
}

/*���뵽ĳ��Ԫ��֮��
 obj Ҫ����Ķ���
 obj1 ֮ǰ�Ķ���
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

/*��������¼�*/
function addEvent(obj,ev,callback){
    if(obj.addEventListener){
        obj.addEventListener(ev,callback,false);
    }else{
        obj.attachEvent("on"+ev,callback);
    }
}
/*ɾ��������¼�*/
function delEvent(obj,ev,callback){
    if(obj.removeEventListener){
        obj.removeEventListener(ev,callback,false);
    }else{
        obj.detachEvent("on"+ev,callback);
    }
}

/*
�������¼�
 wheel(����,�ϴ������,�´������)

*/

function wheel(obj,upfun,downfun){
    if(document.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);  //IE�� opera
    }else if(document.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);  
        //chrome,safari    -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  
        //firefox     -moz-
    }
    function scrollFn(e){
        var ev=window.event||e;
        var val=ev.wheelDelta||ev.detail;
        if(val==120||val==-1||val==-3){//��
            upfun.call(obj);
        }
        if(val==-120||val==1||val==3){//��
            downfun.call(obj);
        } 
    }
}
/*
��ȡʱ���
time=new  Date(2015,4,1,0,0,0);
getDiff(time)
time���õ�ʱ��

����ֵ��
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
  hover(obj,overFn,outFn)  ��������Ƴ��¼� 
  obj   Ҫ�����Ķ���
  overFn   ���������Ҫ����ĺ���
  outfun    ����Ƴ���Ҫ����ĺ���
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

//�ж�ĳ��Ԫ���Ƿ����������һ��Ԫ��
function contains (parent,child) {
    if(parent.contains){
        return parent.contains(child) && parent!=child;
    }else{
        return (parent.compareDocumentPosition(child)===20);
    }
}
//�ж�����Ƿ������Ĵ��ⲿ���룬�������������Ƴ����ⲿ
function checkHover (e,target) {
    if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
    }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
}
//����¼�����
function getEvent (e) {
    return e||window.event;
}