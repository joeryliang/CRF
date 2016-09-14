/**
 * 用于备份当前正在操作的crf，注意，同一个时刻，在单页程序下应该仅存在一种正在作的数据，否则数据将混乱，也不满足crf相身情况需求
 * 若有多个需求，请自己处理tab选项卡，就不能再使用该公用的tab选项卡
 */
var askcrfbackcurrentcrf =null;




/**
 * 作者:赵亮
 * 时间:2016/8/5
 * 描述:此对象表示某一个crf，每个crf表示一份量表
 * defaultconfig说明
{
	"isshowtitle":true,		//是否显示标题，默认为显示
	"ishowtoptools":true,     //是否显示顶部工具条，默认为显示
	"isshowbottomtools":true,  //是否显示底部工具条，默认为显示
	"savefunctionname":mysavecrf  //保存crf时调用的函数名，可以缺省不配置，省略时将调用savecrf名称
}
 */
var askcrf = function(defaultconfig) {
	//模型参数
	//crf名称
	this.crfName = "";
	//版本号 暂未使用
	this.version = "";
	//版本描述
	this.versionDescription="";
	//版本描述  暂未使用
	this.revisionNotes="";
	//自定义事件计划名称,就是已后操作人员可以自己定义名称。
	this.studyEventName = "";
	//事件计划名称
	this.studyEventDefinetionName ="";
	
	
	this.eventcrfid = "";
	this.studyeventid = "";//加载crf数据时传入
	this.subjecteventstatusid = "3"; //crf保存状态，拥有默认值，后期也可以修改

	
	this.username="";//初次操作人员姓名
	this.datacreatetime = "";//初始操作时间，存储格式，时间戳 1470809818000
	
	this.updateusername="";//最后操作人员姓名
	this.updatedatatime = "";//最后操作时间，存储格式，时间戳 1470809818000
	
	
	if(!defaultconfig)
	{
		defaultconfig={};
	}
	
	
	this.defaultconfig = defaultconfig;
	
	//业务参数
	//存放分组对象
	this.groups = null;
	//选项卡集合
	this.sections = new Array();
	
	//本crf问题总数量
	this.questioncount = 0;	
}


/**
 * 初始化问卷
 * @param {Object} option
 */
askcrf.prototype.initcrf = function(option){
	this.questioncount =0;
	if(option)
	{
		//加载crf基本数据
		var tempCRF = option.CRF;
		if(tempCRF)
		{
			this.crfName = tempCRF.NAME;
			this.versionDescription=tempCRF.DESCRIPTION;
		}
		//加载组信息
		
		var tempEVENTCRF = option.EVENTCRF;
		this.eventcrfid = tempEVENTCRF.EVENTCRFID;
		this.studyeventid = tempEVENTCRF.STUDYEVENTID;
		this.username = tempEVENTCRF.USERNAME;
		this.subjecteventstatusid = tempEVENTCRF.SUBJECTEVENTSTATUSID;
		
		console.log(tempEVENTCRF);
		this.studyEventName = tempEVENTCRF.STUDYEVENTNAME?tempEVENTCRF.STUDYEVENTNAME:"";
		this.studyEventDefinetionName = tempEVENTCRF.STUDYEVENTDEFINITIONNAME?tempEVENTCRF.STUDYEVENTDEFINITIONNAME:"";
		
		try{
		if(tempEVENTCRF.DATECREATED.time)
		{
			this.datacreatetime = tempEVENTCRF.DATECREATED.time;
		}
		this.updateusername = tempEVENTCRF.UPDATEUSERNAME;
		if(tempEVENTCRF.DATEUPDATED.time)
		{
			this.updatedatatime = tempEVENTCRF.DATEUPDATED.time;
		}}catch(e){}
		
		
		
		//加载sections信息
		var tempSECTION = option.SECTION;
		this.sections = new Array();
		for(var i=0;i<tempSECTION.length;i++)
		{
			var section = new asksections(this.defaultconfig);
			section.initsections(option,i);
			this.sections.push(section);
			
			this.questioncount +=section.items.length;
		}
	}
	else
	{
		alert("crf结构传入错误，不能正确构建。请检查数据。");
	}
}


