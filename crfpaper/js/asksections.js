/**
 * 作者:赵亮
 * 开发时间:2016/8/5
 * 描述:CRF分页标识，每个页对象是一个该变量
 */
var asksections = function(defaultconfig){
	this.isshowtitle = defaultconfig.isshowtitle;
	this.isshowtoptools = defaultconfig.isshowtoptools;
	this.isshowbottomtools = defaultconfig.isshowbottomtools;
	
	this.savefunctionname = defaultconfig.savefunctionname;
	if(this.isshowtitle == null)
		this.isshowtitle = true;
	
	if(this.isshowtoptools == null)
		this.isshowtoptools = true;
	
	
	
	if(this.isshowbottomtools == null)
		this.isshowbottomtools = true;
	if(this.savefunctionname == null)
		this.savefunctionname = "savecrf";
	
	//页标识
	this.sectionLabel = "";
	//页标题
	this.sectionTitle = "";
	//子标题  暂不了解使用方式
	this.subtitle="";
	//
	this.instructions  ="";
	
	//sectionid 唯一值
	this.sectionid= 0;
	
	//存放业务参数
	//存放某一个选项卡下所有的问题
	this.items = new Array();
	
	//所有的问题对应的输出方式
	this.responsesets = new Array();
	//所有的分组记录
	this.groups = new Array();
	
	//是否生成crf下拉状态选择,应该在初始化完成后就明确哪些section生成，哪些不生成
	this.isbuildcrfstatetools = true;
}


/**
 * 
 * @param {Object} option crf基本问卷信息
 * @param {Object} i  当前要加载的第几个section
 */
asksections.prototype.initsections = function(option,i){
	//加载sections信息
	var tempSECTION = option.SECTION[i];
	this.sectionLabel = tempSECTION.LABEL;
	this.sectionTitle = tempSECTION.TITLE;
	this.subtitle = tempSECTION.SUBTITLE;
	this.instructions = tempSECTION.INSTRUCTIONS;
	
	this.sectionid = tempSECTION.SECTIONID;
	
	//加载responsesets
	this.initresponsets(option.RESPONSESET);
	this.groups = new Array();
	this.items = new Array();
	var tempItems = option.ITEM;
	
	
	var tabindex = 1;
	for(var i=0;i<tempItems.length;i++)
	{
		//仅当前选项卡进入问题添加阶段
		if(tempSECTION.SECTIONID == tempItems[i].SECTIONID)
		{
			var item = new askitems();
			item.inititems(tempItems[i],this.getresponset(tempItems[i].RESPONSESETID));
			item.tabindex = tabindex++;
			this.initgroups(item);
			this.items.push(item);
		}
	}
	
	console.log(this.groups);
	//将显示，隐藏相关联的问题都追加到触发问题上
	for(var i=0;i<this.items.length;i++)
	{
		var q = this.items[i];
		if(q.controlitemname.length>0)
		{
			//说明当前问题有脚本需要处理
			var script = q.itemName+"|"+q.optionvalue+"|"+q.message+",";
			var targetq = this.getquestionbylabelname(q.controlitemname);
			targetq.operationscript+=script;
		}
	}
}

/**
 * 初始化问题组相关信息
 */
asksections.prototype.initgroups = function(item){
	try{
		var tempgroup = item.group;
		var existgroup = this.existgroups(tempgroup.groupLabel);
	
		if(existgroup == false)
		{
			//表示还不存在
			this.groups.push(tempgroup);
		}
		else
		{
			tempgroup = existgroup; //表示存在组，重新改变组的信息为返回的组信息
		}
		
		//将查找到的问题名称添加到itemNames里
		tempgroup.itemNames.push(item);
		item.group = tempgroup;//重新改变问题指定的组
	}catch(e){
	}
}
/**
 * 判断指定的组是否已经存在
 * @param groupLabel 组的唯一标识名 
 * @return 如果组已经存在，返回查找到的group对象，否则返回false，表示还不存在指定的组
 */
asksections.prototype.existgroups =function(groupLabel)
{
	for(var i=0;i<this.groups.length;i++)
	{
		if(this.groups[i].groupLabel == groupLabel)
		{
			return this.groups[i];
		}
	}
	return false;
}

/**
 * 加载输出输出设置选项
 * @param {Object} option
 */
asksections.prototype.initresponsets =function(option){
		this.responsesets = new Array();
		
		for(var i=0;i<option.length;i++)
		{
			this.responsesets.push(option[i]);
		}
}
/**
 * 获取问题输出的responseset设置信息
 * @param {Object} responsesetid
 */
