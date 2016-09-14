年龄：<script>
//年龄男性分值 男
var nianlingnan = ">=1~<=34|0,>=35~<=39|2,>=40~<=44|5,>=45~<=49|7,>=50~<=54|8,>=55~<=59|10,>=60~<=64|11,>=65~<=69|13,>=70~<=74|14,>=75|15";
//年龄女性分值 女
var nianlingnv = ">=1~<=34|0,>=35~<=39|2,>=40~<=44|4,>=45~<=49|5,>=50~<=54|7,>=55~<=59|8,>=60~<=64|9,>=65~<=69|10,>=70~<=74|11,>=75|12";
//高密度脂蛋白胆固醇 男
var gmdzfdbdgcnan = ">1.6|-2,>1.3~<=1.6|-1,>1.2~<=1.3|0,>0.9~<=1.2|1,<=0.9|2";
//高密度脂蛋白胆固醇女
var gmdzfdbdgcnv = ">1.6|-2,>1.3~<=1.6|-1,>1.2~<=1.3|0,>0.9~<=1.2|1,<=0.9|2";
//总胆固醇
var zdgcnan = "<4.1|0,>=4.1~<5.2|1,>=5.2~<6.2|2,>=6.2~<7.2|3,>=7.2|4";
var zdgcnv = "<4.1|0,>=4.1~<5.2|1,>=5.2~<6.2|3,>=6.2~<7.2|4,>=7.2|5";
//收缩压
//收缩压 男  未治疗
var sbpnanwzl="<120|-2,>=120~<=129|0,>=130~<=139|1,>=140~<=149|2,>=150~<=159|2,>=160|3";
var sbpnanyzl="<120|0,>=120~<=129|2,>=130~<=139|3,>=140~<=149|4,>=150~<=159|4,>=160|5";
//收缩压 女   未治疗
var sbpnvwzl="<120|-3,>=120~<=129|0,>=130~<=139|1,>=140~<=149|2,>=150~<=159|4,>=160|5";
var sbpnvyzl="<120|-1,>=120~<=129|2,>=130~<=139|3,>=140~<=149|5,>=150~<=159|6,>=160|7";
//是否吸烟
var isxynan="==2|0,==1|4";
var isxynv="==2|0,==1|3";

//是否患有糖尿病
var istjbnan="==2|0,==1|3";
var istjbnv="==2|0,==1|4";

