/**
 * Created by Administrator on 2018/5/15.
 */
jQuery(".slideTxtBox1").slide({
    mainCell: ".bd-list01 ul",
    autoPage: true,
    effect: "leftLoop",
    vis:1,
    autoPlay: true
});
function delHtmlTag(str){
    return str.replace(/<[^>]+>|&[^>]+;/g,"").trim();
}

function stripscript(s){
    var pattern = new RegExp("[`~!@%#$^&*()=| {}':;',\\[\\].<>/?~！@#￥……&*（）\\――|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// 点击打开
function searchClose(){
	$(".header_search_box .search-input").val("");  
	$(".header_search_box").hide();
	$(".header_search_box .search-ul-box").hide();
	$(".header_search_box .search-ul-box").html("");
} 
// 点击X关闭
function searchOpen(){
	$(".header_search_box .search-input").val("");  
	$(".header_search_box").show();
} 

 

!function () {
	var titleSearchBox = $('.search_box'),
        titleSearchCancel = $('.search_close'),
        titleSearchInput = $('.search-input'),
        searchUlBox=$('.search-ul-box'),
        titleSearchRight=$('.go_search')
		
    // 监听input值变化显示隐藏下拉菜单
    titleSearchInput.on('keyup',function () {
        if(url_flag == 1){
            if(!$(this).val()){
                searchUlBox.hide();
            }else {
                var keyword = stripscript(delHtmlTag($(this).val()));
                if(keyword!='') {
                    $.post('/NewIndex/keywordSearch', {'keywords': keyword}, function (data) {
                        if (data == '[]') {
                            searchUlBox.hide();
                        } else {
                            var res = eval('(' + data + ')');
                            var content = '';
                            jQuery.each(res, function (i, val) {
                                content += '<li class="first-li02"><a href="'+val.url+'" data-type="1">' + val.product_name + '</a></li>';
                            });
                            searchUlBox.show();
                            searchUlBox.html(content);
                        }
                    })
                }

            }
        }
    });

    // 输入框点击事件
    titleSearchInput.on('click',function () {
        if(url_flag == 1){
            if(!$(this).val()){
                searchUlBox.hide();
            }else {
                var keyword = stripscript(delHtmlTag($(this).val()));
                if(keyword!='') {
                    $.post('/NewIndex/keywordSearch', {'keywords': keyword}, function (data) {
                        if (data == '[]') {
                            searchUlBox.hide();
                        } else {
                            var res = eval('(' + data + ')');
                            var content = '';
                            jQuery.each(res, function (i, val) {
                                content += '<li class="first-li02"><a href="'+val.url+'" data-type="1">' + val.product_name + '</a></li>';
                            });
                            searchUlBox.show();
                            searchUlBox.html(content);
                        }
                    })
                }

            }
        }
    });
    // 右侧搜索监听
    titleSearchRight.on('click',function (e) {
        var _head_keywords = stripscript(delHtmlTag(titleSearchInput.val()));
        if(url_flag == 1){
            location.href='/NewIndex/keywordSearch/keywords/'+_head_keywords;
        }else{
            var _search = new Array;
            if(search_tmp){
                var search_tmp_1 = search_tmp.split('-');
                if(search_tmp_1[0] == 1){
                    _search[0] = 1;
                }
                else if(search_tmp_1[0] == 2){
                    _search[0] = 2;
                }
                else if(search_tmp_1[0] == 3){
                    _search[0] = 3;
                    _search[1] = search_tmp_1[1];
                }
                else {
                    _search[0] = 1;
                }
            }
            else {
                _search[0] = 1;
            }
            if(search_tmp_1){
                _search[14] = search_tmp_1[14];
                _search[15] = search_tmp_1[15];
            }else{
                _search[14] = 1;
            }
            _search[12] = _head_keywords;
            // 记录搜索热词
            var url_name = window.location.href;
            $.post(mj_url+'/ajax/add_type_search_keyword',{type:8,staff_type:_search[0],keyword:_head_keywords,url:url_name});
            var _str = _search.join('-');
            window.location.href = mj_url+'/search/'+_str+'.html';
            close(e)
        }
    });
    function close(e) {
        e.stopPropagation();
        titleSearchBox.hide();
        titleSearchInput.val('');
        searchUlBox.hide();
    }
    $(function () {
        var $inp = titleSearchInput;
        $inp.bind('keydown', function (e) {
            var key = e.which;
            if (key == 13) {
                titleSearchRight.click();
            }
        });
    });
}()