asksections.prototype.getresponset =function(responsesetid){
	for(var i=0;i<this.responsesets.length;i++){
		if(responsesetid == this.responsesets[i].RESPONSESETID)
		{
			return  this.responsesets[i];
		}
	}
	return null;
}

///////////////////////////////////////////////////////////////////////////生成只读crf信息////////////////////////////////////////////////////////////////////////
/**
 * 生成只读 crf 信息
 */
asksections.prototype.getquestionreader = function(){
	//生成顶部通用信息
	var tempbody ='<table border="0" cellpadding="0" cellspacing="0">'+
			'<tbody>'+
				'<tr>'+
					'<td>'+
						'<div style="width:100%">'+
							'<!-- These DIVs define shaded box borders -->'+
							'<div class="box_T">'+
								'<div class="box_L">'+
									'<div class="box_R">'+
										'<div class="box_B">'+
											'<div class="box_TL">'+
												'<div class="box_TR">'+
													'<div class="box_BL">'+
														'<div class="box_BR">'+
															'<div class="tablebox_center">';
	
	
	
	tempbody+='<table border="0" cellpadding="0" cellspacing="0">'+
			'<tbody>';
				
	//拼接顶部标题
	tempbody+=this.getquestion_secionstitle();			
			
	var temprowquestion = '';
	for(var i=0;i<this.items.length;i++){
		var tempItem = this.items[i];
		
			if(tempItem.columnNumber == 1)
			{
				if(temprowquestion.length>0)
				{
					temprowquestion+='</tr>'+
								'</tbody>'+
							'</table>'+
						'</td>'+
					'</tr>';
				}
				//主要是把上一个数据进行追加进去使用
				tempbody+=temprowquestion;			
				temprowquestion='<tr><td class="table_cell_left">'+
							'<table border="0">'+
								'<tbody>'+
									'<tr>';
				
				
				//生成当前问题的组标题,只能在第一个问题上添加组标识
				tempbody+=this.getquestion_groupheader(tempItem);
				//生成问题的标题
				tempbody+=this.getquestion_subHeader(tempItem);
			}
			//生成问题
			temprowquestion+="<td>"+tempItem.getquestionreader()+"</td>"
	}
	
	temprowquestion+='</tr>'+
							'</tbody>'+
						'</table>'+
					'</td>'+
				'</tr>';
	tempbody+=temprowquestion;
	
	
	
	tempbody+='</tbody></table>';	
	
	//生成于顶部对应的通用信息
	tempbody+='</div></div></div></div></div></div></div></div></div></div></td></tr></tbody></table>';
	
	return tempbody;
}

//////////////////////////////////////////////////////////////////////////生成只读crf信息结束///////////////////////////////////////////////////////////////////////////
/**
 * 生成crf信息
 */
asksections.prototype.getquestion = function(){
	//生成顶部通用信息
	var tempbody ='<table border="0"  cellpadding="0" cellspacing="0">'+
			'<tbody>'+
				'<tr>'+
					'<td>'+
						'<div style="width:100%">'+
							'<!-- These DIVs define shaded box borders -->'+
							'<div class="box_T">'+
								'<div class="box_L">'+
									'<div class="box_R">'+
										'<div class="box_B">'+
											'<div class="box_TL">'+
												'<div class="box_TR">'+
													'<div class="box_BL">'+
														'<div class="box_BR">'+
															'<div class="tablebox_center">';
	
	
	
	tempbody+='<table border="0" class="questioncontent" cellpadding="0" cellspacing="0">'+
			'<tbody>';
				
	//拼接顶部标题
	tempbody+=this.getquestion_secionstitle();			
			
	//拼接顶部工具条
	tempbody+=this.getquestion_secionstoptools();
	var temprowquestion = '';
	
	//显示问题前，需要先将组内的问题生成标识全部变更为未生成
	for(var i=0;i<this.groups.length;i++)
	{
		this.groups[i].isappendgrouphtml = false;
	}
	
	
	for(var i=0;i<this.items.length;i++){
		var tempItem = this.items[i];
		
		if(tempItem.group.repeatingGroup)
		{
			//仅第一个问题才需要生成组问题，后续同一个组内的问题不会再次生成
			if(tempItem.group.isappendgrouphtml == false)
			{
				//使用循环分组显示问题。
				temprowquestion+='<tr>'+tempItem.group.getgroupquestion()+'</tr>';
			}
		}
		else
		{
			//使用不循环分组情况下的普通添加
			if(tempItem.columnNumber == 1)
			{
				if(temprowquestion.length>0)
				{
					temprowquestion+='</tr>'+
								'</tbody>'+
							'</table>'+
						'</td>'+
					'</tr>';
				}
				//主要是把上一个数据进行追加进去使用
				tempbody+=temprowquestion;			
				temprowquestion='<tr><td class="table_cell_left">'+
							'<table border="0">'+
								'<tbody>'+
									'<tr>';
				
				
				//生成当前问题的组标题,只能在第一个问题上添加组标识
				tempbody+=this.getquestion_groupheader(tempItem);
				//生成问题的标题
				tempbody+=this.getquestion_subHeader(tempItem);
			}
			//生成问题
			temprowquestion+="<td>"+tempItem.getquestion()+"</td>"
			//使用不循环分组情奖品下的普通添加结束
		}
	}
	
	temprowquestion+='</tr>'+
							'</tbody>'+
						'</table>'+
					'</td>'+
				'</tr>';
	tempbody+=temprowquestion;
	
	
	
	tempbody+='</tbody></table>';
	
	//生成crf状态选择工具条
	if(this.isbuildcrfstatetools)
		tempbody+=this.getcrfstatetools();
	
	
	//生成底部的工具条
	tempbody+=this.getbottomtooles();
	
	
	//生成于顶部对应的通用信息
	tempbody+='</div></div></div></div></div></div></div></div></div></div></td></tr></tbody></table>';
	
	return tempbody;
}

