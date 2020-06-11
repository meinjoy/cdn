
(function ($) {
    "use strict";
    /*[ Back to top ]
    ===========================================================*/
    $(window).on('scroll',function(){
        if ($(this).scrollTop() > 100) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });

    /*[ Show header dropdown ]
    ===========================================================*/
    $('.js-show-header-dropdown').on('click', function(){
        $(this).parent().find('.header-dropdown')
    });

    var menu = $('.js-show-header-dropdown');
    var sub_menu_is_showed = -1;

    for(var i=0; i<menu.length; i++){
        $(menu[i]).on('click', function(){ 
            
                if(jQuery.inArray( this, menu ) == sub_menu_is_showed){
                    $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
                    sub_menu_is_showed = -1;
                }
                else {
                    for (var i = 0; i < menu.length; i++) {
                        $(menu[i]).parent().find('.header-dropdown').removeClass("show-header-dropdown");
                    }

                    $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
                    sub_menu_is_showed = jQuery.inArray( this, menu );
                }
        });
    }

    $(".js-show-header-dropdown, .header-dropdown").click(function(event){
        event.stopPropagation();
    });

    $(window).on("click", function(){
        for (var i = 0; i < menu.length; i++) {
            $(menu[i]).parent().find('.header-dropdown').removeClass("show-header-dropdown");
        }
        sub_menu_is_showed = -1;
    });


     /*[ Fixed Header ]
    ===========================================================*/
    var posWrapHeader = $('.topbar').height();
    var header = $('.container-menu-header');

    $(window).on('scroll',function(){
    	
        if($(this).scrollTop() >= posWrapHeader) {
            $('.header1').addClass('fixed-header');
            $(header).css('top',-posWrapHeader);
        }  
        else {
            var x = - $(this).scrollTop(); 
            $(header).css('top',x); 
            $('.header1').removeClass('fixed-header');
        } 

        if($(this).scrollTop() >= 200 && $(window).width() > 992) {
            $('.fixed-header2').addClass('show-fixed-header2');
            $('.header2').css('visibility','hidden'); 
            $('.header2').find('.header-dropdown').removeClass("show-header-dropdown");
            
        }  
        else {
            $('.fixed-header2').removeClass('show-fixed-header2');
            $('.header2').css('visibility','visible'); 
            $('.fixed-header2').find('.header-dropdown').removeClass("show-header-dropdown");
        } 

    });
    
    /*[ Show menu mobile ]
    ===========================================================*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.wrap-side-menu').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu').slideToggle();
            $(this).toggleClass('turn-arrow');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.wrap-side-menu').css('display') == 'block'){
                $('.wrap-side-menu').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }
            if($('.sub-menu').css('display') == 'block'){
                $('.sub-menu').css('display','none');
                $('.arrow-main-menu').removeClass('turn-arrow');
            }
        }
    });


    /*[ remove top noti ]
    ===========================================================*/
    $('.btn-romove-top-noti').on('click', function(){
        $(this).parent().remove();
    })
    /*[ Block2 button wishlist ]
    ===========================================================*/
    $('.block2-btn-addwishlist').on('click', function(e){
        e.preventDefault();
        $(this).addClass('block2-btn-towishlist');
        $(this).removeClass('block2-btn-addwishlist');
        $(this).off('click');
    });

    /*[ +/- num product ]
    ===========================================================*/
    $('.input_item_qua').on('click', function(e){
        e.preventDefault();
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });
    
	/*===========================================================*/
    $("#item_0").click(function(){
    	$.ajax({
			url : "addcart?id=1000",
			success : function(data) {
				 $("#cart_show_w").text(data);
				 $("#cart_show_w").addClass('header-icons-noti-d'); 
				 $("#cart_show_m").text(data);
				 $("#cart_show_m").addClass('header-icons-noti-d');
			}
		});
    });
    $("#item_1").click(function(){
    	$.ajax({
			url : "addcart?id=1001",
			success : function(data) {
				 $("#cart_show_w").text(data);
				 $("#cart_show_w").addClass('header-icons-noti-d'); 
				 $("#cart_show_m").text(data);
				 $("#cart_show_m").addClass('header-icons-noti-d');
			}
		});
    });
    $("#item_2").click(function(){
    	$.ajax({
			url : "addcart?id=1002",
			success : function(data) {
				 $("#cart_show_w").text(data);
				 $("#cart_show_w").addClass('header-icons-noti-d'); 
				 $("#cart_show_m").text(data);
				 $("#cart_show_m").addClass('header-icons-noti-d');
			}
		});
    });
    $("#item_3").click(function(){
    	$.ajax({
			url : "addcart?id=1003",
			success : function(data) {
				 $("#cart_show_w").text(data);
				 $("#cart_show_w").addClass('header-icons-noti-d'); 
				 $("#cart_show_m").text(data);
				 $("#cart_show_m").addClass('header-icons-noti-d');
			}
		});
    });
    
    $('.qua_option').change(function(){
    	var node_qua = $(this).children('option:selected').val();
    	var node_price = $(this).parent().parent().prev();
    	var node_id = $(this).parent().parent().parent().attr("id");
    	var item_total = $(this).parent().parent().next();
    	
    	var pa = "";
    	$(".qua_option").each(function() {
    		var qua = $(this).children('option:selected').val();
    		var id = $(this).parent().parent().parent().attr("id");
    		pa = pa+id+"_"+qua+"-";
    	});
    	var end = pa.length-1;
    	pa = pa.substring(0,end);
    	
    	$.ajax({
            type:'GET',
            cache:false,
            url: 'updatecart?pa='+pa,
            beforeSend:function(){
            	$.busyLoadFull("show",{fontawesome: "fa fa-cog fa-spin fa-3x fa-fw" ,background: "rgba(30, 30, 30, 0.73)",text: "Update Cart ...",textColor: "white"});
            },
            success: function(data){
            	$.busyLoadFull("hide");
            	if(data==0){
            		$.alert("Failed to update,please try again");
            	}
            	if(data==1){
            		var price_value = node_price.text();
                	var node_total_value = node_qua*price_value;
                	var neototal = Math.round(node_total_value*100)/100;
                	item_total.text(neototal);
            		$.fun1();
            	}
            },
            error:function () { 
            	$.busyLoadFull("hide");
            	$.alert("Error,please try again");
            }
        });
    });
    $(".imgcode").click(function(){
    	$(this).attr("src","../captchaimg?rn=" + Math.random());
    });
    

    $(".col2").each(function(){
    	  var maxwidth=45;
    	  if($(this).text().length > maxwidth){
    	    $(this).text($(this).text().substring(0,maxwidth));
    	    $(this).html($(this).html()+'...');
    	  }
    });
    
    $("#passwordform").submit(function(event){
    	event.preventDefault(); //prevent default action 
    	var post_url = $(this).attr("action"); //get form action url
    	var request_method = $(this).attr("method"); //get form GET/POST method
    	var form_data = $(this).serialize(); //Encode form elements for submission
    	
    	$.ajax({
    		url : post_url,
    		type: request_method,
    		data : form_data
    	}).done(function(data){ //
    		if(data==1){
    			$.alert("Password has changed");
    		}
    		if(data==0){
    			$.alert("Password must be at least 6 characters");
    		}
    		if(data==-1){
    			$.alert("The old password is not correct");
    		}
    		if(data==-2){
    			$.confirm({
    	        	title: 'Error',
    	        	content:'Please Log In',
    	            buttons: {
    	              ok: {
    	                  text: 'OK',
    	                  action: function(){
    	                	  window.location.href="/ecom/login.html";
    	                  }
    	              },
    	            }
    	        });
    		}
    		if(data==-3){
    			$.alert("The new password and confirm new password not match");
    		}
    	});
    });
    
    $(".column-del").click(function(){
    	var item_id = $(this).parent().attr("id");
        $.confirm({
        	title: 'remove item',
            buttons: {
              ok: {
                  text: 'OK',
                  action: function(){
                	  $.ajaxSetup({ cache: false });
                      $.ajax({
                          type: "GET",
                          url: 'delitem?pa='+item_id,
                          beforeSend:function(){
                          	$.busyLoadFull("show",{fontawesome: "fa fa-cog fa-spin fa-3x fa-fw" ,background: "rgba(30, 30, 30, 0.73)",text: "remove from cart ...",textColor: "white"});
                          },
                          success: function(data){
                              if(data == 1){
                            	  $("#"+item_id).remove();
                            	  $.fun1();
                            	  $.busyLoadFull("hide");
                              }else if(data == 0){
                            	  window.location.href="cart/cart_empty.html";
                              }else{
                            	  $.busyLoadFull("hide");
                            	  $.alert("Internal error,please refresh page,and try again");
                              }
                          },
                          error:function () { 
                        	  $.busyLoadFull("hide");
                        	  $.alert("Error,please try again");
                          }
                      });
                  }
              },
              cancel: {
                  text: 'CANCEL',
                  action: function(){}
              },
            }
        });
    });
    
    /*[ Show content Product detail ]
    ===========================================================*/
    $('.active-dropdown-content .js-toggle-dropdown-content').toggleClass('show-dropdown-content');
    $('.active-dropdown-content .dropdown-content').slideToggle('fast');

    $('.js-toggle-dropdown-content').on('click', function(){
        $(this).toggleClass('show-dropdown-content');
        $(this).parent().find('.dropdown-content').slideToggle('fast');
    });


    /*[ Play video 01]
    ===========================================================*/
    var srcOld = $('.video-mo-01').children('iframe').attr('src');

    $('[data-target="#modal-video-01"]').on('click',function(){
        $('.video-mo-01').children('iframe')[0].src += "&autoplay=1";
        setTimeout(function(){
            $('.video-mo-01').css('opacity','1');
        },300);      
    });

    $('[data-dismiss="modal"]').on('click',function(){
        $('.video-mo-01').children('iframe')[0].src = srcOld;
        $('.video-mo-01').css('opacity','0');
    });
    
    $.extend({'fun1':function(){//$.fun1();
    	var sub_total=0;
		$(".column-price").each(function() {
    		var node_total = $(this).text();
    		var n2 = parseFloat(node_total);
    		sub_total = sub_total+n2;
    	});
		sub_total = Math.round(sub_total*100)/100;
		
		$("#sub_total").text(sub_total);
		var hpromo = $("#havepromo").text();
		if(hpromo=="20"){
			var discount_20 = sub_total*0.2;
			var ttoal = sub_total-discount_20;
			discount_20 = Math.round(discount_20*100)/100;
			$("#discounted_price").text(discount_20);
			var all_total = Math.round(ttoal*100)/100;
			$("#all_total").text(all_total);
		}else{
			$("#all_total").text(sub_total);
		}
    }});
    
})(jQuery);