//结论
var fxjlnan = "<=-3|<1,==-2|1.1,==-1|1.4,==0|1.6,==1|1.9,==2|2.3,==3|2.8,==4|3.3,==5|3.9,==6|4.7,==7|5.6,==8|6.7,==9|7.9,==10|9.4,==11|11.2,==12|13.3,==13|15.6,==14|18.4,==15|21.6,==16|25.3,==17|29.4,>=18|>30";
var fxjlnv = "<=-3|<1,==-2|<1,==-1|1.0,==0|1.2,==1|1.5,==2|1.7,==3|2.0,==4|2.4,==5|2.8,==6|3.3,==7|3.9,==8|4.5,==9|5.3,==10|6.3,==11|7.3,==12|8.6,==13|10.0,==14|11.7,==15|13.7,==16|15.9,==17|18.5,==18|21.5,==19|24.8,==20|27.5,>=21|>30";
</script>
性别：<script type="text/javascript" src="js/asktools/evaluation.js"></script>
<script>
jQuery(document).ready(function($)
{
	$("#imgBtnfxl").click(function(){
		var sectionlabel = "风险率";
		askcrf.getresult(sectionlabel);
		var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"nianling,xingbie,shousuoya,shifouzhiliao,shifouxiyan,shifouhuanyoutangniaobing,xinxueguanjibing");
		if(mustanswerresult.length > 0) {
			$("#errormsg").html(mustanswerresult);
			return;
		} else {
			$("#errormsg").html("");
		}
		
		
		//获取结果部分
		var nianling =  askcrf.getresultbylabel(sectionlabel,"nianling");
		var xingbie =  askcrf.getresultbylabel(sectionlabel,"xingbie");
		var zhidanbai =  askcrf.getresultbylabel(sectionlabel,"zhidanbai");
		var zongdanducun =  askcrf.getresultbylabel(sectionlabel,"zongdanducun");
		var shousuoya =  askcrf.getresultbylabel(sectionlabel,"shousuoya");
		var shifouzhiliao =  askcrf.getresultbylabel(sectionlabel,"shifouzhiliao");
		var shifouxiyan =  askcrf.getresultbylabel(sectionlabel,"shifouxiyan");
		var shifouhuanyoutangniaobing =  askcrf.getresultbylabel(sectionlabel,"shifouhuanyoutangniaobing");
		var xinxueguanjibing =  askcrf.getresultbylabel(sectionlabel,"xinxueguanjibing");
		
		
		//开始计算部分
		var totalscore = 0;
		var lastresult ;
		if(zhidanbai.length<=0)
		{
			zhidanbai = 1;
		}
		if(zongdanducun.length<=0)
		{
			zongdanducun = 4.1;
		}
		if(xingbie==1)
		{
			//男性
			totalscore+=safeint(evaluation.getrangeresult(nianlingnan,nianling),0);
			totalscore+=safeint(evaluation.getrangeresult(gmdzfdbdgcnan,zhidanbai),0);
			totalscore+=safeint(evaluation.getrangeresult(zdgcnan,zongdanducun),0);
			
			totalscore+=shifouzhiliao==2?safeint(evaluation.getrangeresult(sbpnanwzl,shousuoya),0):safeint(evaluation.getrangeresult(sbpnanyzl,shousuoya),0);
			
			
			totalscore+=safeint(evaluation.getrangeresult(isxynan,shifouxiyan),0);
			totalscore+=safeint(evaluation.getrangeresult(istjbnan,shifouhuanyoutangniaobing),0);
			//debugger;
			lastresult = evaluation.getrangeresult(fxjlnan,totalscore);
		}
		else
		{
			//女性
			totalscore+=safeint(evaluation.getrangeresult(nianlingnv,nianling),0);
			totalscore+=safeint(evaluation.getrangeresult(gmdzfdbdgcnv,zhidanbai),0);
			totalscore+=safeint(evaluation.getrangeresult(zdgcnv,zongdanducun),0);
			
			totalscore+=shifouzhiliao==2?safeint(evaluation.getrangeresult(sbpnvwzl,shousuoya),0):safeint(evaluation.getrangeresult(sbpnvyzl,shousuoya),0);
			
			
			totalscore+=safeint(evaluation.getrangeresult(isxynv,shifouxiyan),0);
			totalscore+=safeint(evaluation.getrangeresult(istjbnv,shifouhuanyoutangniaobing),0);
			
			lastresult = evaluation.getrangeresult(fxjlnv,totalscore);
			
		
		}
		
		if(lastresult)
		{
			if(xinxueguanjibing == 1)
			{
				//说明直系亲属患有该病，则风险率要乘以2
				if(lastresult.indexOf(">")>=0)
				{
					var tempjg  = safefloat(lastresult.replace(">",""),0);
					$("#jibingfengxianlv").val(">"+ (tempjg*2));
				}
				else if(lastresult.indexOf("<")>=0)
				{
					var tempjg  = safefloat(lastresult.replace("<",""),0);
					$("#jibingfengxianlv").val("<"+ (tempjg*2));
				}
				else
				{
					$("#jibingfengxianlv").val(safefloat(lastresult,0)*2);
				}
			}
			else
			{
				//没有，直接取结果
				$("#jibingfengxianlv").val(lastresult);
			}
		}
		else
		{
			alert("计算错误，请注意检查各输入项是否合法.");
		}

	});

})
</script>
高密度脂蛋白胆固醇(HDL-C)：<script type="text/javascript">
 jQuery(document).ready(function($)
 {
  setlabelreadonly("jibingfengxianlv");
  $("#xingbie,#zhidanbai,#zongdanducun,#shousuoya,#shifouzhiliao,#shifouxiyan,#shifouhuanyoutangniaobing,#xinxueguanjibing").change(function(){
   		$("#jibingfengxianlv").val("");
  });
  $("#nianling").change(function(){
	   $("#jibingfengxianlv").val("");
	   $("#zheruliang").val("");
	   $("#yundonghouxinlvfanwei").val("");
  });
 });
