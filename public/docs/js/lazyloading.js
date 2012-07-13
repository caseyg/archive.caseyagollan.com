$(window).load(function() {

  $('#images').append('<p><em>Loading</em></p>');

  var timeout = false,
      page_num = 0,
      images = false,
      loader = $('#images p').eq(0);

  $.getJSON('/json/', function(data) {
    images = data;
    console.log(images);
  });
  var load_images = function() {
    var html = '';
    for (var i = page_num * 1, ii = (page_num * 1) + 1; i < ii; i++) {
      if (images[i]) {
        console.log(images[i]);
        html += '<img src="'+images[i]+'" alt="">';
      } else {
        $('#images p').eq(0).hide();
        $(window).unbind('scroll');
        $(window).unbind('resize');
        return;
      }
    }
    html += '<span id="page'+(page_num+1)+'">Page '+(page_num+1)+'</span>';
    $('#images p').eq(0).prepend(html).hide().fadeIn(100);
    document.location.hash = page_num;
    page_num++;
  }

  var scroll_position = function() {
    var load_threshold = $(window).height() + $(window).scrollTop() + 350,
        loader_position = loader[0].offsetTop;

    if (load_threshold >= loader_position) {
      load_images();
    }
  }

  var load_page = function(target_num) {
    if (!images) { 
      setTimeout(function() { load_page(target_num); }, 100);
      return;
    }
    for (var j = 0, jj = target_num; j < jj; j++) {
      page_num = j + 1;
      load_images();
    }
    if ($('#page'+target_num).length) {
      setTimeout(function() { 
        $(window).scrollTop($('#page'+target_num)[0].offsetTop - $(window).height()); 
      }, 750);
    }
  }

  $(window).scroll($.throttle(250, scroll_position)).resize($.throttle(250, scroll_position));

  if ((/\d+$/).test(document.location.hash)) {
    load_page(document.location.hash.match(/(\d+)$/)[1]);
  }

/*
  var html = '',
      loaded = [],
      load_offset = 900,
      max_width = 860,
      max_height = 500,
      images = window.imgs,
      container = $("#images");

  for (var i = 0, ii = images.length; i < ii; i++) {
    var url = images[i].url,
        width =  images[i].width < max_width ? images[i].width : max_width,
        height = images[i].height < max_height ? images[i].height : max_height;

    // emulate max-width & max-height
    if (images[i].height > max_height) {
      width = max_height * (images[i].width / images[i].height) + 'px';
    }
    if (images[i].width > max_width) {
      if ((/fed/).test(images[i].url)) console.warn(images[i].url);
      height = max_width * (images[i].height / images[i].width) + 'px';
    }

    html += '<img src="./public/images/placeholder.gif" width="'+width+'" height="'+height+'" data-src="'+url+'">';
  }

  container.html(html);

  var load_images = function() {
    var lower_threshold = $(window).height() + $(window).scrollTop() + load_offset,
        upper_threshold = $(document).scrollTop() - load_offset,
        images = $('img', container).filter(function() {
          return (/\/placeholder.gif$/).test(this.src);
        });

    for (var i = 0, ii = images.length; i < ii; i++) {
      var image = $(images[i]),
          image_position = image.position().top;

      if (image_position < lower_threshold && image_position > upper_threshold) {
        (function(image, src) {
          var loader = new Image();
          loader.src = src;
          $(loader).load(function() {
            image.css('opacity', 0);
            image.attr('src', src).animate({ opacity: 1 }, 500);
          });
        })(image, image.data('src'));
      }
    }
  }

  load_images();

  $(window).scroll($.throttle(250, load_images)).resize($.throttle(250, load_images));
*/
});