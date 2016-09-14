/**
 * 问题的显示类型
 */
var RESPONSETYPE = {};
//文本
RESPONSETYPE.text = "text";
//单选
RESPONSETYPE.radio = "radio";
//单选下拉
RESPONSETYPE.singleselect = "single-select";
//多选下拉
RESPONSETYPE.multiselect ="multi-select";
//文本框
RESPONSETYPE.textarea = "textarea";
//多选题
RESPONSETYPE.checkbox = "checkbox";
//文件上传题
RESPONSETYPE.file = "file";

/**
 * 数据类型枚举
 */
var DATATYPE = {};
//布尔型
DATATYPE.BL = 1;
//布尔型不为空
DATATYPE.BN = 2;
//未知
DATATYPE.ED = 3;
//未知
DATATYPE.TEL = 4;
//文本型
DATATYPE.ST = 5;
//数字型
DATATYPE.INT = 6;
//符点型
DATATYPE.REAL = 7;
//未知
DATATYPE.SET = 8;
//日期型
DATATYPE.DATE = 9;
//日期型
DATATYPE.PDATE = 10;
//上传文件类型
DATATYPE.FILE = 11;

/**
 * 作者:赵亮
 * 时间:2016/8/5
 * 描述:用于所有问题的描述,每一个表示一个问题。
 */
var askitems = function() {
	//问题唯一名称
	this.itemName = "";
	//问题描述标签
	this.descriptionLabel = "";
	//每个问题左侧描述性标题，左侧问题文本描述，有时也用于存储编写的js脚本描述
	this.leftItemText = "";
	//显示单位
	this.units = "";
	//右侧显示文本 一般用于自定义按钮，如清空，等
	this.rightItemText = "";
	//标识所在的页，同页内的sectionLabel对应
	this.sectionLabel = "";
	//标识所用的组，同askgroups内的groupLabel值对应
	this.groupLabel = "";
	//每一个大组的头部标题
	this.header = "";
	//每个问题的标题,这个标题会出现在每个问题的上方
	this.subHeader = "";
	//暂不理解
	this.parentItem = "";
	//每列显示的问题数量 1表示显示在第一列，2表示显示在第二列
	this.columnNumber = "1";
	//暂不了解
	this.pageNumber = "";
	//问题的数量
	this.questionNumber = "";
	//问题的显示类型,如单选、下拉、文本等
	//this.responseType = "";
	//为输出的选项定义一个名字，后期同名和都会取自同一个选项标签项
	//this.responseLabel = "";
	//选项文本，使用逗号分隔
	//this.responseOptionsText = "";
	//选项的值标签,使用逗号分隔，同responseOptionsText必须一一对应
	//this.responseValuesOrCalculations = "";
	//选项布局方式，包括Horizontal 水平排列  Vertical 垂直排列
	this.responseLayout = "";
	//默认值
	this.defaultValue = "";
	//数据类型,具体请参看DATATYPE类型定义
	this.dataType = "";
	//宽度,根据不同的题型，可以定义允的宽度，文本和符点数有所有同。表现型式如  88  或  w(2) 或   5(1)等
	this.widthDecimal = "";
	//验证方式,目前有两大类，一类为regexp，即使用正则表达式进行匹配,另一类使用function进行匹配。
	this.validation = "";
	//验证失败后的错误信息
	this.validationErrorMessage = "";
	//不知道
	this.phi = "";
	//是否必填
	this.required = false;
	//选项的默认显示状态   HIDE为隐藏
	this.itemDisplayStatus = true;
	//简单条件显示方式格式如下   MPYN,是,SHOW  第一个表示itemName 第二个表示选择的选项  第三个表示显示还是隐藏
	this.simpleConditionalDisplay = "";
	
	/**
	 * 问题的输出类型,格式如下
		{
			"RESPONSESETID": 2,
			"RESPONSETYPEID": 5,
			"LABEL": "xingbie",
			"OPTIONSTEXT": "是,否",
			"OPTIONSVALUES": "1,2",
			"VERSIONID": 1,
			"NAME": "radio"
		}
	 */
	this.responseset = null;
	
	//增加的其它业务属性
	
	//键盘按键索引顺序
	this.tabindex = 0;
	
	//存放问题结果,这里修改为使用数组的方式进行记录,每一个问题为数组的一个对象值
	//因为有循环问题的情况存在，因此使用数组更能记录好多个问题的结果。
	//this.value=new Array();
	this.value="";
	
	//itemid 维一编号
	this.itemid = "";
	this.itemdataid = "";
	
	//允许的最小值，当该值不为空时，需要有最小值和最大值的校验。说明，目前因数据内没有该指示，因此先使用函数进行相关赋值
	this.minvalue=null;
	//允许的最大值
	this.maxvalue = null;
	
	//显示隐藏
	this.controlitemname = "";
	this.optionvalue = "";
	this.message  = "";
	
	//操作的脚本，如   xingbie:2:SHOW  第一个参数表示影响的问题  第二个表示当前问题符合条件的结果 第三个参数表示要执行的操作，是显示还是隐藏
	this.operationscript="";
	
	//使用的组信息
	this.group = null;
}