/**
 * 生成crf,根据要指定的sectionid来生成对应的crf表单
 */
askcrf.prototype.buildcrf = function(sectionlabel){
	return this.getsectionbylabel(sectionlabel).getquestion();
}



/**
 * 生成crf结果只读视图,根据要指定的sectionid来生成对应的crf表单
 */
askcrf.prototype.buildreadcrfview = function(sectionlabel){
	return this.getsectionbylabel(sectionlabel).getquestionreader();
}



/**
 * 获取section，根据label。如果找不到，则返回第一个section
 */
askcrf.prototype.getsectionbylabel = function(sectionlabel){
	for(var i=0;i<this.sections.length;i++)
	{
		if(this.sections[i].sectionLabel == sectionlabel)
		{
			return this.sections[i];
		}
	}
	
	//找不到指定的sections时，返回第一个sections。
	return this.sections[0];
}

/**
 * 校验必答题，如果返回内容为空。必答校验通过，否则校验失败。并返回必答校验的错误集合
 * sectionlabel:要操作的选项卡
 * lables:校验指定的标签是否必填,些选项可以为空，为空时表示全部校验
 */
askcrf.prototype.checkmustanswer = function(sectionlabel,lables){
	return this.getsectionbylabel(sectionlabel).checkmustanswer(lables);
}

/**
 * 校验指定的问题项中是否满足一定数量的必填项
 * @param {Object} labelnames  需要校验的问题标签，使用逗号分隔。
 * @param {Object} mustnumber  必填项的个数，如果满足指定个数的必填项，则不反回错误信息。否则输出错误信息
 */
askcrf.prototype.checkmustanswerbynum = function(labelnames,mustnumber){
	var templabels = labelnames.split(",");
	var answernum = 0;
	var errortext = "";
	for(var i=0;i<templabels.length;i++)
	{
		var q = this.getquestionbylabelname(templabels[i]);
		if(q)
		{
			if(q.isanswer())
			{
				answernum++;
			}
		}
		errortext+=q.error_title()+"、";
	}
	
	if(answernum>=mustnumber)
	{
		//回答的个数要求必需回答的项数，通过
		return "";
	}
	else
	{
		//未通过最少要求，需要返回错误信息
		var errorstr =crftemplate.checkmustanswertemplate.replaceAll("{error}",errortext+"必须有"+mustnumber+"项必填。");
		return crftemplate.checkmustanswertemplateprefix+errorstr+crftemplate.checkmustanswertemplatesuffix;
	}
}

/**
 * 获取问题结果，将结果设置到问题的value值内
 */
askcrf.prototype.getresult = function(sectionlabel){
	this.getsectionbylabel(sectionlabel).getresult();
}



/**
 * 生成crf结果,根据要指定的sectionid来生成对应的crf结果，返回json格式结果数据
 */
askcrf.prototype.buildcrfresult = function(sectionlabel){
	var result = this.getsectionbylabel(sectionlabel).buildcrfresult();
	return {"STUDYEVENT":{"STUDYEVENTID":this.studyeventid,"SUBJECTEVENTSTATUSID":this.subjecteventstatusid},"EVENTCRF":{"EVENTCRFID":this.eventcrfid},"ITEMDATA":result};
}


/**
 * 根据问题标签，获取问题结果，
 * sectionlabel:要操作的选项卡 如:风险率
 * label:要获取结果的问题标签名称 如:nianling
 */
askcrf.prototype.getresultbylabel = function(sectionlabel,label){
	return this.getsectionbylabel(sectionlabel).getresultbylabel(label);
}


/**
 * 设置问题的最大输入值
 * @param {Object} labelname 问题的标签
 * @param {Object} maxvalue  允许的最大值
 */
askcrf.prototype.setquestionmaxvalue = function(labelname,maxvalue){
	var q = this.getquestionbylabelname(labelname);
	if(q)
	{
		q.maxvalue = maxvalue;
		return true;
	}
	return false;
}
/**
 * 设置问题的最小输入值
 * @param {Object} labelname 问题标签
 * @param {Object} minvalue 允许的最小值
 */