</script>
总胆固醇(HDL-C)：<script>
 jQuery(document).ready(function($)
 {
  askcrf.setquestionmaxvalue("nianling",200);
  askcrf.setquestionminvalue("nianling",1);
  
  
  askcrf.setquestionmaxvalue("zhidanbai",99);
  askcrf.setquestionminvalue("zhidanbai",0);
  
  askcrf.setquestionmaxvalue("zongdanducun",99);
  askcrf.setquestionminvalue("zongdanducun",0);
  
  askcrf.setquestionmaxvalue("shousuoya",999);
  askcrf.setquestionminvalue("shousuoya",60);
  
  askcrf.setquestionmaxvalue("shousuoya",999);
  askcrf.setquestionminvalue("shousuoya",60);
 });
</script>
收缩压(SBP)：
是否治疗：
是否吸烟：
是否患有糖尿病：
是否具有心血管疾病家族史，且直系亲属在60岁之前即患有该病？：
<span style="font-size:20px;">10年心血管疾病风险率：<span>
血压(A)：收缩压：<script>
 jQuery(document).ready(function($)
 {
  askcrf.setquestionmaxvalue("shuzhangya",999);
  askcrf.setquestionminvalue("shuzhangya",30);
  
  
  askcrf.setquestionmaxvalue("kongfuxuetang",99);
  askcrf.setquestionminvalue("kongfuxuetang",0);
  
  askcrf.setquestionmaxvalue("canhou2hxuetang",99);
  askcrf.setquestionminvalue("canhou2hxuetang",0);
  
  askcrf.setquestionmaxvalue("HbA1c",99);
  askcrf.setquestionminvalue("HbA1c",0);
  
  askcrf.setquestionmaxvalue("xuezhi",99);
  askcrf.setquestionminvalue("xuezhi",0);
  
  askcrf.setquestionmaxvalue("tg",99);
  askcrf.setquestionminvalue("tg",0);
  
  askcrf.setquestionmaxvalue("tizhong",999);
  askcrf.setquestionminvalue("tizhong",0);
  
  askcrf.setquestionmaxvalue("shengao",999);
  askcrf.setquestionminvalue("shengao",0);
  
  
  askcrf.setquestionmaxvalue("yundong",100);
  askcrf.setquestionminvalue("yundong",0);
  
  askcrf.setquestionmaxvalue("yundong",999);
  askcrf.setquestionminvalue("yundong",0);
  
  
 });