askitems.prototype.inititems = function(item,responseset){
	
	this.itemName = item.NAME?item.NAME:"";
	this.header = item.HEADER?item.HEADER:"";
	
	this.subHeader = item.SUBHEADER?item.SUBHEADER:"";
	this.leftItemText = item.LEFTITEMTEXT?item.LEFTITEMTEXT:"";
	this.units = item.UNITS?item.UNITS:"";
	this.rightItemText = item.RIGHTITEMTEXT?item.RIGHTITEMTEXT:"";
	this.columnNumber = item.COLUMNNUMBER;
	this.responseLayout = item.RESPONSE_LAYOUT?item.RESPONSE_LAYOUT:"";
	this.required = item.REQUIRED == 0?false:true;
	this.itemDisplayStatus  = item.SHOWITEM == 0?false:true;
	
	this.value  = item.VALUE?item.VALUE:"";
	//this.value.push(item.VALUE?item.VALUE:"");
	
	this.itemid = item.ITEMID?item.ITEMID:"";
	this.itemdataid = item.ITEMDATAID?item.ITEMDATAID:"";
	this.validation = item.REGEXP?item.REGEXP:"";
	this.validationErrorMessage = item.REGEXPERRORMSG?item.REGEXPERRORMSG:"";
	this.responseset = responseset;
	
	this.dataType =  item.ITEMDATATYPEID?item.ITEMDATATYPEID:"5";
	this.widthDecimal = item.WIDTHDECIMAL?item.WIDTHDECIMAL:"";
	
	//显示隐藏
	this.controlitemname = item.CONTROLITEMNAME?item.CONTROLITEMNAME:"";
	this.optionvalue = item.OPTIONVALUE?item.OPTIONVALUE:"";
	this.message  = item.MESSAGE?item.MESSAGE:"";
	
	//初始化组信息
	this.group = new askgroups();
	this.group.groupLabel =  item.GROUPNAME?item.GROUPNAME:"";
	this.group.groupHeader = item.GROUPHEADER?item.GROUPHEADER:"";
	this.group.groupSubheader = item.GROUPSUBHEADER?item.GROUPSUBHEADER:"";
	this.group.groupRepeatMax = item.GROUPREPEATMAX;
	this.group.showGroup = item.SHOWGROUP == 0?false:true;
	this.group.repeatingGroup = item.REPEATINGGROUP == 0?false:true;
}


////////////////////////////////////////////////////////////////////只读方式生成问题//////////////////////////////////////////////////////////////
/**
 * 使用只读方式生成问题进行展现
 */
askitems.prototype.getquestionreader = function() {
	var isdisplay = "display:";
	isdisplay+=this.itemDisplayStatus?"block;":"none;";

	var table = '<table border="0" style="'+isdisplay+'" cellspacing="0" cellpadding="1">' +
		'<tbody>' +
		'<tr>' +
			this.aka_ques_block() +
			this.aka_text_block()+
			this.aka_quesbodyread()+
			this.get_aka_remark()+
			//this.get_aka_right_item_text()+
			this.get_aka_units()+
		'</tr>'+
		'</tbody></table>';
		return table;
}





/**
 * 生成问题的主体，重要。
 */
askitems.prototype.aka_quesbodyread = function(){
		var quesbody = '<td valign="top" nowrap="nowrap">';
		
		//这个样式不知道是否有用，先保留一下
		quesbody+='<style type="text/css">'+
			'.tooltip {'+
			'	width: 100%;'+
			'}'+
		'</style>';
		
		switch(this.responseset.NAME)
		{
			case RESPONSETYPE.text:
			case RESPONSETYPE.textarea:
				quesbody+=this.aka_questbody_text_readonly();
			break;
			case RESPONSETYPE.radio:
			case RESPONSETYPE.singleselect:
				quesbody+=this.aka_questbody_radio_readonly();
			break;
		}
		quesbody+='</td>';
		
		
		return quesbody;
}

