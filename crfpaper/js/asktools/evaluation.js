/**
 * 作者:赵亮
 * 时间:2016/8/11
 * 描述：该类用于测评结论计算，为测评结论的工具计算包。
 */

var evaluation  = {};
/**
 * 获取指定范围下的结果
 * @param {Object} range 范围，如 ">=1~<=34|0,>=35~<=39|2,>=40~<=44|5,>=45~<=49|7,>=50~<=54|8,>=55~<=59|10,>=60~<=64|11,>=65~<=69|13,>=70~<=74|14,>=75|15"; 说明区间使用 ~ 连接   结果使用|分隔，多项间使用, 分隔
 * @param {Object} value 当前要判断的值，如   8  
 * 找到的指定范围下的值,如果无法找到，则返回null值,如上示例应该返回0,因为8在  >=1~<=34范围内
 */
evaluation.getrangeresult = function(range,value)
{
	//选拆分出来所有的项
	var tempsplit = range.split(",");
	for(var i=0;i<tempsplit.length;i++)
	{
		var str = tempsplit[i];
		if(str.length>0)
		{
			//如果不是空项，则继续进行处理
			var keyvalue = str.split("|");
			if(keyvalue.length=2)
			{
				//双操作是正确的，否则说明参数语法错误，不进行处理。
				var options = keyvalue[0].split("~");//生成所有的操作判断项
				var myoptions = "";
				for(var j=0;j<options.length;j++)
				{
					myoptions+=value+options[j];
					if(j!=options.length-1)
					{
						myoptions+=" && ";
					}
				}
				
				var boolresult = eval(myoptions);
				if(boolresult)
				{
					return keyvalue[1];
				}
			}
		}
	}
	return null;
}


/**
 * 设置指定的问题为只读
 * @param {Object} labelname 问题的标签
 */
var setlabelreadonly = function(labelname){
	$("#"+labelname).attr("readonly","readonly");
	$("#"+labelname).css("background","#e1e3e2");
	
}


/**
 * 将指定的对象安全的转换为数字
 * @param {Object} value 要转换的对象
 * @param {Object} defaultvalue 转换失败后的默认值
 */
function safeint(value,defaultvalue)
{
	try{
		if(value)
		{
			return parseInt(value);
		}
		else
		{
			return defaultvalue;
		}
	}catch(e){
		return defaultvalue;
	}
}



/**
 * 将指定的对象安全的转换为符点数
 * @param {Object} value 要转换的对象
 * @param {Object} defaultvalue 转换失败后的默认值
 */
function safefloat(value,defaultvalue)
{
	try{
		if(value)
		{
			return parseFloat(value);
		}
		else
		{
			return defaultvalue;
		}
	}catch(e){
		return defaultvalue;
	}
}



/**
 * 转换为符点数并保留4位符点小数
 * @param x
 * @returns
 */
function safefloatget4(value,defaultvalue)  
{  
	var tempfloatvalue = safefloat(value,defaultvalue);
	return Math.round(tempfloatvalue*10000)/10000; 
}  