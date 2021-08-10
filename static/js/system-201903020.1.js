var System = function () {
	var i =1;
}

System.prototype.init = function () {
	this.validateImage = $('.validateImage');
}



System.prototype.validateImageFn = function () {
	var _fater_this = this;
	_fater_this.validateImage.click(function () {
		var _this = $(this);
		_this.attr('src',_this.data('image_url')+'&'+Math.random());
	});
}

/**
 * 同步模式AJAX提交
 */
System.prototype.ajax_post_setup = function ($url,$data,$type) {
	$type = $type || 'JSON';
    $.ajaxSetup({
		async: false//async:false 同步请求  true为异步请求
	});
	var result = false;
	//提交的地址，post传入的参数
	$.post($url,$data,function(content){
		result = content;
	},$type);
	
	return result;
}


/**
 * @desc 判断数组内是否包含字符串
 * @param str
 * @param arr
 * @returns {boolean}
 */
System.prototype.in_array = function (str, arr) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === str) {
            return true;
        }
    }
    return false;
}


/**
 * 格式化日期，成时间戳
 * @param {Object} $date_string 2013-10-10 12:13
 * return 111111111111
 */
System.prototype.fomat_date_bak = function ($date_string) {
	if ($date_string == '') {
		return 0;
	} else {
		return Date.parse($date_string.replace(/-/ig,'/'));
	}
}

/**
 * 格式化日期，成时间戳
 * @param {Object} $date_string 2013-10-10 12:13
 * return 111111111111
 */
System.prototype.fomat_date = function ($date_string) {
	//var string_date = $date_string.replace(/-/ig,'/');
	var string_date = $date_string;
	
	var arr_date =  string_date.split(' ');
	//年月日
	var arr_Year_Month_Date = arr_date[0].split('-');
	//时分秒
	var arr_Hours_Minutes_Seconds = arr_date[1].split(':');
	
	var Year,Month,DateNum,Hours,Minutes,Seconds;
	Year = arr_Year_Month_Date[0];
	Month = arr_Year_Month_Date[1];
	DateNum = arr_Year_Month_Date[2];
	Hours = arr_Hours_Minutes_Seconds[0];
	Minutes = arr_Hours_Minutes_Seconds[1];
	Seconds = arr_Hours_Minutes_Seconds[2];
	
	var obj_date = new Date();
	
	//日月年
	obj_date.setFullYear(Year);
	obj_date.setMonth(Month);
	obj_date.setDate(DateNum);
	
	//时分秒
	obj_date.setHours(Hours);
	obj_date.setMinutes(Minutes);
	obj_date.setSeconds(Seconds);
	obj_date.setMilliseconds(0);//毫秒
	
	//var now_date = obj_date.getFullYear()+'-'+(obj_date.getMonth())+'-'+obj_date.getDate()+' '+obj_date.getHours()+':'+obj_date.getMinutes()+':'+obj_date.getSeconds();
	return obj_date.getTime();
}


System.prototype.create_num_for_length = function ($number,$length) {
	
	var temp = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
	var resutl = $number+''+temp.substr(0,$length);
	
	return resutl;
}


/**
 * 根据微博名称，获取微博URL
 */
System.prototype.getUrlInfo = function () {
	var _fater_this = this; 
	var weibo_account_name_Obj = $('.weibo_account_name_Obj');
	
	weibo_account_name_Obj.click(function () {
		var _this = $(this);
		var account_name =  _this.data('account_name');
		var type = _this.data('type');
		
		if(type == 1)
		{
			var result = _fater_this.ajax_post_setup('/Advert/Weibo/getWeiboUrl',{'account':account_name, 'type': type});
			if (result.status == 0) {
				window.open(result.data);
			}
		} else {
			window.open('http://t.qq.com/'+ account_name);	 
		}
		
	});
}

System.prototype.goToUrl = function () {
	var _fater_this = this; 
	
	var go_to_url = $('.go_to_url');
	
	go_to_url.click(function () {
		var _this = $(this);
		var is_new_window = _this.data('is_new_window');
		var url = _this.data('url');
		if (is_new_window == 1) {
			window.open(url);	
		} else {
			window.location.href = url;
		}
	});
}


/**
根据时间错获取日期
*/
System.prototype.get_date_by_timestamp = function  (timestamp) {
  var date;
  if (timestamp != undefined) {
    date = new Date(timestamp);		//返回当前时间。如果传入毫秒数，则返回毫秒数格式化的日期
  } else {
    date = new Date();
  }

  date.getFullYear();			//取得日期年份
  date.getMonth()+1;			//取得日期月份
  date.getDate();				//获取日期天

  date.getHours();			//时
  date.getMinutes();			//分
  date.getSeconds();  		//秒

  date.toLocaleDateString();     //获取当前日期
  date.toLocaleTimeString();     //获取当前时间
  date.toLocaleString();        //获取日期与时间
  
  var now_date = date.getFullYear()+'-'+(date.getMonth())+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
  return now_date;
}

System.prototype.run = function () {
	var _fater_this = this;
	_fater_this.validateImageFn();
	
	_fater_this.getUrlInfo();
	
	_fater_this.goToUrl();
}


var System = new System();

window.onload = function () {

	System.init();
	System.run();
}
function wpa_qq(custype){
	if(custype==2){//苏倩晴
    //     window.open('http://wpa.qq.com/msgrd?v=3&uin=3001391422&site=qq&menu=yes');
    //}else if(custype==2){//陈琛
        window.open('http://wpa.qq.com/msgrd?v=3&uin=2850411010&site=qq&menu=yes');
    }else if(custype==3){//方海强
        window.open('http://wpa.qq.com/msgrd?v=3&uin=2853899534&site=qq&menu=yes');
    }else if(custype==4){//符总
        window.open('http://wpa.qq.com/msgrd?v=3&uin=2850387068&site=qq&menu=yes');
    }else if(custype==5){//李永盛
        window.open('http://wpa.qq.com/msgrd?v=3&uin=2853150228&site=qq&menu=yes');
    // }else if(custype==6){//陈琛
    //     window.open('http://wpa.qq.com/msgrd?v=3&uin=3001391422&site=qq&menu=yes');
    }else if(custype==7){//姚青松
        window.open('http://wpa.qq.com/msgrd?v=3&uin=2850387061&site=qq&menu=yes');
    }else if(custype>10){//自定义
        window.open('http://wpa.qq.com/msgrd?v=3&uin='+custype+'&site=qq&menu=yes');
    }else{//营销qq
        window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA1MjA0OV8zODExODJfNDAwNjg3NjMwOF8yXw', '_blank', 'height=292,width=463,location=no,toolbar=no,scrollbars=no,menubar=no,status=no');
	}
}