/**
 * 获取单选题的主体部分
 */
askitems.prototype.aka_questbody_radio_readonly = function(){
		var tempbody = "";
		var optionvalues = this.responseset.OPTIONSVALUES.split(",");
		var optiontexts = this.responseset.OPTIONSTEXT.split(",");
		for(var i=0;i<optiontexts.length;i++)
		{
			if(optionvalues[i]== this.value)
			{
				return '<span class="crfselectvalue">'+optiontexts[i]+'</span>';
			}
		}
		return '<span class="crfselectvalue">未选择</span>';
}
/**
 * 获取开放题的主体部分
 */
askitems.prototype.aka_questbody_text_readonly = function(){
		return '<span class="crfselectvalue">'+this.value+'</span>';
}
////////////////////////////////////////////////////////////////////只读方式生成问题结束//////////////////////////////////////////////////////////////


/**
 * 生成问题
 */
askitems.prototype.getquestion = function() {
	var isdisplay = "display:";
	isdisplay+=this.itemDisplayStatus?"block;":"none;";

	var table = '<table border="0" style="'+isdisplay+'" class="questionbody" id="'+this.itemName+'questionbody" cellspacing="0" cellpadding="1">' +
		'<tbody>' +
		'<tr>' +
			this.aka_ques_block() +
			this.aka_text_block()+
			this.aka_quesbody()+
			this.get_aka_remark()+
			this.get_aka_right_item_text()+
			this.get_aka_units()+
		'</tr>'+
		'</tbody></table>';
		return table;
}

/**
 * 生成  暂不理解使用方法，有待追加
 */
askitems.prototype.aka_ques_block = function() {
	var aka_ques_block = '<td valign="top" class="aka_ques_block"></td>';
	return aka_ques_block;
}

/**
 * 生成问题标题
 */
askitems.prototype.aka_text_block = function() {
	//拼接标题
	var aka_text_block = '<td valign="top" class="aka_text_block">' +
		this.leftItemText;
		if(this.required)
		{
			aka_text_block+='<span class="lefttextmustanswer">*</span>';
		}
		aka_text_block+='</td>';
	return aka_text_block;
}


/**
 * 生成问题的主体，重要。
 */
askitems.prototype.aka_quesbody = function(){
	
		var quesbody = '<td valign="top" nowrap="nowrap">';
		
		//这个样式不知道是否有用，先保留一下
		quesbody+='<style type="text/css">'+
			'.tooltip {'+
			'	width: 100%;'+
			'}'+
		'</style>';
		//引入需要的文件
		
		switch(this.responseset.NAME)
		{
			case RESPONSETYPE.text:
				quesbody+=this.aka_questbody_text();
			break;
			case RESPONSETYPE.textarea:
				quesbody+=this.aka_questbody_textarea();
				break;
			case RESPONSETYPE.radio:
				quesbody+=this.aka_questbody_radio();
			break;
			case RESPONSETYPE.checkbox:
				quesbody+=this.aka_questbody_checkbox();
			break;
			case RESPONSETYPE.singleselect:
				quesbody+=this.aka_questbody_singleselect();
			break;
			case RESPONSETYPE.multiselect:
				quesbody+=this.aka_questbody_multiselect();
			break;
			case RESPONSETYPE.file:
				quesbody+=this.aka_questbody_file();
			break;
		}
		quesbody+='</td>';
		
		
		return quesbody;
}

/**
 * 获取单选题的主体部分
 */
askitems.prototype.aka_questbody_radio = function(){
		var tempbody = "";
		var optionvalues = this.responseset.OPTIONSVALUES.split(",");
		var optiontexts = this.responseset.OPTIONSTEXT.split(",");
		for(var i=0;i<optiontexts.length;i++)
		{
			checked='';
			if(optionvalues[i]== this.value)
			{
				checked='checked="checked"';
			}
			
			tempbody += '<label for="'+this.itemName+'"></label>';
			tempbody+='<input id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+' type="radio" name="'+this.itemName+'" value="'+optionvalues[i]+'" '+checked+'>';
			tempbody+=optiontexts[i];
			
			if(this.responseLayout != "Horizontal")
			{
				tempbody+='<br>';
			}
		}
		return tempbody;
}



