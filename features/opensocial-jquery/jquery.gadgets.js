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
  
  var prefs = new gadgets.Prefs();
  
  $.pref = function(key) {
    return prefs.getString(key);
  };
  
  $.fn.adjustHeight = function(height) {
    if (this[0] === window)
      gadgets.window.adjustHeight(height);
  };

  $.fn.title = function(title) {
    if (this[0] === window)
      gadgets.window.setTitle(title);
  };

})(jQuery);
