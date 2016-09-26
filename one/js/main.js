var tanmu_content = new Array;
var hudong_content = new Array;
var si;
var discuz_uid = 0;
var typeid  = 3234;

$(document).ready(function(){
// //节目表中直播详细图
// var leftg_img = $('.leftg img').attr('src');
// $('.leftg img').attr('src', leftg_img+'?version='+Math.random());


//视频封面图片
var video_pic = $('#videoplayer').attr('poster');
$('#videoplayer').attr('poster', video_pic+'?v='+Math.random());


var top_height = $('#videoplayer')[0].offsetHeight+26+35+28;
var self_height = document.body.clientHeight - top_height - 50;
$('#view_detail').css({'position':'absolute', 'top':top_height, 'height' : self_height});
});

function tangmu(){
  // if (discuz_uid == 0) {
  //   alert('请登录后再发言!~');
  // if (isweixinclient())
  // {
  //   location = 'http://www.happyfishing.com.cn/app/bindweixin/';
  // }else{
  //   location = 'http://www.happyfishing.com.cn/member.php?mod=logging&action=login&mobile=2';
  // }
  // return false;
  // }
  var text = document.getElementById("text");
  if(text.value==''){
    return ;	
  }

  var subject = text.value.substr(0,20);
  var post_data = {'message' : text.value, 'formhash' : $('.formhash').val(), 'posttime' : $('#posttime').val(), 'typeid' : typeid, 'subject' : subject};

  $.ajax({
    'type' : 'POST',
    'url'  : './forum.php?mod=post&action=newthread&fid=867&extra=&topicsubmit=yes&mobile=2',
    'data' : post_data,
    'success' : function(data){
      pop_msg('发送成功！');			
    }	
  });
  alert(text.value);
  text.value=''; 
}


$(document).ready(function() {
  $('#subname_list').on('click', function(){
    $('#subdislist').toggle();
  });

  //切换
  $('.tabHeader li').each(function(index, element) {
    $(this).click(function(){
      $(this).attr('class', 'curMenu').siblings().removeClass('curMenu');
      $('.tab_contents .tabContent').each(function(ind, ele) {
        if (index==ind){
          $(this).show();	
        }else{
          $(this).hide();	
        } 	   
      });	   
    });
  });

  //加载第一次回复
  get_new_reply();
});

//获取回复
function get_new_reply(){

  $.ajax({
    'type' : 'GET',
    'url'  : './app/getreply/index.php?fid=867&typeid='+typeid,
    'success'  : function(datas){
      if (datas.err==0){

        var html_str = '';
        var dd = datas.data;

        //online_member
        onlineMember(datas.onlinemembers);

        //var first_data = dd[0];
        //tanmu_content[first_data['pid']] = first_data;
        for (var i in dd){
          var exists_flag = false;
          if (hudong_content.length!=0){

            for (var j in hudong_content){
              if (hudong_content[j]==dd[i]['pid']){
                exists_flag = true;	
              }	
            }
            if (!exists_flag){
              hudong_content.push(dd[i]['pid']);
              //console.log(dd[i]['message']);
              dd[i]['message'] = dd[i]['message'].replace(/<br \/>/ig,'');
              html_str += '<li><font color="#00a5e0">'+dd[i]['author']+':</font>'+dd[i]['message']+'</li>';	
            } 
          }else{

            hudong_content.push(dd[i]['pid']);
            dd[i]['message'] = dd[i]['message'].replace(/<br \/>/ig,'');
            html_str += '<li><font color="#00a5e0">'+dd[i]['author']+':</font>'+dd[i]['message']+'</li>';	
          }

        }	
        if (html_str!=''){
          // $('.view_detail').append(html_str);	   
          $('.view_detail').prepend(html_str);
        }

        var filter_br = $('.view_detail').html().replace(/<br>/ig,'');

        $('.view_detail').html(filter_br);

        /* 自动往下滚动
        var view_detail_len = $("#view_detail li").length;
        if (view_detail_len > 9){
        var need_scroll_up = (view_detail_len - 8 ) * 20 ;
        $('#view_detail').get(0).scrollTop = need_scroll_up;
        document.getElementById('view_detail').scrollTop  = need_scroll_up;		
        }
        */
      }	
    },
    'dataType' : 'json' 	
  });	
}

setInterval("get_new_reply()", 1000);

function isweixinclient(){
  var ua = navigator.userAgent.toLowerCase();  
  if(ua.match(/MicroMessenger/i)=="micromessenger") {  
    return true;  
  } else {  
    return false;  
  }  
}

function onlineMember(num){
  $('.onlinemem').html('<img src="img/renwu.png" style="width:16px; height:12px; padding:10px 1px 0 12px;">'+num);
/*
var online = ;
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3(1==0){$(\'.7\').a(\'\')}4{g h=i e().f();3(h>=j&&h<=6){1=1*m+(5.2()*n)}4 3(h>6){1=1*k+(5.2()*l)}4 3(h>0&&h<8){1=1*9+(5.2()*9)}4{1=1*6+(5.2()*c)}$(\'.7\').a(\'<d z="A://x.y.C.B/F/E/D.r" o="p:s; v:b; w:t u 0 b;">\'+q(1))}',42,42,'|online|random|if|else|Math|18|onlinemem||10|html|12px|15|img|Date|getHours|var||new|14|50|100|30|35|style|width|parseInt|png|16px|10px|1px|height|padding|static|happyfishing|src|http|cn|com|renwu|index|images'.split('|'),0,{}))   */

}
//	onlineMember();

//	setInterval('onlineMember()',30000);

function pop_msg(msg){
  $('.pop_msg').html(msg).fadeIn();
  setTimeout(function(){$('.pop_msg').fadeOut();}, 2000);		
}
  