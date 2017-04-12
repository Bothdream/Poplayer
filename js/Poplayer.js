;(function(){
  var Poplayer = function(jq){
      var _this_ = this;
      this.trigger = jq;
      this.config= {
          "width":670,//弹出层的高度
          "height":360,//弹出层的宽度
          "opactiy":.75,//遮罩层的透明度
          "backgroundColor": "#33333",//遮罩层的颜色
          "color": "#4C8CF5", //弹出层的颜色
          "isScroll":false//当弹出层弹出时，设置页面是否能滚动
      }

      this.trigger.bind('click',function(){
          _this_.openPoplayer();
      });
  };

  Poplayer.prototype = {
      /******配置参数******/
      setConfig:function(config){
          if(config){
              $.extend(this.config,config);
          }
      },

      /******打开弹出层****/
      openPoplayer:function(){
          /*****判断页面是否滚动****/
          if(!this.config.isScroll){
              $("body").css({overflow:"hidden"}); 
          }

          /******添加遮罩层*****/
          $('body').append("<div id='mask'></div>");
          //获取整个文档的滚动高度和宽度
          var sw = document.documentElement.scrollWidth + 15,
              sh = document.documentElement.scrollHeight + 15;  
          this.mask = $("#mask");
          //设置遮罩层的样式
          this.mask.css({
              width:sw,
              height:sh,
              opactiy:this.config.opactiy,
              backgroundColor:this.config.backgroundColor,
              zIndex:100
          });

          /******添加弹出框********/
          $("body").append("<div id='poplayer'><span style='display: block;position: absolute;top:10px;right:10px;cursor: pointer;'>关闭</span><img src='./images/box.png'/></div>");
          this.poplayer = $("#poplayer");
          //获取可视区域的宽度和高度
          var vw = document.documentElement.clientWith,
              vh = document.documentElement.clienHeight;
          //定位的偏移    
          var left = -this.config.width/2,
              top = -this.config.height/2;  
          //设置弹出框的样式
           this.poplayer.css({
              width:this.config.width,
              height:this.config.height,
              left:"50%",
              top:"50%",
              marginLeft:left,
              marginTop:top,
              opactiy:this.config.opactiy,
              backgroundColor:this.config.color,
              zIndex:100
          });

          /******关闭弹出层******/
          var player = this.poplayer,
              mask = this.mask;
          this.mask.click(function(){
               $(this).remove();
               player.remove();
               $("body").css({overflow:""}); 
          });

          this.poplayer.children().first().click(function(){
               player.remove();
               mask.remove();
               $("body").css({overflow:""}); 
          });
         
      }
  }

  window['Poplayer'] = Poplayer; 
})()