askcrf.prototype.setquestionminvalue = function(labelname,minvalue){
	var q = this.getquestionbylabelname(labelname);
	if(q)
	{
		q.minvalue = minvalue;
		return true;
	}
	return false;
}

/**
 * 根据问题的唯一标签，获取问题
 * @param {Object} labelname
 */
askcrf.prototype.getquestionbylabelname = function(labelname){
	for(var i=0;i<this.sections.length;i++)
	{
		for(var j=0;j<this.sections[i].items.length;j++)
		{
			var q = this.sections[i].items[j];
			if(q.itemName == labelname)
			{
				return q;
			}
		}
	}
	return null;
}

/**
 * 显示crf到指定的容器
 * @param {Object} contentid 要显示到的容器id
 */
askcrf.prototype.showcrf = function(contentid){
		askcrfbackcurrentcrf = this;
	
		var html ='<div id="crferrormsg"></div>'+
		'<div id="crfchangetap">'+this.buildcrftap()+'</div>'+
		'<div id="crfcontent">'+this.buildcrf()+'</div>';
		$("#"+contentid).empty();
		//将数据加载到crf
		$("#"+contentid).append(html);
		//问题显示隐藏
		showhide();
		initchangecrfstate(this);
}


/**
 * 改变crf下拉状态
 */
var initchangecrfstate =function(crf){
	if($("#zhuangtai option[value='8']").size()<=0)
	{
		//要看之前是否删除过重体力活动，如果删除过，则需要添加回来
		$("#zhuangtai").append("<option value='8'>已签名</option>");
	}
	
	if(crf.subjecteventstatusid != 8 && crf.subjecteventstatusid != 4)
	{
		//已完成状态下显示已签名
		$("#zhuangtai option[value='8']").remove();	
	}
	
	//选择正确的状态
	$("#zhuangtai").val(crf.subjecteventstatusid);
}

/**
 * 生成crf的tab选项卡切换项
 */
askcrf.prototype.buildcrftap = function(){
		var temphtml = '<table border="0" cellpadding="0" cellspacing="0">'+
			'<tbody>'+
				'<tr>';
				//当小于3个时，不需要切换选项卡
				if(this.sections.length>3)
				{
					temphtml += '<td align="right" valign="middle" style="padding-left: 12px; display: none" id="TabsBack">'+
						'<a href="javascript:" onclick="TabsBack(this)"><img src="images/arrow_back.gif" border="0" style="margin-top:10px"></a>'+
					'</td>'+
					'<td align="right" style="padding-left: 12px" id="TabsBackDis">'+
						'<img src="http://192.168.8.41:8080/OC/images/arrow_back_dis.gif" border="0"></td>';
				}
				
				for(var i=0;i<this.sections.length;i++)
				{
					var classbg = "tab_BG";
					var classl = "tab_L";
					var classr = "tab_R";
					if(i==0)
					{
						classbg = "tab_BG_h";
						classl = "tab_L_h";
						classr = "tab_R_h";
					}
					var defaultisdisplay = "block";
					if(i>=3)
					{
						defaultisdisplay = "none";
					}
					
					temphtml+='<td class="crfHeaderTabs" valign="bottom" id="Tab'+(i+1)+'">'+
					'<div  style="display:'+defaultisdisplay+'">'+
						'<div class="'+classbg+'">'+
							'<div class="'+classl+'">'+
								'<div class="'+classr+'" onclick="selectcrftab(\'Tab'+(i+1)+'\',\''+this.sections[i].sectionLabel+'\',\''+this.sections[i].sectionTitle+'\')"><span class="tabtext">'+this.sections[i].sectionTitle+'<span id="secNumItemsCom1" style="font-weight: normal;">('+this.sections[i].items.length+'/'+this.questioncount+')</span></span>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</td>';
				}
					
					
					
				if(this.sections.length>3)
				{
					temphtml+='<td align="right" id="TabsNextDis" style="display: none"><img src="images/arrow_next_dis.gif" border="0"></td>'+
					'<td align="right" id="TabsNext">'+
						'<a href="javascript:" onclick="TabsForward(this)"><img src="http://192.168.8.41:8080/OC/images/arrow_next.gif" border="0" style="margin-top:10px;margin-right:6px"></a>'+
					'</td>';
					
					
					temphtml+='<td>'+
						'<div class="formfieldM_BG_noMargin">'+
							'<select class="formfieldM" id="crfsectionSelect" size="1" onchange="changecrftab(this);">'+
								'<option selected="">-- 选择跳转到 --</option>';
								
								//循环生成
								for(var i=0;i<this.sections.length;i++)
								{
									temphtml+='<option value="'+this.sections[i].sectionLabel+'">'+this.sections[i].sectionTitle+'</option>';
								}
					temphtml+='</select>'+
						'</div>'+
					'</td>';
					
					
				}
				
					

				temphtml+='</tr>'+
			'</tbody>'+
		'</table>';
		return temphtml;
}