/**
 * 生成crf状态选择工具条
 */
asksections.prototype.getcrfstatetools = function(){
	
	
	
	var stateselect = '<select id="zhuangtai"  tabindex="18"  class="formfield zhuangtai">'+
		'<option value="3">未处理</option>'+
		'<option value="1">进行中</option>'+
		'<option value="5">停止</option>'+
		'<option value="4">已完成</option>'+
		'</select>';
		if(this.isshowbottomtools){
			var tempstr = '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 6px;">'+
						    '<!--   style="padding-right: 50px"-->'+
						    '<tbody><tr>'+
						        '<td align="center" valign="bottom">'+
						            '状态:'+stateselect+
						        '</td>'+
						    '</tr>'+
						'</tbody></table>';
						
			return tempstr;
		}
		return "";
		
}

/**
 * 生成底部的工具条菜单
 */
asksections.prototype.getbottomtooles = function(){
		var saveimagetitle = '<img name="DataStatus_bottom" id="status_top" alt="数据状态" title="'+crf.imagetitleunchange+'" src="images/icon_UnchangedData.gif">';
		if(this.isshowbottomtools){
			var tempstr = '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 6px;">'+
						    '<!--   style="padding-right: 50px"-->'+
						    '<tbody><tr>'+
						        '<td valign="bottom" nowrap="nowrap">'+
						            //'<a href="#top">&nbsp;&nbsp;返回顶部</a>'+
						        '</td>'+
						        '<td align="right" valign="bottom">'+
						            '<table border="0" cellpadding="0" cellspacing="0">'+
						                '<tbody><tr>'+
						                            '<td colspan="2">&nbsp;</td>'+
						                    '<td><input type="button"   value="保存" class="button_medium button_crfsavedata" onclick="'+this.savefunctionname+'(\''+this.sectionLabel+'\')"></td>'+
						                    '<td><input type="submit"   value="退出" class="button_medium" onclick="cancelcrf(\''+this.sectionLabel+'\')"></td>'+
						                    '<td valign="bottom">'+saveimagetitle+'</td>'+
						                '</tr>'+
						            '</tbody></table>'+
						        '</td>'+
						    '</tr>'+
						'</tbody></table>';
						
			return tempstr;
		}
		return "";
	}

/**
 * 生成sections的标题
 */
asksections.prototype.getquestion_secionstitle = function(){
	if(this.isshowtitle)
	{
	return '<tr class="aka_stripes">'+
					'<td class="aka_header_border"><b>标题:&nbsp;'+this.sectionTitle+'</b> </td>'+
				'</tr>';
	}
	return "";
}


/**
 * 生成 sections 顶部的工具条
 */
