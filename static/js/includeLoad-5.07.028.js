// tabs plugin start eg：$('*').createTab();
;
(function(window, $, undefined) {
    $.fn.createTab = function(opt) {
        var tab = {
            mouseOver: 'mouseover',
            elemClass: 'cur'
        };
        $.extend(tab, opt);
        this.each(function() {
            var $this = $(this); //$this代表初始化该插件的html标签
            var timer;
            $this.find('ul.tabs-title li').mouseover(tab.mouseOver, function() {
                var index = $(this).index(), //获得li标签的idnex，为.list下的.tabCon匹配相对应的index
                    that = $(this); //that代表鼠标经过时的li标签
                timer = setTimeout(function() {
                    that.addClass('cur').siblings().removeClass('cur');
                    $this.next(".list").find('.tabCon').eq(index).show().siblings().hide();
                }, 40);
            }).mouseout(function() {
                clearTimeout(timer); //鼠标离开后，清除计时器
            });
        });
    }
})(window, jQuery);
// tabs plugin end
// slider plugin start
;
(function($) {
    $.fn.slider = function(options) {
        return this.each(function() {
            var _slider = $('.slider');
            var _sliderBox = $('.slider-box');
            var sliderBoxHeight = _sliderBox.height();
            var mouseOver = 'mouseover';
            var mouseOut = 'mouseout';
            var sliderClick = 'click';
            var sliderLi = 'li';
            var _cirBox = '.cir-box';
            var cirOn = 'cir-on';
            var _cirOn = '.cir-on';
            var cirLength = _sliderBox.children(sliderLi).length; // 小按钮和图片的数量
            var sliderTime = 5000; //轮播时间
            var switchTime = 400; //图片切换时间
            cir();
            // 根据图片的数量产生底部按钮
            function cir() {
                // 两张图片以上才显示底部圆点
                if (cirLength > 1) {
                    _slider.append('<ul class="cir-box"></ul>');
                    var cirBox = $('.cir-box');
                    for (var i = 0; i < cirLength; i++) {
                        cirBox.append('<li class="slider-small" value="' + i + '"></li>');
                    }
                    var cirDss = cirBox.width();
                    cirBox.css({
                        left: '50%',
                        marginLeft: -cirDss / 2,
                        bottom: 20
                    });
                    cirBox.children(sliderLi).eq(0).addClass(cirOn);
                }
            }
            var int = setInterval(clock, sliderTime);

            function clock() {
                var cirBox = $(_cirBox);
                var onLen = $(_cirOn).val();
                _sliderBox.children(sliderLi).eq(onLen).stop(false, false).hide();
                _sliderBox.children(sliderLi).eq(onLen).find('img').stop(false, false).hide();
                if (onLen == cirLength - 1) {
                    onLen = -1;
                }
                _sliderBox.children(sliderLi).eq(onLen + 1).stop(false, false).show();
                _sliderBox.children(sliderLi).eq(onLen + 1).find('img').stop(false, false).show();
                cirBox.children(sliderLi).eq(onLen + 1).addClass(cirOn).siblings().removeClass(cirOn);
            }
            // 鼠标在图片上 关闭定时器
            _slider.bind(mouseOver, function() {
                clearInterval(int);
            });
            _slider.bind(mouseOut, function() {
                int = setInterval(clock, sliderTime);
            });
            // 鼠标划过圆点 切换图片
            $(_cirBox).children(sliderLi).bind(mouseOver, function() {
                var _index = $(this).index();
                $(this).addClass(cirOn).siblings().removeClass(cirOn);
                _sliderBox.children(sliderLi).hide();
                _sliderBox.children(sliderLi).find('img').hide();
                _sliderBox.children(sliderLi).eq(_index).show();
                _sliderBox.children(sliderLi).eq(_index).find('img').show();
            });
        });
    }
})(jQuery);
// slider plugin end
// popwin plugin start
var popWin = {
    scrolling: 'no',
    //是否显示滚动条 no,yes,auto
    int: function() {
        this.mouseClose();
        this.closeMask();
    },

    showWin: function(width, height, title, src) {
        var iframeHeight = height - 52;
        var marginLeft = width / 2;
        var marginTop = height / 2;
        var inntHtml = '';
        inntHtml += '<div id="mask" style="width:100%; height:100%; position:fixed; top:0; left:0; z-inde:1999;background:#cccccc; filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity:0.5;"></div>'
        inntHtml += '<div id="maskTop" style="width: ' + width + 'px; height: ' + height + 'px; border: #999999 1px solid; background: #fff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -' + marginLeft + 'px; margin-top: -' + marginTop + 'px; z-index: 2999; filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4); -moz-box-shadow: 2px 2px 10px #909090; -webkit-box-shadow: 2px 2px 10px #909090; box-shadow: 2px 2px 10px #909090;">'
        inntHtml += '<div id="maskTitle" style="height: 50px; line-height: 50px; font-family: Microsoft Yahei; font-size: 20px; color: #333333; padding-left: 20px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAyCAYAAABlG0p9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABvSURBVEhL1cq5DcAwDENR7T+sL9lOOoUbkCoCwwKewOJbiGe+31BkwgeDM18YgrPhxuBs4CkS4cQQZMKFwd0R+gzFJaFjcD+EfXgoMuHA4O4Iew/FJWHD4BJhwxDoYcNTIKwY3NGwYggQFgxODEt8xO1/6P+HHxEAAAAASUVORK5CYII=); border-bottom: 1px solid #999999; position: relative;">'
        inntHtml += '' + title + ''
        inntHtml += '<div id="popWinClose" style="width: 28px; height: 28px; cursor: pointer; position: absolute; top: -12px; right: -9px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJeSURBVEhLvZbPq2lRFMf9B4bSTTIxZiBSMlCI9ycoKX+Bod7w/il3YIL4NyhFmYmBKD2Sp0ix3vqes/e529n74t33Op9astevr3PO2tvxvcLtdquzfbAtyAV8IlYX6d+DG7yxvbP9Fr2fglxR8ybavAYX/GD7Jfr8NahFD9HuMZz4U9Q5jEYjqlarFA6HiVPuDD7EkOMGvTjna9xi8/mcstmsJvKVIRc1Kl+K4haIHItut0t+v9/Y+JGhBrUq6M2xT9iBAXGeGQrY/U+miqI3NNhvw4t3EbNuyXeuzG3ood5eaLDfhhfO6JueWbPZtGKFQkGLNRoN2u/3FI/HtRh6SaDBPkusLnzWpMlkaRC7XC5WfLVaUTqddmKVSoVOp5MVG4/HlEql7mph6vRCC4IfYm2Nt7vAzW63o2KxSLVaja7Xq/DatFotrR49JdCCoHNcmfZZPp+n9XotMmxwVVwnVjbD4ZAikYhWj54SaN1dgjtZWiaToe12K7J0JpOJUUyaykuCsFwuR8fjUWR+slgsKBAIGGukqbwsiGdmElwul5RIJIw10lReEsQ0ns9nkaVzOBys226qhak8HRrsM7ktJLPZjDabjVjZYLBKpZJWrw0NfzzcFvj1KtPp1HpmsVjM2iIq/X5fqzdti4cbHycINjUYDAYUCoWcGA4BHAag1+tRMBi8q4VpGx/wl4dHWzKZpHa7TdFoVIuVy2XqdDrGSTUebYAXnh/e3v49AXZ49wcs4YB3rxgStyjApGG8TfsUPsTUaZQ8FZPgFrB585oo4QLvXoTdcIP/9Krv8/0BDUSOirKWU6wAAAAASUVORK5CYII=);"></div>'
        inntHtml += '</div>'
        inntHtml += '<iframe width="' + width + '" height="' + iframeHeight + '" frameborder="0" scrolling="' + this.scrolling + '" src="' + src + '"></iframe>';
        $("body").append(inntHtml);
        this.int();
    },
    mouseClose: function() {
        $("#popWinClose").on('mouseenter',
            function() {
                $(this).css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJwSURBVEhLvZbLSiNBFIb7DVyKiIgb17oQRRAXgor6CIIIeQKXMksfxYUbFbMZRh0Yb6ODMgEddCVmoWkRLzFekukxfay/+lRbqSqTVob+4CyqzuVPV59TaS8JYRhmhM0Ly5MB9tiX4fDPIQq0CpsT9sC1G4JYzmnlMskQCRPCrrnOh0EuanC5+ojAL5wXc5/LUW5qitba2ynreTWGPfgQY4JaXNaNKfZ0dkY7g4OWyHuGWOTovCuKI+AYib+8TF+bmpyF6xlykKuD2iwTITbQIPE7Q4Kr2EdMF0VtaLCcFJxjnzySzzyZaaihHy80WE4Kxq3vemcns7PStzsyYvn+zMxQUCzSRne35UMtBTSUWIb3ZKeZSRCrBoH0lwsF2u7vj32/JyepWi5L3/3hIW319dXkwvTuhRYE53kt29tMMAlub2lvdJRy09MUVqu8G3GxsGDlo6YCWhCMryvXnO0OD1PF9zkiQj5VGPIqonhwQOsdHVY+aiqgVfMIZrCy7YEBCm5uOMqmdHTkFFOmk0gQ9nNoiF4eHznyjed8nr41NztzlOkkFsQ7cwmWz89ps6fHmaNMJ5Gg7MZKhaNs/pVK8thduTCdhk2DOVNjoXg6PaW/V1e8ikBj7Y2NWflW06BVee0cC/x6nYfjY/nOfnR1yRHRucxmrXzXWNQdfNwgGGpwt79Pa21tsQ+XAC4D4K+s0GpLS00uzBp8vm3qXm1bvb1UWFyk752dlu/X+Dj5S0vOTnVebUAsUr+80/17AmIjvT9ghXCk94mhMEUBOg3t7ZpT7MGnd6OioZgCRyAsnc9EhUhI70PYRBT4T5/6nvcKYG1hElXAZggAAAAASUVORK5CYII=)");

            });
        $("#popWinClose").on('mouseleave',
            function() {
                $(this).css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJeSURBVEhLvZbPq2lRFMf9B4bSTTIxZiBSMlCI9ycoKX+Bod7w/il3YIL4NyhFmYmBKD2Sp0ix3vqes/e529n74t33Op9astevr3PO2tvxvcLtdquzfbAtyAV8IlYX6d+DG7yxvbP9Fr2fglxR8ybavAYX/GD7Jfr8NahFD9HuMZz4U9Q5jEYjqlarFA6HiVPuDD7EkOMGvTjna9xi8/mcstmsJvKVIRc1Kl+K4haIHItut0t+v9/Y+JGhBrUq6M2xT9iBAXGeGQrY/U+miqI3NNhvw4t3EbNuyXeuzG3ood5eaLDfhhfO6JueWbPZtGKFQkGLNRoN2u/3FI/HtRh6SaDBPkusLnzWpMlkaRC7XC5WfLVaUTqddmKVSoVOp5MVG4/HlEql7mph6vRCC4IfYm2Nt7vAzW63o2KxSLVaja7Xq/DatFotrR49JdCCoHNcmfZZPp+n9XotMmxwVVwnVjbD4ZAikYhWj54SaN1dgjtZWiaToe12K7J0JpOJUUyaykuCsFwuR8fjUWR+slgsKBAIGGukqbwsiGdmElwul5RIJIw10lReEsQ0ns9nkaVzOBys226qhak8HRrsM7ktJLPZjDabjVjZYLBKpZJWrw0NfzzcFvj1KtPp1HpmsVjM2iIq/X5fqzdti4cbHycINjUYDAYUCoWcGA4BHAag1+tRMBi8q4VpGx/wl4dHWzKZpHa7TdFoVIuVy2XqdDrGSTUebYAXnh/e3v49AXZ49wcs4YB3rxgStyjApGG8TfsUPsTUaZQ8FZPgFrB585oo4QLvXoTdcIP/9Krv8/0BDUSOirKWU6wAAAAASUVORK5CYII=)");
            });
    },
    closeMask: function() {
        $("#popWinClose").on('click', function() {
            $("#mask,#maskTop").fadeOut(function() {
                $(this).remove();
            });
        });
    }
};
// popwin plugin end
// lazyload plugin start
(function($, window, document, undefined) {
    var $window = $(window);
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            data_attribute: "original",
            skip_invisible: false,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {} else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });
        }
        if (options) {
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }
            $.extend(settings, options);
        }
        $container = (settings.container === undefined ||
            settings.container === window) ? $window : $(settings.container);
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }
        this.each(function() {
            var self = this;
            var $self = $(self);
            self.loaded = false;
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);
                            self.loaded = true;
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);
                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });
        $window.bind("resize", function() {
            update();
        });
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }
        $(document).ready(function() {
            update();
        });
        return this;
    };
    $.belowthefold = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };
    $.leftofbegin = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    $.extend($.expr[":"], {
        "below-the-fold": function(a) {
            return $.belowthefold(a, { threshold: 0 }); },
        "above-the-top": function(a) {
            return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-screen": function(a) {
            return $.rightoffold(a, { threshold: 0 }); },
        "left-of-screen": function(a) {
            return !$.rightoffold(a, { threshold: 0 }); },
        "in-viewport": function(a) {
            return $.inviewport(a, { threshold: 0 }); },
        "above-the-fold": function(a) {
            return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-fold": function(a) {
            return $.rightoffold(a, { threshold: 0 }); },
        "left-of-fold": function(a) {
            return !$.rightoffold(a, { threshold: 0 }); }
    });
})(jQuery, window, document);
// lazyload plugin end

