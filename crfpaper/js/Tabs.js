/**
 * 下一页，切换到下一页选项卡
 * @param {Object} obj
 */
function TabsForward(obj){
	var alltabs = $(obj).parent().parent().parent().find(".crfHeaderTabs");
	
	var findshowtables = [];
	alltabs.each(function(i){
		if($(this).children().first().is(":visible"))
		{
			findshowtables.push(this.id);
		}
	});
	
	
	changetofirstshowtabs(findshowtables[findshowtables.length-1]);
	
}

/**
 * 切换到上一页选项卡
 * @param {Object} obj
 */
function TabsBack(obj)
{
	var alltabs = $(obj).parent().parent().parent().find(".crfHeaderTabs");
	
	alltabs.each(function(i){
		if($(this).children().first().is(":visible"))
		{
			changetofirstshowtabs(this.id);
			return false;
		}
	});
}


/**
 * 下拉选择crf项进行切换
 * @param {Object} obj
 */
function changecrftab(obj)
{
	var index = obj.selectedIndex; // 选中索引
	var text = obj.options[index].text; // 选中值
	var value = obj.options[index].value; // 选中值
	changetofirstshowtabs("Tab"+index);
	
	//切换到当前crf显示数据
	selectcrftab("Tab"+index,value,text);
}

/**
 * 切换到中间一个要显示的tabid,然后根据该id,进行获取前一个和后一个。
 */
function changetofirstshowtabs(showtabid)
{
	
	$("#"+showtabid).parent().find(".crfHeaderTabs").each(function(){
			$(this).children().first().hide();
	});
		


		var showids = [showtabid];
		//获取上一个和下一个要显示的id
		var first = $("#"+showtabid).prev(".crfHeaderTabs");
		var next =  $("#"+showtabid).next(".crfHeaderTabs");
		if(first.size()>0)
			showids.push(first.attr("id"));
		if(next.size()>0)
			showids.push(next.attr("id"));
			
		for(var i=0;i<showids.length;i++)
		{
			$("#"+showids[i]).children().first().show();
		}
		
		
		//按锯可用检测
		if(next.next(".crfHeaderTabs").size()>0)
		{
			//说明后面还有，下一页按钮可用
			$("#TabsNext").show();
			$("#TabsNextDis").hide();
		}
		else
		{
			//按钮不可用
			$("#TabsNext").hide();
			$("#TabsNextDis").show();
		}
		
		
		if(first.prev(".crfHeaderTabs").size()>0)
		{
			//说明后面还有，下一页按钮可用
			$("#TabsBack").show();
			$("#TabsBackDis").hide();
		}
		else
		{
			//按钮不可用
			$("#TabsBack").hide();
			$("#TabsBackDis").show();
		}
}


/**
 * 选择指定的tab选项卡，并开始加载指定crf数据
 * tabid:切换选项卡的tabid值
 * section:标识唯一的sectionlabel值
 * sectiontitle:标识一个section的名字
 */
function selectcrftab(tabid,sectionlabel,sectiontitle)
{
	//切换选项卡前，先判断是否改变了数据，若数据已经改变，则给出提示，确认是否进行切换。
	if(getCRFEditIsChange()){
		 var r=confirm("您的crf数据已经修改，直接离开有可能导至数据丢失。您确定要离开吗？");
		 if (r==false)
	     {
			 return;
	     }
	}
	
	//同步下拉内的crf
	try
	{
		$("#crfsectionSelect").val(sectionlabel);
	}catch(e){}
	
	//第一步，隐藏原来所有的处于选择状诚下的tab页
	$(".crfHeaderTabs").each(function(){
		var classBGobj = $(this).children().first().children().first();
		var classLobj = classBGobj.children().first();
		var classRobj = classLobj.children().first();
		classBGobj.attr("class","tab_BG");
		classLobj.attr("class","tab_L");
		classRobj.attr("class","tab_R");
	});
	
	
	//设置当前的为选中状态
	var classBGobj = $("#"+tabid).children().first().children().first();
	var classLobj = classBGobj.children().first();
	var classRobj = classLobj.children().first();
	classBGobj.attr("class","tab_BG_h");
	classLobj.attr("class","tab_L_h");
	classRobj.attr("class","tab_R_h");
	
	//更改标题为当前的名字
	$(".aka_header_border").first().html('<b>标题:&nbsp;'+sectiontitle+'</b>');
	
	
	//加载指定的crf数据
	askcrfloadcrf(sectionlabel);
}