</script>
舒张压：<script type="text/javascript" src="js/asktools/evaluation.js"></script>
<script>
function huodongqiangdu(nl){
	 var backhuodongqiangduval =  $("#huodongqiangdu").val();
   if(nl>=60 && nl<80)
   {
    $("#huodongqiangdu option[value='4']").remove(); 
    if($("#huodongqiangdu option[value='3']").size()<=0)
    {
     //要看之前是否删除过重体力活动，如果删除过，则需要添加回来
     $("#huodongqiangdu").append("<option value='3'>中</option>");
    }
   }
   else if(nl>=80){
    $("#huodongqiangdu option[value='3']").remove();
    $("#huodongqiangdu option[value='4']").remove();
   }
   else
   {
    if($("#huodongqiangdu option[value='3']").size()<=0)
    {
     //要看之前是否删除过重体力活动，如果删除过，则需要添加回来
     $("#huodongqiangdu").append("<option value='3'>中</option>");
    }
    if($("#huodongqiangdu option[value='4']").size()<=0)
    {
     //要看之前是否删除过重体力活动，如果删除过，则需要添加回来
     $("#huodongqiangdu").append("<option value='4'>重</option>");
    }
   }
   //重新给活动强度赋值
    $("#huodongqiangdu").val(backhuodongqiangduval);
}
jQuery(document).ready(function($)
{
 //设置不可读
 setlabelreadonly("bmi");
 setlabelreadonly("yinshi");
 setlabelreadonly("zheruliang");
 setlabelreadonly("yundonghouxinlvfanwei");
 setlabelreadonly("fanganguanli");
 setlabelreadonly("xueya");
 
 huodongqiangdu($("#nianling").val());
 $("#nianling").change(function(){
  try{
   var nl = $("#nianling").val();
   //设置如果年龄大于60,不能进行重体力活动
   huodongqiangdu(nl);
  
   
  }catch(e){
   
  }
 });
 
 $("#shousuoya").change(function(){
  try{
   $("#xueya").val($("#shousuoya").val())
  }catch(e){
   
  }
 });
 
 //计算BMI
 $("#imgBtnBMI").click(function(){
  //===============================================//
  var sectionlabel = "风险评估";
  askcrf.getresult(sectionlabel);
  var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"tizhong,shengao");
  if(mustanswerresult.length > 0) {
   $("#errormsg").html(mustanswerresult);
   return;
  } else {
   $("#errormsg").html("");
  }
  //获取结果部分
  var tizhong =  askcrf.getresultbylabel(sectionlabel,"tizhong");
  var shengao =  askcrf.getresultbylabel(sectionlabel,"shengao");
  var BMI =tizhong/((shengao/100)*(shengao/100));
  $("#bmi").val(safefloatget4(BMI,0));
 });
 
 //计算BMR
 $("#imgBtnFoodBMR").click(function(){
  var sectionlabel = "风险率";
  askcrf.getresult(sectionlabel);
  var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"nianling,xingbie");
  if(mustanswerresult.length > 0) {
   $("#errormsg").html(mustanswerresult);
   return;
  } else {
   $("#errormsg").html("");
  }
  //获取结果部分
  var nianling =  askcrf.getresultbylabel(sectionlabel,"nianling");
  var xingbie =  askcrf.getresultbylabel(sectionlabel,"xingbie");
  //===============================================//
  sectionlabel = "风险评估";
  askcrf.getresult(sectionlabel);
  var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"tizhong,shengao");
  if(mustanswerresult.length > 0) {
   $("#errormsg").html(mustanswerresult);
   return;
  } else {
   $("#errormsg").html("");
  }
  //获取结果部分
  var tizhong =  askcrf.getresultbylabel(sectionlabel,"tizhong");
  var shengao =  askcrf.getresultbylabel(sectionlabel,"shengao");
 
  var BMR = 0;
  if(xingbie==1)
  {
   //男性
   BMR = 66.4730+13.570*safeint(tizhong,0)+5.0033*safeint(shengao,0)-6.7550*safeint(nianling,0);
  }
  else{
   //女性
   BMR = 655.0955+9.463*safeint(tizhong,0)+1.8496*safeint(shengao,0)-4.6756*safeint(nianling,0);
  }
  $("#yinshi").val(safefloatget4(BMR,0));
 });
});
</script>
血糖(B):空腹血糖<script>
jQuery(document).ready(function($)
{
 //计算能量推荐摄入量
 $("#imgBtnTJSRL").click(function(){
  var sectionlabel = "风险率";
  askcrf.getresult(sectionlabel);
  var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"nianling,xingbie");
  if(mustanswerresult.length > 0) {
   $("#errormsg").html(mustanswerresult);
   return;
  } else {
   $("#errormsg").html("");
  }
  //获取结果部分
  var nianling =  askcrf.getresultbylabel(sectionlabel,"nianling");
  var xingbie =  askcrf.getresultbylabel(sectionlabel,"xingbie");
  
  
  
  //===============================================//
  sectionlabel = "风险评估";
  askcrf.getresult(sectionlabel);
  var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"huodongqiangdu,yinshi");
  if(mustanswerresult.length > 0) {
   $("#errormsg").html(mustanswerresult);
   return;
  } else {
   $("#errormsg").html("");
  }
  
  //获取结果部分
  var huodongqiangdu =  askcrf.getresultbylabel(sectionlabel,"huodongqiangdu");
  var yinshi =  askcrf.getresultbylabel(sectionlabel,"yinshi");
  var bmi =  askcrf.getresultbylabel(sectionlabel,"bmi");
   
  var PAL=0;
  
  if(nianling<60 && xingbie==1 && huodongqiangdu==2)
  {
   PAL=1.55;
  }
  else if(nianling<60 && xingbie==1 && huodongqiangdu==3)
  {
   PAL=1.78;
  }
  else if(nianling<60 && xingbie==1 && huodongqiangdu==4)
  {
   PAL=2.10;
  }
  else if(nianling<60 && xingbie==2 && huodongqiangdu==2)
  {
   PAL=1.56;
  }
  else if(nianling<60 && xingbie==2 && huodongqiangdu==3)
  {
   PAL=1.64;
  }
  else if(nianling<60 && xingbie==2 && huodongqiangdu==4)
  {
   PAL=1.82;
  }
  else if(nianling>=60 && nianling<70  && xingbie==1 && huodongqiangdu==2)
  {
   PAL=1.53;
  }
  else if(nianling>=60 && nianling<70  && xingbie==1 && huodongqiangdu==3)
  {
   PAL=1.66;
  }
  else if(nianling>=60 && nianling<70  && xingbie==2 && huodongqiangdu==2)
  {
   PAL=1.54;
  }
  else if(nianling>=60 && nianling<70  && xingbie==2 && huodongqiangdu==3)
  {
   PAL=1.64;
  }
  
  else if(nianling>=70 && nianling<80  && xingbie==1 && huodongqiangdu==2)
  {
   PAL=1.51;
  }
  else if(nianling>=70 && nianling<80  && xingbie==1 && huodongqiangdu==3)
  {
   PAL=1.64;
  }
  else if(nianling>=70 && nianling<80  && xingbie==2 && huodongqiangdu==2)
  {
   PAL=1.51;
  }
  else if(nianling>=70 && nianling<80  && xingbie==2 && huodongqiangdu==3)
  {
   PAL=1.62;
  }
  
  else if(nianling>=80  && xingbie==1 && huodongqiangdu==2)
  {
   PAL=1.49;
  }
  else if(nianling>=80  && xingbie==2 && huodongqiangdu==2)
  {
   PAL=1.49;
  }
  var TJNLSR = PAL*safefloat(yinshi,0); //推荐能量摄入
  
   if(safefloatget4(bmi)>=24)
  {
  	TJNLSR = safefloatget4(TJNLSR,0)-100;
  }
  
  
  $("#zheruliang").val(safefloatget4(TJNLSR,0));
 });
});
</script>
餐后2h血糖：<script>
jQuery(document).ready(function($)
{
 //运动后心率范围
 $("#imgBtnydhxlfw").click(function(){
  var sectionlabel = "风险率";
  askcrf.getresult(sectionlabel);
  var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"nianling");
  if(mustanswerresult.length > 0) {
   $("#errormsg").html(mustanswerresult);
   return;
  } else {
   $("#errormsg").html("");
  }
  //获取结果部分
  var nianling =  askcrf.getresultbylabel(sectionlabel,"nianling");
  
  var xinludixian = (220-safeint(nianling,0))*0.5;
  var xinlugaoxian = (220-safeint(nianling,0))*0.85;
  $("#yundonghouxinlvfanwei").val(safefloatget4(xinludixian,0)+"~"+safefloatget4(xinlugaoxian,0));
 });
});
</script>
HbA1c：<script>
	function getA(xueya,shuzhangya,nianling){
	var A="";
	if(xueya && xueya.length>0 && shuzhangya && shuzhangya.length>0)
		{
			if(xueya>=160 || shuzhangya>=100)
				A="A3";
			else if((nianling>=70 && xueya>=150 && xueya<160) || (nianling<70 && xueya>=140 && xueya<160) || (shuzhangya>=90 && shuzhangya<100) )
				A="A2";
			else if((nianling>=70 && xueya>=120 && xueya<150) || (nianling<70 && xueya>=120 && xueya<140) || (shuzhangya>=80 && shuzhangya<90) )
				A="A1";
			else if(xueya<120 || shuzhangya<80)
				A = "A0";
		}
		else if(xueya && xueya.length>0){
			if(xueya>=160)
				A="A3";
			else if((nianling>=70 && xueya>=150 && xueya<160) || (nianling<70 && xueya>=140 && xueya<160))
				A="A2";
			else if((nianling>=70 && xueya>=120 && xueya<150) || (nianling<70 && xueya>=120 && xueya<140))
				A="A1";
			else if(xueya<120)
				A = "A0";
		}
		return A;
}