/**
 * 获取多选题的主体部分
 */
askitems.prototype.aka_questbody_checkbox = function(){
		var tempbody = "";
		var optionvalues = this.responseset.OPTIONSVALUES.split(",");
		var optiontexts = this.responseset.OPTIONSTEXT.split(",");
		for(var i=0;i<optiontexts.length;i++)
		{
			checked='';
			//复选题的结果使用逗号分隔，因此需要循环确认
			var values = this.value.split(",");
			for(var j=0;j<values.length;j++)
			{
				if(optionvalues[i]== values[j])
				{
					checked='checked="checked"';
					break;
				}
			}
			
			
			tempbody += '<label for="'+this.itemName+'"></label>';
			tempbody+='<input id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+' type="checkbox" name="'+this.itemName+'" value="'+optionvalues[i]+'" '+checked+'>';
			tempbody+=optiontexts[i];
			
			if(this.responseLayout != "Horizontal")
			{
				tempbody+='<br>';
			}
		}
		return tempbody;
}
/**
 * 获取开放题的主体部分
 */
askitems.prototype.aka_questbody_text = function(){
		var tempbody = '<label for="'+this.itemName+'"></label>';
		tempbody+='<input id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+' type="text" name="'+this.itemName+'" value="'+this.value+'">';
		return tempbody;
}

/**
 * 获取文本框的主体部分
 */
askitems.prototype.aka_questbody_textarea = function(){
		var tempbody = '<label for="'+this.itemName+'"></label>';
		
		tempbody+='<textarea id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+'  rows="5" cols="40">'+this.value+'</textarea>';
		return tempbody;
}

/**
 * 获取下拉题的主体部分
 */
askitems.prototype.aka_questbody_singleselect = function(){
	var tempbody = '<label for="'+this.itemName+'"></label>';
	tempbody+='<select id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+' name="input28" class="formfield">';
	//循环生成option
	var optionvalues = this.responseset.OPTIONSVALUES.split(",");
	var optiontexts = this.responseset.OPTIONSTEXT.split(",");
	
	for(var i=0;i<optiontexts.length;i++)
	{
		if(this.value == optionvalues[i])
			tempbody+='<option value="'+optionvalues[i]+'" selected="selected">'+optiontexts[i]+'</option>';
		else
			tempbody+='<option value="'+optionvalues[i]+'">'+optiontexts[i]+'</option>';
	}
	tempbody+='</select>';
	return tempbody;
}

/**
 * 获取多选下拉题的主体部分
 */
askitems.prototype.aka_questbody_multiselect = function(){
	var tempbody = '<label for="'+this.itemName+'"></label>';
	tempbody+='<select  multiple=""  id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+' name="input28" class="formfield">';
	//循环生成option
	var optionvalues = this.responseset.OPTIONSVALUES.split(",");
	var optiontexts = this.responseset.OPTIONSTEXT.split(",");
	
	for(var i=0;i<optiontexts.length;i++)
	{
		var selected='';
		
		var values = this.value.split(',');
		for(var j=0;j<values.length;j++)
		{
			if(values[j] == optionvalues[i])
			{
				 selected='selected="selected"';
				 break;
			}
		}
		tempbody+='<option value="'+optionvalues[i]+'" '+selected+'>'+optiontexts[i]+'</option>';
	}
	tempbody+='</select>';
	return tempbody;
}
/**
 * 获取文件上传题的主体部分
 */
askitems.prototype.aka_questbody_file = function(){
		var tempbody = '<label for="'+this.itemName+'"></label>';
		tempbody+='<input readonly  style="background:#f0f0f0;" id="'+this.itemName+'" tabindex="'+this.tabindex+'" '+this.aka_questbody_commononchange()+' type="text" name="'+this.itemName+'" value="'+this.value+'">';
		tempbody+='<input type="button" id="up" name="uploadFile" onclick="askcrffileupload(\''+this.itemid+'\',\''+this.itemName+'\')" value="点击上传文件">';
		return tempbody;
}

/**
 * 获取通用的内容改变后要触发的事件
 */