var article = new Array();
var wechat = new Array();
var wechatAttr = new Array();
var friend = new Array();
var weibo = new Array();
var live = new Array();
var video = new Array();

function initEffect() {
    // 初始化幻灯片
    $(".slider").slider({});
    // 初始化选项卡
    $(".tabs-nav, .tabs").createTab();
    // 导航栏选中时的状态
    $("#shouye, #ruanwen, #weixin, #pengyouquan, #weibo").click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 显示侧边栏
    $(window).scroll(function() {
        if ($(document).scrollTop() >= 500) {
            $("#sidebar").show();
        } else {
            $("#sidebar").hide();
        }
    });

    $("#baidu-qiao").on('click', function() {
        popWin.showWin("800", "600", "百度商桥", "http://p.qiao.baidu.com//im/index?siteid=4334137&ucid=6953481&qq-pf-to=pcqq.c2c");
    });

    // 固定则边栏
    var sidebar = $(".side-icon");
    var topOffset = (window.screen.availHeight - sidebar.height()) / 2;
    // console.log(topOffset);
    sidebar.css({ "top": topOffset });

    // 背景图加载优化
    var userLogo = $(".user-logo");
    var userLogoTop = userLogo.offset().top;
    var winHeight = $(window).height();
    $(window).scroll(function() {
        var _scrollTop = $(window).scrollTop();
        if (_scrollTop + winHeight >= userLogoTop) {
            userLogo.show();
        } else {
            userLogo.hide();
        }
    });

    // 侧边栏显示影藏
    var contact = $("#contact")
    wechat = $("#wechat"),
        backTop = $("#back-top");
    contact.mouseover(function() {
        $(this).find('.wrap-contact').show();
    }).mouseout(function() {
        $(this).find('.wrap-contact').hide();
    });
    wechat.mouseover(function() {
        $(this).find('.qr-code').show();
    }).mouseout(function() {
        $(this).find('.qr-code').hide();
    });
    //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
    backTop.click(function() {
        $("html,body").animate({ scrollTop: "0px" }, 200);
    });
    // 显示隐藏侧边栏信息
    $('.wrap-contact, .qr-code').mouseover(function() {
        $(this).show();
    }).mouseout(function() {
        $(this).hide();
    });
    // 显示二维码
    $("#wechat-icon").mouseover(function() {
        $(this).find('.qr-code1').show();
    }).mouseout(function() {
        $(this).find('.qr-code1').hide();
    });
    $("#app").mousemove(function() {
        $(this).find('.app-code').show();
    }).mouseout(function() {
        $(this).find('.app-code').hide();
    });

    // 数据追中切换
    $(".data-traching .cir li").mouseover(function() {
        var _index = $(this).attr('value');
        $(this).addClass('cir-on').siblings().removeClass('cir-on');
        $(".data-tabs li").eq(_index).show().siblings().hide();
    });

    $(".friend-tabs li").mouseover(function() {
        $(this).find('.arrow-angel').addClass('arrow-hover');
        $(this).siblings().find('.arrow-angel').removeClass('arrow-hover')
    });

    $("img.lazy").lazyload({
        threshold: 200,
        effect: "fadeIn"
    });

    // get dynamic data
    $.ajax({
        url: "/stat/index.json",
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if (data.success = "true") {
                $(".orderWeekCount").html(data.orderWeekCount);
                $(".companyOrderWeekCount").html(data.companyOrderWeekCount);
                $(".resCount").html(data.resCount);
                $(".resWeekCount").html(data.resWeekCount);
            }
        }
        // ,error: function() {
        //     alert("获取数据出错");
        // }
    })

    // 一分钟后显示弹框
    setTimeout(function () {
        $(document).find('.tips-pop').show();
    }, 60000);
    // 关闭弹框
    $(document).on('click', '.tips-close', function () {
        $(this).parents('.tips-pop').hide();
    });
}

