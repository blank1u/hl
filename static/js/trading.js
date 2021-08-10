$(function(){
	/*loadHeader();//加载头部
	loadFooter();//加载尾部*/
	// 控制手指变化
	setInterval(function(){
		$('.finger').addClass('cur_click');
		setTimeout(function(){
			$('.finger').removeClass('cur_click');
		},500);
	},4000);
	setInterval(function(){
		$('.wave img').addClass('imgScale');
		setTimeout(function(){
			$('.wave img').removeClass('imgScale');
		},1500);
	},4000);
	setTimeout(function(){
		$('.rotate_img img').removeClass('startImg').addClass('changeDongzuo');
	},3000)


	/*加载 Header*/
	/*function loadHeader() {
	    $(".header").load("./header.html", function (response, status) {
	        if (status != "success") {
	            console.log("引入 header.html 文件失败！");
	            return;
	        }
	    });
	}*/
	/*加载 Footer*/
	/*function loadFooter() {
	    $(".footer").load("./footer.html", function (response, status) {
	        if (status != "success") {
	            console.log("引入 footer.html 文件失败！");
	            return;
	        }
	    });
	}*/

	// 动态加载信封动画

	var animateFun = function(){
		setTimeout(function(){
			$('.email1').removeClass('email11')
			$('.email5').addClass('email51')
		},0);
		setTimeout(function(){
			$('.email5').removeClass('email51')
			$('.email4').addClass('email41')
		},6000);
		setTimeout(function(){
			$('.email4').removeClass('email41')
			$('.email3').addClass('email31')
		},12000);
		setTimeout(function(){
			$('.email3').removeClass('email31')
			$('.email2').addClass('email21')
		},16000);
		setTimeout(function(){
			$('.email2').removeClass('email21')
			$('.email1').addClass('email11')
		},19000);
	};
	animateFun();
	setInterval(function(){
		animateFun();
	},30000)
});