askitems.prototype.aka_questbody_commononchange = function(){
	
	//setImageWithTitle 方法用于设置顶部和顶部的图片标题及图标
	//changedField 样式名称
	var str ='onchange="this.className=\'changedField\';javascript:setImageWithTitle(\'DataStatus_top\',\'images/icon_UnsavedData.gif\', \''+crf.imagetitle+'\'); javascript:setImageWithTitle(\'DataStatus_bottom\',\'images/icon_UnsavedData.gif\', \''+crf.imagetitle+'\');';
	if(this.operationscript.length>0)
	{
		str+='javascript:showhidequestion(\''+this.itemName+'\',\''+this.responseset.NAME+'\', \''+this.operationscript+'\');';
	}
	str+='"';
	return str;
}

/**
 * 获取右侧的自定义按钮相关功能。可以配置多个按钮功能。
 */
askitems.prototype.get_aka_remark = function(){
	var right_item_text = '<td valign="top">'+
						  //'<a tabindex="1001" href="#" onmouseover="callTip(genToolTips_ItemInput(63));" onmouseout="UnTip()" onclick="openDNWindow(\'CreateDiscrepancyNote?isGroup=-1&amp;eventCRFId=2&amp;subjectId=2&amp;itemId=63&amp;groupLabel=&amp;sectionId=2&amp;id=-1&amp;name=itemData&amp;field=input63&amp;column=value&amp;enterData=1&amp;errorFlag=&amp;eventName=222&amp;eventDate=2016-08-05 00:00:00.0&amp;crfName=风险率 1\',\'spanAlert-input63\',\'\'); return false;"><img id="flag_input63" name="flag_input63" src="images/icon_noNote.gif" border="0" alt="质疑注释"></a>'+
						   '</td>';
	return right_item_text;
	
}


/**
 * 获取单位
 */
askitems.prototype.get_aka_units = function(){
	var units = '';
	if(this.units.length>0)
	{
		units = '<td valign="top">('+this.units+')</td>';
	}
	return units;
}


/**
 *获取右侧标题，一般可以增加各种按钮
 */
askitems.prototype.get_aka_right_item_text= function(){
	var temp = '<td valign="top">'+
				this.rightItemText+
				'</td>';
	return temp;
}






//////////////////////////////////////////////////////////获取组下的问题生成方式//////////////////////////////////////////////////////////////////////
/**
 * 组下生成问题
 */
askitems.prototype.getgroupquestion = function(){
	var html = "";
	switch(this.responseset.NAME)
	{
		case RESPONSETYPE.radio:
			html = this.aka_questbody_radio();
		break;
		case RESPONSETYPE.multiselect:
			html = this.aka_questbody_multiselect();
		break;
		case RESPONSETYPE.checkbox:
			html = this.aka_questbody_checkbox();
			break;
		case RESPONSETYPE.text:
			html = this.aka_questbody_text();
			break;
		case RESPONSETYPE.textarea:
			html = this.aka_questbody_textarea();
			break;
		case RESPONSETYPE.singleselect:
			html=this.aka_questbody_singleselect();
			break;
		case RESPONSETYPE.file:
			html=this.aka_questbody_file();
			break;
	}
	return html;
}

/**
 * 生成文本题
 */
