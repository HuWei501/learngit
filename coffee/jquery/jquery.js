	$(function(){
		var i=0;
		var clone=$('.img li').first().clone();
		$('.pic .img').append(clone);
		var size=$('.img li').size();
		for(var j=0;j<size-1;j++){
			$('.pic .num').append('<li></li>');
		}
		$('.num li').first().addClass('on');

		//滑动圆点
		$('.pic .num li').hover(function(){
			var index=$(this).index();
			i=index;
			$(".pic .img").animate({left:-index*1349},500);
			$(this).addClass('on').siblings().removeClass('on');
		})
		//自动轮播
		var t=setInterval(function(){
			i++;
			move();
		},2000);

		//对pic定时器的操作
		$('.pic').hover(function(){
			clearInterval(t);
		},function(){
			t=setInterval(function(){
				i++;
				move();
		},2000);
		})
		//向左的按钮
		$(".pic .btn_r").click(function(){
			i++;
			move();
		})


		//向右的按钮
		$(".pic .btn_l").click(function(){
			i--;
			move();
		})

		function move(){
			if(i==size){
				$('.pic .img').css({left:0});
				i=1;
			}	
			if(i==-1){
				$('.pic .img').css({left:-(size-1)*1349});
				i=size-2;
			}

			$(".pic .img").stop().animate({left:-i*1349},500);

			if(i==size-1){
				$('.num li').eq(0).addClass('on').siblings().removeClass('on');
			}else{
				$('.num li').eq(i).addClass('on').siblings().removeClass('on');
			}
		}


		//img抖动效果
		// $('.center_content img').each(function(k,img){
		// 	new JumpObj(img,10);
		// })
		
		$('.center_content img').hover(function(){
			alert(this.style.offsetTop);
			
		})
	})