// Render Underscore templates
_.tpl = function(tpl, ctx) {
  source = $("script[name="+tpl+"]").html();
  return _.template(source, ctx);
};


_.htmlId = function(id) {
  return id.replace(/\./g, '_').replace(/\//g, '_').replace(/_/, '');
}

// Color Pool
// --------------

// A Color Pool maintains arbitrary color palettes
// and assigns them in round robin style.

var ColorPool = function(colors) {
  var keys = _.keys(colors);
  var paletteIndex = 0;
  var palettes = {};
  
  // Initialize color indexes
  _.each(colors, function(c, key, index) {
    palettes[key] = {
      paletteIndex: index,
      colorIndex: 0,
      colors: c
    };
  });
  
  // Get a new color, either from a given group or the just the next available
  function getNext(paletteKey) {
    if (paletteKey) {
      var palette = palettes[paletteKey];
      var color = palette.colors[palette.colorIndex];
      palette.colorIndex = (palette.colorIndex+1) % palette.colors.length;
    } else {
      var palette = palettes[keys[paletteIndex]];
      var color = palette.colors[palette.colorIndex];
      palette.colorIndex = (palette.colorIndex+1) % palette.colors.length;
      paletteIndex = (paletteIndex+1) % keys.length;
    }
    return color;
  }
  
  function reset() {
    _.each(palettes, function(palette, key) {
      palette.colorIndex = 0;
    });
    paletteIndex = 0;
  }
  
  return {
    getNext: getNext,
    reset: reset
  }
};


// Request abstraction
// --------------

_.request = function(method, path, data) {
  var cb = _.last(arguments);
  $.ajax({
    type: method,
    url: path,
    // data: data !== undefined ? JSON.stringify(data) : null,
    dataType: 'json',
    // contentType: "application/json",
    success: function(res) { 
      console.log('RESULT', res);
      cb(null, res);
    },
    error: function(err) { console.log(err.responseText); cb(JSON.parse(err.responseText)); }
  });
};