(function($) {
/**
 * opensocial-jquery 0.4.0
 * http://code.google.com/p/opensocial-jquery/
 *
 * Copyright(C) 2008 LEARNING RESOURCE LAB
 * http://friendfeed.com/nakajiman
 * http://hp.submit.ne.jp/d/16750/
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

  /**
   * Environment
   */

  var params = gadgets.util.getUrlParameters();
  var synd = params['synd'] || '';
  var parent = params['parent'] || '';
  var v = params['v'] || '';
  
  // container
  $.container = {
    igoogle: /ig/.test(synd),
    orkut: /orkut/.test(synd),
    hi5: /hi5/.test(synd),
    myspace: /msappspace/.test(location.host),
    sandbox: /sandbox/.test(synd) ||
      /sandbox/.test(parent) ||
      /sandbox/.test(location.host) ||
      /msappspace/.test(location.host) && /dev/.test(v)
  };

  for (var key in $.container)
    if ($.container[key])
      $('html').addClass(key);

  /**
   * IO
   */

  // _xhr
  $._xhr = function() {
    this.initialize();
  };
  
  // factory
  $._xhr.factory = function(type, url) {
     return new $._xhr();
  };
  
  // prototype
  $._xhr.prototype = {
    
    // initialize
    initialize: function() {
      this.readyState = 0; // UNSENT
    },
  
    // open
    open: function(type, url, async, username, password) {
      this.readyState = 1; // OPENED
      this.type = type;
      this.url = url;
      this.requestHeaders = {};
      this.responseHeaders = {};
    },

    // send
    send: function(data, dataType) {
      var self = this;
      
      var opt_params = [];
      opt_params[gadgets.io.RequestParameters.METHOD] = self.type;
      opt_params[gadgets.io.RequestParameters.HEADERS] = self.requestHeaders;
      opt_params[gadgets.io.RequestParameters.CONTENT_TYPE] =
        dataType === 'xml' && gadgets.io.ContentType.DOM ||
        dataType === 'feed' && gadgets.io.ContentType.FEED ||
        gadgets.io.ContentType.TEXT;
      if (data)
        opt_params[gadgets.io.RequestParameters.POST_DATA] = data;
      
      gadgets.io.makeRequest(this.url, function(res) {
        self.readyState = 4; // DONE
      
        if (res.errors.length > 0) {
          self.status = 400;
          self.responseText = res.errors.join(' ');
        
        } else {
          self.status = res.rc;
          self.responseHeaders = res.headers;
          self.responseText = res.text;
          
          if (dataType === 'xml')
            self.responseXML = res.data;
          else if (dataType === 'feed')
            self.responseFeed = res.data;
        }
      }, opt_params);
    },

    // abort
    abort: function() {
      this.readyState = 0; // UNSENT
    },
  
    // setRequestHeader
    setRequestHeader: function(header, value) {
      this.requestHeaders[header] = value;
    },
  
    // getResponseHeader
    getResponseHeader: function(header) {
      return this.responseHeaders[header];
    }
  };

  /**
   * Preference
   */

  var prefs = new gadgets.Prefs();
  
  // pref
  $.pref = function(key, value) {
    var pairs = key;

    if (key.constructor === String)
      if (value === undefined)
        return params[key] ||
          gadgets.util.unescapeString(prefs.getString(key));
      else {
        pairs = {};
        pairs[key] = value;
      }
 
    for (key in pairs) {
      value = pairs[key];
      if (value.constructor === Array)
        value = $.map(value, function(v) {
          return (v+'').replace(/\|/g, '%7C');
        }).join('|');
      prefs.set(key, value+'');
    }
  };
  
  // prefArray
  $.prefArray = function(key) {
    var value = $.pref(key);
    if (value === '')
      return [];
    return $.map(value.split('|'), function(v) {
      return v.replace(/%7C/g, '|')
    });
  };
  
  /**
   * Window
   */

  // title
  $.fn.title = function(title) {
    if (this[0] === window)
      gadgets.window.setTitle(gadgets.util.escapeString(title));
    return this;
  };

  // adjustHeight
  $.fn.adjustHeight = function(height) {
    if (this[0] === window)
      gadgets.window.adjustHeight(height);
    return this;
  };

  // _height
  $.fn._height = $.fn.height;

  // height
  $.fn.height = function(height) {
    return this[0] === window && height !== undefined
      ? this.adjustHeight(height)
      : this._height(height);
  };

  /** 
   * View
   */
   
  // view
  $.view = function(name, data) {
    if (name === undefined) 
      return gadgets.views.getCurrentView().getName();
    var views = gadgets.views.getSupportedViews();
    for (var type in views) {
      var view = views[type];
      if (view.getName() === name)
        return gadgets.views.requestNavigateTo(view, data || {});
    }
  };

  // views
  $.views = function() {
    var names = [];
    var views = gadgets.views.getSupportedViews();
    for (var type in views) {
      var name = views[type].getName();
      if (jQuery.inArray(name, names) === -1)
        names.push(name);
    }
    return names;
  };
  
})(jQuery);
