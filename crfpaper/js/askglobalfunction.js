
/**
 * 获取对象
 * @param {Object} n  
 * @param {Object} d
 */
function MM_findObj(n, d) { //v4.0
    var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
    if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && document.getElementById) x=document.getElementById(n); return x;
}





/**
 * 设置待保存图标信息
 * @param {Object} strImageName 要操作的dom无素name属性值
 * @param {Object} strImageFullPath  图片的路径
 * @param {Object} strTitle	鼠标移入后的标题提示
 */
function setImageWithTitle(strImageName, strImageFullPath, strTitle) {
    var objImage;
    objImage = MM_findObj(strImageName);
    
    if (objImage != null) { 
	    	if(objImage.length)
	    	{
	    		for(var i=0;i<objImage.length;i++)
	    		{
	    			objImage[i].src = strImageFullPath; objImage[i].title = strTitle;
	    		}
	    	}
	    	else{
	    		objImage.src = strImageFullPath; objImage.title = strTitle;
	    	}
    	}
}

//判断当前crf是否已经改变,返回真，表示crf已经改变，返回假，表示crf未改变
function getCRFEditIsChange(){
	    objImage = MM_findObj("DataStatus_bottom");
	    
	    if (objImage != null) { 
		    	if(objImage.length)
		    	{
		    		for(var i=0;i<objImage.length;i++)
		    		{
		    			if(objImage[i].src.indexOf("images/icon_UnsavedData.gif")>0)
			    		{
		    				return true;
			    		}
		    		}
		    	}
		    	else{
		    		if(objImage.src.indexOf("images/icon_UnsavedData.gif")>0)
		    		{
		    			return true;
		    		}
		    	}
	    	}
	    
	    objImage = MM_findObj("DataStatus_top");
	    if (objImage != null) { 
	    	if(objImage.length)
	    	{
	    		for(var i=0;i<objImage.length;i++)
	    		{
	    			if(objImage[i].src.indexOf("images/icon_UnsavedData.gif")>0)
		    		{
	    				return true;
		    		}
	    		}
	    	}
	    	else{
	    		if(objImage.src.indexOf("images/icon_UnsavedData.gif")>0)
	    		{
	    			return true;
	    		}
	    	}
    	}
	    
	return false;
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.replaceAll = function (rgExp, replaceText) {
    return this.replace(new RegExp(rgExp, "gm"), replaceText);
}
String.prototype.replaceHTML = function () {
   return this.replace(/<.*?>/g, "");
  // return this.replace(/<[^>]*>|/g,"");
  return this;
}
//去除所有的script
String.prototype.replaceScript = function () {
   //var scriptlabel = "<script[^>]*?>[\s\S]*?<\/script>";  //不能匹配换行
   var scriptlabel = "<script[^>]*?>([\\s\\S]*?)<\\/script>";  //包括换行  注意若想匹配包括换行内容，需要使双斜线   //s
    return this.replace(new RegExp(scriptlabel, "gmi"), "");
}


/**
 * 将指定的字符串转换为unicode编码
 * @param {Object} str
 */
var strtounicode = function(str) {
	 var res=[];
	    for(var i=0;i < str.length;i++)
	        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
	    if(res.length>0)
	    	return "\\u"+res.join("\\u");
	    else
	    	return str;
}
var unicodetostr = function(str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}


/**
 * 文件上传
 * @param itemid 唯一编号
 * @param itemName 唯一的中文标签
 */
function askcrffileupload(itemid,itemName)
{
	var inURL = "askcomponents/crfpaper/upload.html?itemid="+itemid+"&itemname="+itemName;
	 openNewWindow(inURL,
	    		'',
	            'directories=no,location=no,menubar=yes,scrollbars=yes,toolbar=no,status=no,resizable=yes',
	            'medium');
}



//-------------------------------------------------------------------------
//Function: openNewWindow
//
//Pops up a new browser window containing the definitions page, and scrolls
//   to the correct spot
//-------------------------------------------------------------------------

function openNewWindow(inURL, name, features, windowSize) {

  // Add check for browser capability
  var old_browser = true;
  if (window.screen != null) old_browser = false;
  /*
   Detect Internet Explorer, for the sake of printing CRFs.
   */

  if(inURL && inURL.indexOf("Print") != -1) {
      if(detectIEWindows(navigator.userAgent)) {
          if (inURL.indexOf("?") == -1) {
              inURL = inURL+"?ie=y";
          } else {
              inURL = inURL+"&ie=y";
          }
      }
  }

  if (features == "") {
      features = "toolbar=yes,directories=yes,location=1,status=yes,menubar=yes,scrollbars=yes,resizable=yes";
  }

  var height=250;
  var width=350;
  var screenHeight = 480;
  var screenWidth = 640;

  if(windowSize == 'small')
  {
      height = 150;
      width = 200;
  }
  if(windowSize == 'medium')
  {
      height = 300;
      width = 500;
  }
  if(windowSize == 'dnote')
  {
      height = 350;
      width = 450;
  }
  if(windowSize == 'dsnote')
  {
      height = 350;
      width = 450;
  }
  if(windowSize == 'dn')
  {
      height = 350;
      width = 450;
  }
  if(windowSize == 'print')
  {
      height = 700;
      width = 900;
  }



  if (window.screen != null)
  {
      screenHeight = window.screen.height;
      screenWidth = window.screen.width;
  }

  if (screenWidth > 640)
  {
      width = width + (screenWidth - 640)*.50;
  }

  if(screenHeight > 480)
  {
      height = height + (screenHeight - 480)*.50;
  }

  features += ",width=" + width + ",height=" + height;

  var docView = window.open (inURL, name, features);
  docView.focus();
}



/**
 * 删除分组问题的行
 * obj:按钮本身,触发对象
 */
function removegrouprow(obj,grouplabel){
	var allgrouprow =$(obj).parent().parent().parent().find("tr[grouptemplate='"+grouplabel+"']");
	if(allgrouprow.size()>1)
	{
		//删除指定的行
		$(obj).parent().parent().remove();
	}
	else
	{
		alert("分组数据至少保留一行数据。");
	}
}




/**
 * 增加分组问题的行
 * obj:按钮本身,触发对象
 * grouplabel:问题组唯一标识
 * maxcount:最多允许的行数
 */
function addgrouprow(obj,grouplabel,maxcount){
	var allgrouprow =$(obj).parent().parent().parent().find("tr[grouptemplate='"+grouplabel+"']");
	if(allgrouprow.size()>=maxcount)
	{
		alert("该分组最多仅允许增加"+maxcount+"行。");
	}
	else
	{  
		var newrow = allgrouprow.first().clone(true);
		var newrownum  = 1;
		allgrouprow.each(function(){
			var oldrownum =$(this).attr("rownum");
			if(oldrownum)
			{
				if(parseInt(oldrownum)>newrownum)
				 newrownum = parseInt(oldrownum);
			}
		});
		newrownum++;
		newrow.attr("rownum",newrownum);
		
		//对单选题的name进行处理，每行是唯一的组 名字为   itemlabel+"_"+rownum
		newrow.children().each(function(){
			//查询是否存在单选列
			var findradioquestion = $(this).find("input[type=radio]");
			if(findradioquestion.size()>0)
			{
				var newname = findradioquestion.attr("name")+"_"+newrownum;
				//找到了单选问题,改变name属性
				findradioquestion.each(function(){
					 findradioquestion.attr("name",newname);
				});
			}
		});
		
		
		$(obj).parent().parent().parent().children().last().before(newrow);
	}
}