asksections.prototype.getquestion_secionstoptools = function(){
	var saveimagetitle = '<img name="DataStatus_top" id="status_top" alt="数据状态" title="'+crf.imagetitleunchange+'" src="images/icon_UnchangedData.gif">';

		if(this.isshowtoptools)
		{
	var tempbody = '<tr class="aka_stripes">'+
						'<td class="aka_header_border" colspan="2">'+
							'<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 6px;">'+
								'<tbody>'+
									'<tr>'+
										'<td valign="bottom" nowrap="nowrap" style="padding-right: 50px">'+
											'<a name="top">页: </a>'+
										'</td>'+
										'<td align="right" valign="bottom">'+
											'<table border="0" cellpadding="0" cellspacing="0">'+
												'<tbody>'+
													'<tr>'+
														'<td><input type="submit" id="srh" name="submittedResume" value="保存" class="button_medium  button_crfsavedata" onclick="'+this.savefunctionname+'(\''+this.sectionLabel+'\')"></td>'+
														'<td><input type="submit" id="seh" name="submittedExit" value="退出" class="button_medium" onclick="cancelcrf(\''+this.sectionLabel+'\')"></td>'+
														'<td valign="bottom">'+saveimagetitle+'</td>'+
													'</tr>'+
												'</tbody>'+
											'</table>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
						'</td>'+
					'</tr>';
					return tempbody;
				}
		return "";
}


/**
 * 生成当前问题的组标题，就是分组标题
 */
asksections.prototype.getquestion_groupheader = function(item){
	var tempbody = "";
	if(item.header.length>0)
	{
		tempbody = '<tr class="aka_stripes">'+
							'<td class="table_cell_left aka_stripes">'+item.header+'</td>'+
						'</tr>';
	}
	return tempbody;
}



/**
 * 生成当前问题的子标题,仅第一问题时需要生成
 */
asksections.prototype.getquestion_subHeader = function(item){
	var tempbody = "";
	if(item.subHeader.length>0)
	{
		tempbody = '<tr class="aka_stripes">'+
						'<td class="table_cell_left">'+
							item.subHeader+
						'</td>'+
					'</tr>';
	}
	return tempbody;
}


/**
 * 校验指定的label是否包含在labels内。
 * @param {Object} label  指定的label,如  name
 * @param {Object} labels labels标签集,如   name,sex
 * 如果存在，返回真，否则返回假
 */
asksections.checklabelexist = function(label,labels)
{
	var temp = labels.split(",");
	for(var i=0;i<temp.length;i++)
	{
		if(temp[i] == label)
		return true;
	}
	return false;
	
}
/**
 * 校验必答题，如果返回内容为空。必答校验通过，否则校验失败。并返回必答校验的错误集合
 */
asksections.prototype.checkmustanswer = function(lables){
	var errorstr="";
	for(var i=0;i<this.items.length;i++)
	{
		var q = this.items[i];
		
		//校验前，应该判断问题是否隐藏的，对于隐藏的问题，应该不进行必答检校，否则一直无法通过
		var isshow = $("#"+q.itemName+"questionbody").is(":visible");
		
		if(isshow)
		{
			if(lables && lables.length>0)
			{
				if(asksections.checklabelexist(q.itemName,lables))
				{
					errorstr +=q.question_isanswer();
				}
			}
			else
			{
				if(q.required)
				{
					errorstr +=q.question_isanswer();
				}
			}
		}
		//校验问题的其它逻辑，包括正则匹配等等。
		errorstr+=q.checkquestionlogic();
	}
	
	if(errorstr.length>0)
	{
		errorstr = crftemplate.checkmustanswertemplateprefix+errorstr+crftemplate.checkmustanswertemplatesuffix;
	}
	
	return errorstr;
}



/**
 * 获取问题结果，将结果设置到问题的value值内
 */
asksections.prototype.getresult = function(){
	for(var i=0;i<this.items.length;i++)
	{
		var q = this.items[i];
		q.getresult();
	}
}

/**
 * 生成结果json串
 * @param {Object} sectionlabel
 */
asksections.prototype.buildcrfresult = function(){
	var resultarr = new Array();
	for(var i=0;i<this.items.length;i++)
	{
		var q = this.items[i];
		var res = q.buildcrfresult();
		resultarr.push(res);
	}
	return resultarr;
}




/**
 * 根据问题标签，获取问题结果，
 * sectionlabel:要操作的选项卡
 * label:要获取结果的问题标签名称
 */
asksections.prototype.getresultbylabel = function(label){
	for(var i=0;i<this.items.length;i++)
	{
		var q = this.items[i];
		if(q.itemName == label)
		{
			return q.value;
		}
	}
}


/**
 * 根据问题的唯一标签获取问题
 * @param {Object} label
 */
asksections.prototype.getquestionbylabelname = function(labelname){
	for(var j=0;j<this.items.length;j++)
	{
		var q = this.items[j];
		if(q.itemName == labelname)
		{
			return q;
		}
	}
}
