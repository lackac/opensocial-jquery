(function($) {
/**
 * opensocial-jquery 0.1.0
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
  
  // Preference
  var prefs = new gadgets.Prefs();
  
  $.pref = function(key) {
    return prefs.getString(key);
  };
  
  // Window
  $.fn.adjustHeight = function(height) {
    if (this[0] === window)
      gadgets.window.adjustHeight(height);
  };

  $.fn.title = function(title) {
    if (this[0] === window)
      gadgets.window.setTitle(title);
  };
  
  // View
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

  $.views = function() {
	var names = [];
	var views = gadgets.views.getSupportedViews();
	for (var type in views) {
	  var name = views[type].getName();
      if (jQuery.inArray(name, names) === -1)
	      names.push(name);
	}
	return names;
  }
  
})(jQuery);
