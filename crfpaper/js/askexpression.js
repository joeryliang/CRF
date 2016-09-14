/**
 * 显示隐藏问题
 * 问题显示隐藏已经的问题的事件内完成了，本处仅用于控制空的Row行也设置为隐藏状诚
 */
var showhide = function(){
	$(".questioncontent>tbody>tr").each(function(i){
		//先恢复曾经隐藏的问题
		$(this).show();
		var qnum = $(this).find(".questionbody");
		if(qnum.size()>0)
		{
			var isblank = false;
			qnum.each(function(){
				if($(this).is(":visible"))
				{
					isblank= true;
					return;
				}
			});
			if(!isblank)
			{
				$(this).hide();
			}
		}
	});	
}



/**
 * 显示隐藏问题
 * @param {Object} itemname 问题的唯一标签
 * @param {Object} questiontype 问题的类型
 * @param {Object} operationquestion 操作的问题,格式如     XINBBIE|是|SHOW,NIANLING|否|HIDE
 */
function showhidequestion(itemname,questiontype,operationquestion){
	try{
		var temp = operationquestion.split(",");
		
		//当前问题选择的结果
		var selectresult = getresultbyquestiontype(questiontype,itemname);
			
		if(temp && temp.length>0)
		{
			for(var i=0;i<temp.length;i++)
			{
				try{
					if(temp[i] && temp[i].length>0)
					{
						var operation = temp[i].split("|");
						if(operation.length == 3)
						{
							operationexpression(operation[2],operation[0],operation[1] == selectresult);
						}
					}
				}catch(e){
					
				}
			}
		}
	}catch(e){}
	showhide();
}

/**
 * 操作执行
 * operation:动作,如 SHOW  HIDE
 * itemname:是在哪一个问题上执行的动作
 * contrastresult:对比结果，如果相等为true,否则为假，这里如果是真，则执行正项操作，否则执行反向操作
 */
function operationexpression(operation,itemname,contrastresult)
{
	switch(operation)
	{
		case "SHOW":
			if(contrastresult)
			{
				$("#"+itemname+"questionbody").css("display","block");
			}
			else
			{
				$("#"+itemname+"questionbody").css("display","none");
			}
		break;
		case "HIDE":
			if(contrastresult)
			{
				$("#"+itemname+"questionbody").hide();
			}
			else
			{
				$("#"+itemname+"questionbody").show();
			}
		break;
	}
}

/**
 * 获取结果,根据问题的类型
 * @param {Object} questiontype
 * @param {Object} itemname
 */
function  getresultbyquestiontype(questiontype,itemname)
{
	switch(questiontype)
	{
		case RESPONSETYPE.radio:
			return $('input[name="'+itemname+'"]:checked').val();
		break;
		default:
			return $("#"+this.itemName).val();
		break;
	}
}