function getB(kongfuxuetang,canhou2hxuetang){
		var B = "";
	
		if(kongfuxuetang.length<=0 && canhou2hxuetang.length<=0)
		{
			return "BX";
		}
		if(kongfuxuetang && kongfuxuetang.length>0 && canhou2hxuetang && canhou2hxuetang.length>0)
		{
			if(kongfuxuetang>=10 || kongfuxuetang<=3.9 || canhou2hxuetang>=16.7 || canhou2hxuetang<=3.9)
				B="B3";
			else if((kongfuxuetang>=7.0 && kongfuxuetang<10) || (canhou2hxuetang>=11.1 && canhou2hxuetang<16.7))
				B="B2";
			else if((kongfuxuetang>=6.1 && kongfuxuetang<7.0) || (canhou2hxuetang>=7.8 && canhou2hxuetang<11.1))
				B="B1";
			else
				B="B0";
		}
		else if(kongfuxuetang && kongfuxuetang.length>0)
		{
			if(kongfuxuetang>=10 || kongfuxuetang<=3.9)
				B="B3";
			else if((kongfuxuetang>=7.0 && kongfuxuetang<10) )
				B="B2";
			else if((kongfuxuetang>=6.1 && kongfuxuetang<7.0))
				B="B1";
			else
				B="B0";
		}
		else if(canhou2hxuetang && canhou2hxuetang.length>0)
		{
			if(canhou2hxuetang>=16.7 || canhou2hxuetang<=3.9)
				B="B3";
			else if((canhou2hxuetang>=11.1 && canhou2hxuetang<16.7))
				B="B2";
			else if((canhou2hxuetang>=7.8 && canhou2hxuetang<11.1))
				B="B1";
			else
				B="B0";
		}
		return B;
}
</script>
血脂(C)：LDL-C：<script>
jQuery(document).ready(function($)
{
		//更改后清空相应的计算结果
	$("#nianling,#shousuoya,#xueya,#shuzhangya,#kongfuxuetang,#canhou2hxuetang,#xuezhi,#bmi,#zheruliang,#xinlvshichang,#yundong").change(function(){
		$("#fanganguanli").val("");
	});
	
	//方案管理最终结果计算
	$("#imgBtnfagl").click(function(){
		sectionlabel = "风险评估";
		askcrf.getresult(sectionlabel);
		var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"xueya,xuezhi,tg,tizhong,shengao,bmi,yinshi,huodongqiangdu,zheruliang,yundong,tizhong,xinlvshichang,yundonghouxinlvfanwei");
		
//		mustanswerresult+=askcrf.checkmustanswerbynum("kongfuxuetang,canhou2hxuetang",1);
		if(mustanswerresult.length > 0) {
			$("#errormsg").html(mustanswerresult);
			return;
		} else {
			$("#errormsg").html("");
		}
		
		var xueya =  askcrf.getresultbylabel(sectionlabel,"xueya");
		var shuzhangya =  askcrf.getresultbylabel(sectionlabel,"shuzhangya");
		var kongfuxuetang =  askcrf.getresultbylabel(sectionlabel,"kongfuxuetang");
		var canhou2hxuetang =  askcrf.getresultbylabel(sectionlabel,"canhou2hxuetang");
		var HbA1c =  askcrf.getresultbylabel(sectionlabel,"HbA1c");
		var xuezhi =  askcrf.getresultbylabel(sectionlabel,"xuezhi");
		var tg =  askcrf.getresultbylabel(sectionlabel,"tg");
		var tizhong =  askcrf.getresultbylabel(sectionlabel,"tizhong");
		var shengao =  askcrf.getresultbylabel(sectionlabel,"shengao");
		var bmi =  askcrf.getresultbylabel(sectionlabel,"bmi");
		var yinshi =  askcrf.getresultbylabel(sectionlabel,"yinshi");
		var huodongqiangdu =  askcrf.getresultbylabel(sectionlabel,"huodongqiangdu");
		var zheruliang =  askcrf.getresultbylabel(sectionlabel,"zheruliang");
		var yundong =  askcrf.getresultbylabel(sectionlabel,"yundong");
		var tizhong =  askcrf.getresultbylabel(sectionlabel,"tizhong");
		var xinlvshichang =  askcrf.getresultbylabel(sectionlabel,"xinlvshichang");
		var yundonghouxinlvfanwei =  askcrf.getresultbylabel(sectionlabel,"yundonghouxinlvfanwei");
		var xingongneng =  askcrf.getresultbylabel(sectionlabel,"xingongneng");
		
		
		
		var sectionlabel = "风险率";
		askcrf.getresult(sectionlabel);
		var mustanswerresult = askcrf.checkmustanswer(sectionlabel,"nianling");
		if(mustanswerresult.length > 0) {
			$("#errormsg").html(mustanswerresult);
			return;
		} else {
			$("#errormsg").html("");
		}
		//获取结果部分
		var nianling =  askcrf.getresultbylabel(sectionlabel,"nianling");

		var A = getA(xueya,shuzhangya,nianling);

		var B = getB(kongfuxuetang,canhou2hxuetang);
		
		var C="";
		
		
		if(xuezhi.length<=0 && tg.length<=0)
			C="CX";
		else if(xuezhi>=3.37 || tg>=5.65)
			C="C3";
		else if(xuezhi>=2.59 && xuezhi<3.37)
			C="C2";
		else if(xuezhi>=1.80 && xuezhi<2.59)
			C="C1";
		else
			C="C0";
		
		var dbmi = ">=0~<24|D0,>=24~<28|D1,>=28~<32|D2,>=32|D3";
		var D="D0";
		if(nianling>=70)
		{
			D="D0";
		}
		else
		{
			D=evaluation.getrangeresult(dbmi,bmi);
		}
		var xkcal = "<=1700|X1,>1700~<=1900|X2,>1900~<=2100|X3,>2100~<=2300|X4,>2300~<=2500|X5,>2500~<=2700|X6,>2700~<=2900|X7,>2900~<=3100|X8,>3100~<=3300|X9,>3300|X10";
		var X = evaluation.getrangeresult(xkcal,zheruliang);
		
		
		var Y="";
		if(xinlvshichang==4 || yundong<40 || xingongneng == 3 || xingongneng == 4)
			Y="Y3";
		else if(xingongneng == 2 || (yundong>=40 && yundong<=49))
			Y="Y2";
		else
		{
			Y="Y1";
		}
		$("#fanganguanli").val(A+B+C+D+X+Y);
	});

});
</script>
TG：
体重(D)：体重：
身高：
BMI
饮食(X)：BMR：
活动强度：
能量推荐摄入量：
运动(Y)：左心室射血分数：
心律失常：
运动后心率范围：
<span style="font-size:20px;">方案管理：<span>
标题<script>
jQuery(document).ready(function($){
	$("#usertitle").css({"width":"500px"});
	$("#usercontent").css({"width":"500px","height":"400px"});
});
</script>
内容
心功能