function loadTab(plate, pos) {
    var url = baseUrl + "/index/tabPage.html";
    if (plate == 51) {
        $(".article-view").load(url, { plate: plate, pos: pos }, function(response, status, xhr) {
            $("img.lazy").lazyload();
        });
    } else if (plate == 13) {
        $(".wechat-view").load(url, { plate: plate, pos: pos }, function(response, status, xhr) {
            $("img.lazy").lazyload({
                threshold: 200,
                effect: "fadeIn"
            });
        });
    } else if (plate == 17) {
        $(".friend-view").load(url, { plate: plate, pos: pos }, function(response, status, xhr) {
            $("img.lazy").lazyload({
                threshold: 200,
                effect: "fadeIn"
            });
        });
    } else if (plate == 11) {
        $(".weibo-view").load(url, { plate: plate, pos: pos }, function(response, status, xhr) {
            $("img.lazy").lazyload({
                threshold: 200,
                effect: "fadeIn"
            });
        });
    } else if (plate == 98) {
        $(".live-view").load(url, { plate: plate, pos: pos }, function(response, status, xhr) {
            $("img.lazy").lazyload({
                threshold: 200,
                effect: "fadeIn"
            });
        });
    } else if (plate == 99) {
        $(".video-view").load(url, { plate: plate, pos: pos }, function(response, status, xhr) {
            $("img.lazy").lazyload({
                threshold: 200,
                effect: "fadeIn"
            });
        });
    }
}