askitems.prototype.getgroupquestion_text = function(){
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







///**
// * 获取问题允许输入内容的正则表达式
// */
//askitems.prototype.getonkeyupvalidate = function(){
//	var validate = "^\d+(\.\d{2})?$";
//	return "";
//}








/**
 * 返回错误提示下的title信息,先以左侧title为准，没有时以SubHeader为准
 */
askitems.prototype.error_title = function(){
	
	var templeftItemText = this.leftItemText.replaceScript();
	templeftItemText=templeftItemText.trim();
	templeftItemText = templeftItemText.replaceHTML();

	if(templeftItemText.length>0)
	{
		return templeftItemText;
	}
	else if(this.subHeader.length>0)
	{
		var tempsubheader = this.subHeader.replaceScript();
	
		tempsubheader = tempsubheader.replaceHTML();

		return tempsubheader;
	}
}

/**
 * 问题是否回答
 * 如果返回的错误信息为空，表示问题已经回答，否则将返回未必答的错误提示信息
 */
askitems.prototype.question_isanswer = function(){
	if(!this.value || this.value.length<=0){
		return crftemplate.checkmustanswertemplate.replaceAll("{error}",this.error_title()+"不能为空。");
	}
	return "";
}


/**
 * 获取问题结果，将结果设置到问题的value值内
 */
askitems.prototype.getresult = function(){
	switch(this.responseset.NAME)
	{
		case RESPONSETYPE.radio:
			this.value = $('input[name="'+this.itemName+'"]:checked').val();
			if(!this.value){
				this.value ="";
			}
		break;
		case RESPONSETYPE.multiselect:
			this.value = $("#"+this.itemName).val().join(",");
		break;
		case RESPONSETYPE.checkbox:
				this.value = "";
				questionvalue = this.value;
				$('input[name="'+this.itemName+'"]').each(function(){
					if($(this).is(':checked'))
					{
						questionvalue+=$(this).val()+",";
					}
				});
				this.value = questionvalue;
				if(!this.value){
					this.value ="";
				}
				else
				{
					this.value = this.value.substring(0,this.value.length-1);
				}
			break;
		default:
			this.value = $("#"+this.itemName).val();
		break;
	}
	
	//预留代码，为以后增加组信息时使用
	//组获取结果的测试代码
//	if(this.group.repeatingGroup)
//	{
//		//找到指定问题模板的所有行
//		var allgrouprow =$(document).find("tr[grouptemplate='"+this.group.groupLabel+"']");
//		var qthis = this;
//		allgrouprow.each(function(){
//			switch(qthis.responseset.NAME)
//			{
//				case RESPONSETYPE.radio:
//					
//				break;
//				case RESPONSETYPE.multiselect:
//					
//				break;
//				case RESPONSETYPE.checkbox:
//						
//					break;
//				case RESPONSETYPE.text:
//					alert(qthis.itemName+":"+$(this).find(":text[id='"+qthis.itemName+"']").val());
//				break;
//			}
//		});
//	}
//	else
//	{
//		switch(this.responseset.NAME)
//		{
//			case RESPONSETYPE.radio:
//				this.value = $('input[name="'+this.itemName+'"]:checked').val();
//				if(!this.value){
//					this.value ="";
//				}
//			break;
//			case RESPONSETYPE.multiselect:
//				this.value = $("#"+this.itemName).val().join(",");
//			break;
//			case RESPONSETYPE.checkbox:
//					this.value = "";
//					questionvalue = this.value;
//					$('input[name="'+this.itemName+'"]').each(function(){
//						if($(this).is(':checked'))
//						{
//							questionvalue+=$(this).val()+",";
//						}
//					});
//					this.value = questionvalue;
//					if(!this.value){
//						this.value ="";
//					}
//					else
//					{
//						this.value = this.value.substring(0,this.value.length-1);
//					}
//				break;
//			default:
//				this.value = $("#"+this.itemName).val();
//			break;
//		}
//	}
	
	
	
}



/**
 * 校验问题的业务逻辑规则是否正确，根据不同问题进行相关校验
 * 
 */
askitems.prototype.checkquestionlogic = function(){
	//如果需要最大值校验
	var errorstr="";
	if(this.validation.length>0)
	{
		
		var allvalidations = this.validation.split(";");
		var allvalidationmessages = this.validationErrorMessage.split(";");
		for(var i=0;i<allvalidations.length;i++)
		{
			try
			{
				//当需要进行相关校验时
				var tempvalidation = allvalidations[i].split(":");
				if(tempvalidation.length == 2)
				{
					if(tempvalidation[0] == "regexp")
					{
						if(!chkregexp(this.value,tempvalidation[1]))
						{
							errorstr+=crftemplate.checkmustanswertemplate.replaceAll("{error}",this.error_title()+allvalidationmessages[i]);
						}
					}
					else if(tempvalidation[0] == "func")
					{
						var executefunc = tempvalidation[1].replace(")",","+this.value+")");
						var executeresult = eval(executefunc);
						if(!executeresult)
						{
							errorstr+=crftemplate.checkmustanswertemplate.replaceAll("{error}",this.error_title()+allvalidationmessages[i]);
						}
					}
					else if(tempvalidation[0] == "funcex")
					{
						//自已的扩展函数，扩展函数不用于错误验证，主要用于通过可变规则，改变现有输入值
						eval('this.'+tempvalidation[1]);
					}
				}
			}
			catch(e)
			{}
		}
	}
	
	//如果有指定校验长度，则使用指定的校验长度进行校验，注意不能超过2000个字符，否则将会出现错误。
	if(this.widthDecimal.length>0)
	{
		try
		{
			switch(this.dataType)
			{
				case DATATYPE.ST:
					if(this.value.length >parseInt(this.widthDecimal))
					{
						errorstr+=crftemplate.checkmustanswertemplate.replaceAll("{error}",this.error_title()+"允许最大输入长度为"+this.widthDecimal+",输入长度为"+this.value.length+"。");
					}
					break;
			}
		}
		catch(e){
			
		}
	}
	else
	{
		//校验输入的长度是否大于数据库允许的总长度，如果大于数据库允许录入的总长度，则提示错误。
		if(this.value && this.value.length>2000)
		{
			errorstr+=crftemplate.checkmustanswertemplate.replaceAll("{error}",this.error_title()+"允许最大输入长度为2000,输入长度为"+this.value.length+"。");
		}
	}
	
	return errorstr;
}



/**
 * 生成结果json串
 * @param {Object} sectionlabel
 */
askitems.prototype.buildcrfresult = function(){
	return {"ITEMDATAID":this.itemdataid,"VALUE":strtounicode(this.value),"ITEMID":this.itemid};
}

/**
 * 问题是否回答了。
 * 为保证后期不同题型的必答验证，因此在这里根据题型判断是否必答
 * 返回真，表示问题已回答，否则表示问题未回答
 */
askitems.prototype.isanswer = function(){
	if(this.value && this.value.length>0)
		return true;
	else
		return false;
}



////////////////////////////////////////////crf函数校验代码///////////////////////////////////////////////////////
/**
 * 校验指定正则表达式是否成立，成立返回真，不成立返回假
 * val:要验证的值
 * regval:要使用的正则表达式
 */
function chkregexp(val,regval)
{
	regval = eval(regval);
     if(val.length!=0){    
	     if(!regval.test(val)){    
	        return false;  
	     }    
	     
     }
     return true;
}

/**
 *验证范围
 *val1:开始位置
 *val2:结束位置
 *val:当前值
 *举例，验证输入内容为 1-10，则val1=1 val2=10
 *验证通过，返回真，验证未通过，返回假
 */
function range(val1,val2,val)
{
	if(val.length !=0)
	{
		if(val>=val1 && val <=val2)
			return true;
		else
			return false;
	}
	return true;
}

/**
 * 大于指定的值
 * @param val1  要对比的数据
 * @param val 当前数据
 * @returns {Boolean}
 */
function gt(val1,val)
{
	if(val.length !=0)
	{
		if(val>val1)
			return true;
		else
			return false;
	}
	return true;
}
/**
 * 大于等于指定的值
 * @param val1  要对比的数据
 * @param val 当前数据
 * @returns {Boolean}
 */
function gte(val1,val)
{
	if(val.length !=0)
	{
		if(val>=val1)
			return true;
		else
			return false;
	}
	return true;
}


/**
 * 小于指定的值
 * @param val1  要对比的数据
 * @param val 当前数据
 * @returns {Boolean}
 */
function lt(val1,val)
{
	if(val.length !=0)
	{
		if(val<val1)
			return true;
		else
			return false;
	}
	return true;
}



/**
 * 小于等于指定的值
 * @param val1  要对比的数据
 * @param val 当前数据
 * @returns {Boolean}
 */
function lte(val1,val)
{
	if(val.length !=0)
	{
		if(val<=val1)
			return true;
		else
			return false;
	}
	return true;
}



/**
 * 不等于指定的值
 * @param val1  要对比的数据
 * @param val 当前数据
 * @returns {Boolean}
 */
function ne(val1,val)
{
	if(val.length !=0)
	{
		if(val!=val1)
			return true;
		else
			return false;
	}
	return true;
}

/**
 * 等于指定的值
 * @param val1  要对比的数据
 * @param val 当前数据
 * @returns {Boolean}
 */
function eq(val1,val)
{
	if(val.length !=0)
	{
		if(val==val1)
			return true;
		else
			return false;
	}
	return true;
}


/**
 * 转换为指定位数的符点数
 * @param val1 保留的符点数
 */
askitems.prototype.tofloat = function(val1){
	try
	{
		var tempfloatvalue = parseFloat(this.value);
		val1 = parseInt(val1);
		var temp = "1";
		for(var i=0;i<val1;i++)
		{
			temp+="0";
		}
		var result = eval("Math.round("+this.value+"*"+temp+")/"+temp);
		this.value = result;
		$("#"+this.itemName).val(this.value);
		
	}
	catch(e){}
}