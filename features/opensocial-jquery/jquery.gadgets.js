(function($) {
/**
 * opensocial-jquery 0.3.0
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

  var params = gadgets.util.getUrlParameters();

  /**
   * Environment
   */
  var synd = params['synd'] || '';
  
  // container
  $.container = {
    ig: /ig/.test(synd),
    orkut: /orkut/.test(synd),
    hi5: /hi5/.test(synd),
    sandbox: /sandbox/.test(synd) || /sandbox/.test(location.host)
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
