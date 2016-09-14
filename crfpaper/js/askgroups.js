/**
 * 作者:赵亮
 * 时间:2016/8/5
 * 描述:crf组标识，可以某识某一组数据如何进行应用
 */
var askgroups = function(){
	//组的唯一标识号   如:SU  LS  LSUP
	this.groupLabel = "";
	//本组使用何种布局方式，包括 non-repeating(不循环) 值为fasle、grid（循环） 值为true
	this.repeatingGroup = false;
	//组头部描述
	this.groupHeader="";
	//组的子标题
	this.groupSubheader = "";
	//暂不了解 可能为组的重复数字
	this.groupRepeatMax="1";
	//该组是否显示,默认情况下显示
	this.showGroup=true;
	//存放该组下所有的问题标识名称。
	this.itemNames = new Array();
	
	//用于表示是否已经生成问题模板并追追加,当显示问题前要注意将该值赋值为假。这样后续问题仅在第一次时才生成分组内容，生成后该值即变更为真。
	this.isappendgrouphtml = false;
}



/**
 * 生成组问题
 */
askgroups.prototype.getgroupquestion = function(){
	var html = '<div class="aka_group_header">'+
					'<strong>'+this.groupHeader+'</strong>'+
				'</div>';
				
		html+='<table border="0" cellspacing="0" cellpadding="0" class="aka_form_table" width="100%">'+
		'<thead>'+
		this.getheaderrow()+
		'</thead>'+
		'<tbody>'+
		this.getquestionbodyrow()+
		'<tr>'+
		'<td class="aka_padding_norm aka_cellBorders" colspan="'+(this.itemNames.length+1)+'">'+
		'<button stype="add" type="button" onclick = "addgrouprow(this,\''+this.groupLabel+'\',\''+this.groupRepeatMax+'\')" class="button_search">增加</button>'+
		'</td>'+
		'</tr>'
		'</tbody>'+
		'</table>';
		
		this.isappendgrouphtml = true;
		return html;
}

/**
 * 生成组的行标题
 */
askgroups.prototype.getheaderrow  = function(){
	var html = '<tr>';
	for(var i=0;i<this.itemNames.length;i++)
	{
		var title = this.itemNames[i].header;
		if(title.length<=0)
		{
			title = this.itemNames[i].leftItemText;
		}
		title = title.replaceScript();
		html+='<th class="aka_headerBackground aka_padding_large aka_cellBorders">'+title+'</th>';
	}
	
	html+='<th class="aka_headerBackground aka_padding_large aka_cellBorders"></th>';
	html += '</tr>';
	return html;
}

/**
 * 生成组问题的主要内容
 */
askgroups.prototype.getquestionbodyrow  = function(){
	var html = '<tr grouptemplate="'+this.groupLabel+'">';
	for(var i=0;i<this.itemNames.length;i++)
	{
		html+='<td class="aka_padding_norm aka_cellBorders">'+this.itemNames[i].getgroupquestion()+'</td>';
	}
	
	html+='<td class="aka_padding_norm aka_cellBorders">'+
					'<button stype="remove" type="button"  class="button_remove" onclick="removegrouprow(this,\''+this.groupLabel+'\');"></button>'+
				'</td>';
	html += '</tr>';
	return html;
}