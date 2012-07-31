//jquery.DVDBounce.js
 $.fn.DVDBounce = function(options) {

  var defaults = {
   inc: 1
  };
  var options = $.extend(defaults, options);
    var inc = options.inc;
    var imageIDs = [];
    var width = 0;
    var height = 0;
    curImg = 0;
    var Xdir = 1;
    var Ydir = 1;
  return this.each(function() {
      var div = $(this);  
      div.css("position","absolute")
      div.children().each(function(index, cur) {
          var id = "DVDBounce"+index;
          imageIDs.push(id);
          $(cur).attr("class", "DVDBounceImg").attr("id", id).load(function() {
                 width = $(this).width() > width ? $(this).width() : width;
                 height = $(this).height() > height ? $(this).height() : height;
                 div.css("width",width).css("height",height).css("margin","0px");
              });
          $(cur).hide();   
      });
      
      function changeImage(){
          $(".DVDBounceImg").hide();
          $("#"+imageIDs[curImg]).show();
            curImg = (curImg +1) % imageIDs.length;
      }
      changeImage();
      div.css("width",width);
      div.css("height",height);
      console.log(width+","+height);
      
      move = setInterval(function(){
          pos = div.offset();
          x = pos.left;
          y = pos.top;
          
          winW = $(window).width();
          winH = $(window).height();
          
          if(Xdir == 1){
              x+= inc;
              if(x+width >= (winW-inc)){
                  changeImage();
                  Xdir = 0;
              }
          }
          else{
              x -= inc;
                if(x <= inc){
                    changeImage();
                    Xdir = 1;
                }
          }
          
          if(Ydir == 1){
              y+= inc;
              if(y+height >= (winH-inc)){
                  changeImage();
                  Ydir = 0;
              }
          }
          else{
              y -= inc;
                if(y <= inc){
                    changeImage();
                    Ydir = 1;
                }
          }
          
          console.log("window:"+winW+","+winH);
          console.log("box:"+(x+width)+","+(y+height));

         div.offset({left:x, top:y});       
      },10);

  });
 };
