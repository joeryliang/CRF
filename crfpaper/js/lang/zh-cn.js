var crf = {};

crf.imagetitleunchange = "您的CRF数据没有改变";
crf.imagetitle = "数据已经修改，请注意保存。";




/**
 * 相关模板
 */
var crftemplate ={};


//必答题未答题模板前缀，可以为空，如 <ul>
crftemplate.checkmustanswertemplateprefix = "<ul>";
/**
 * 必答题未答时返回的模板内容
 * 如：<li>{error}</li>
 * 说明:{error}必需存在，用于存放错误信息
 */
crftemplate.checkmustanswertemplate = "<li>{error}</li>";
//必答题未答模板后缀，可以为空，如</ul>
crftemplate.checkmustanswertemplatesuffix = "</ul>";