/**
 * 通用的加载crf
 */
var askcrfloadcrf = function(sectionlabel){
	if(askcrfbackcurrentcrf)
	{
		
		$("#crfcontent").empty();
		var crfhtml = askcrfbackcurrentcrf.buildcrf(sectionlabel);
		//将数据加载到crf
		$("#crfcontent").append(crfhtml);
		//问题显示隐藏
		showhide();

		initchangecrfstate(askcrfbackcurrentcrf);
	}
	else
	{
		alert("crf数据加载错误。");
	}
}

/**
 * 若不想要自己处理保存，可以使用通用保存方法
 * @param {Object} sectionlabel
 * 如果验证失败，返回false,如果成功，返回json结果串
 */
function askcrfsave(sectionlabel) {
		
		//获取dom结果
		askcrfbackcurrentcrf.getresult(sectionlabel);
		//校验必答题是否都回答了，如果长度大于0,说明有未答问题
		var mustanswerresult = askcrfbackcurrentcrf.checkmustanswer(sectionlabel);
		if(mustanswerresult.length > 0) {
			$("#crferrormsg").html(mustanswerresult);
			return false;
		} else {
			$("#crferrormsg").html("");
		}
		
		//使用自己选择的状态作为crf状态。
		askcrfbackcurrentcrf.subjecteventstatusid =$("#zhuangtai").val();
		
		var resultjson = askcrfbackcurrentcrf.buildcrfresult(sectionlabel);
		
		try{
			//设置crf为未修改状态
			setaskcrfunchange();
		}catch(e){}
		
		return resultjson;
	}

/**
 * 获取当前选项卡的下一个选项卡名称,若存在下一个选项卡，系统自动切换到下一个选项卡上。
 * @param currentsectionlabel
 * 找到的下一个选项卡名称，若找不到下一个，则返回空
 */
function getnextsectionlabel(currentsectionlabel)
{
	for(var i=0;i<askcrfbackcurrentcrf.sections.length;i++)
	{
		if(askcrfbackcurrentcrf.sections[i].sectionLabel == currentsectionlabel)
		{
			if(i<(askcrfbackcurrentcrf.sections.length-1))
			{
				var tabname = "Tab"+(i+2);
				var tempsection =askcrfbackcurrentcrf.sections[i+1].sectionLabel;
				var temptitle =askcrfbackcurrentcrf.sections[i+1].sectionTitle;
				selectcrftab(tabname,tempsection,temptitle);
				return askcrfbackcurrentcrf.sections[i+1].sectionLabel;
			}
			else
			{
				return "";
			}
		}
	}
	return "";
}

/**
 * 设置crf为未修改状态，保存后调用该方法
 */
function setaskcrfunchange(){
	setImageWithTitle('DataStatus_top','images/icon_UnchangedData.gif', "'"+crf.imagetitleunchange+"'");
	setImageWithTitle('DataStatus_bottom','images/icon_UnchangedData.gif', "'"+crf.imagetitleunchange+"'");
}