function loadRes(plate, tabId, element) {
    var url = baseUrl + "/index/resPage.html";
    if (plate == 51) {
        if (typeof(article[tabId]) == 'undefined') {
            $("#articleResList").load(url, { plate: plate, tabId: tabId }, function(data, status, resp) {
                article[tabId] = data;
            });
        } else {
            $("#articleResList").html(article[tabId]);
        }
    } else if (plate == 13) {
        if (typeof(wechat[tabId]) == 'undefined') {
            $("#wechatResList").load(url, { plate: plate, tabId: tabId }, function(data, status, resp) {
                wechat[tabId] = data;
            });
        } else {
            $("#wechatResList").html(wechat[tabId]);
        }
    } else if (plate == 17) {
        if (typeof(friend[tabId]) == 'undefined') {
            $("#friendResList").load(url, { plate: plate, tabId: tabId }, function(data, status, resp) {
                friend[tabId] = data;
            });
        } else {
            $("#friendResList").html(friend[tabId]);
        }
    } else if (plate == 11) {
        if (typeof(weibo[tabId]) == 'undefined') {
            $("#weiboResList").load(url, { plate: plate, tabId: tabId }, function(data, status, resp) {
                weibo[tabId] = data;
            });
        } else {
            $("#weiboResList").html(weibo[tabId]);
        }
    } else if (plate == 98) {
        if (typeof(live[tabId]) == 'undefined') {
            $("#liveResList").load(url, { plate: plate, tabId: tabId }, function(data, status, resp) {
                live[tabId] = data;
            });
        } else {
            $("#liveResList").html(live[tabId]);
        }
    } else if (plate == 99) {
        if (typeof(live[tabId]) == 'undefined') {
            $("#videoResList").load(url, { plate: plate, tabId: tabId }, function(data, status, resp) {
                video[tabId] = data;
            });
        } else {
            $("#videoResList").html(video[tabId]);
        }
    }
    $(element).addClass('cur').siblings().removeClass('cur');
}

// 创建video对象，并播放视频
function createVideo(_this, id, url, poster, width, height) {
    var videoObj = videojs.getPlayers()[id];
    var storeId = store(id); //获取key的字符串数据
    if (videoObj && storeId) {
        var videoId = storeId + 1;
        var _html = [
            '<video id="' + videoId + '" class="video-js vjs-default-skin" width="' + width + '" height="' + height + '" poster="' + poster + '" data-setup="{}">',
            '<source src="' + url + '" type="video/mp4">',
            '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>',
            '</p>',
            '</video>'
        ];
        _this.parent().html(_html.join(''));
        var player = videojs(videoId, { controls: true, preload: 'auto' }, function() {
            this.on(['play'], function() {
                var videos = [].slice.call($('video'));
                videos.forEach(function(item) {
                    if (item.getAttribute('id') !== videoId + '_html5_api') {
                        item.pause();
                    }
                })
            })
            this.play();
        });
        // 由于每个id只能初始化一次, 故对已经初始化过的id做一个标记存储到localstorage里面
        store(id, false); //删除id包括id的字符串数据
        store(id, videoId); //单个存储字符串数据
    } else {
        var _html = [
            '<video id="' + id + '" class="video-js vjs-default-skin" width="' + width + '" height="' + height + '" poster="' + poster + '" data-setup="{}">',
            '<source src="' + url + '" type="video/mp4">',
            '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>',
            '</p>',
            '</video>'
        ];
        _this.parent().html(_html.join(''));
        var player = videojs(id, { controls: true, preload: 'auto' }, function() {
            this.on(['play'], function() {
                var videos = [].slice.call($('video'));
                videos.forEach(function(item) {
                    if (item.getAttribute('id') !== id + '_html5_api') {
                        item.pause();
                    }
                })
            })
            this.play();
        });
        // 由于每个id只能初始化一次, 故对已经初始化过的id做一个标记存储到localstorage里面
        store(id, id); //单个存储字符串数据
    }
}
