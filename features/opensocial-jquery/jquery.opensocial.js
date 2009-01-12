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

  $.container.domain = opensocial.getEnvironment().getDomain();
  
  /**
   * DataRequest
   */

  // _factory
  $._xhr._factory = $._xhr.factory;

  // factory
  $._xhr.factory = function(type, url) {
     if (type === 'GET' && url.indexOf('/people') == 0)
        return new $._xhr.getPeople();
     return $._xhr._factory(type, url);
  };

  // selector
  var selector = {
    '@me': 'VIEWER',
    '@viewer': 'VIEWER',
    '@owner': 'OWNER',
    '@self': 'SELF',
    '@friends': 'FRIENDS',
    '@all': 'ALL'
  };

  // parse
  var parse = function(data) {
    var ret = {};
    $.each(data.split('&'), function(i, pair) {
       var key = pair.replace(/\+/g, ' '), val = '';
       var pos = key.indexOf('=');
       if (pos != -1) {
          val = key.substring(pos + 1);
          key = key.substring(0, pos);
       }
       ret[decodeURIComponent(key)] = decodeURIComponent(val);
    });
    return ret;
  };

  // filter
  var filter = function(obj) {
    var ret = {};
    if (obj && obj.fields_)
      for (key in obj.fields_)
        ret[key] = filter(obj.fields_[key]);
    else if (obj && obj.constructor === Array)
      ret = $.map(obj, function(val) { return filter(val); });
    else
      ret = obj;
    return ret;
  };

  /**
   * getPeople
   */
  $._xhr.getPeople = function() {
    this.initialize();
  };
  
  // prototype
  $.extend($._xhr.getPeople.prototype, $._xhr.prototype, {
  
    // send
    send: function(data, dataType) {
      var self = this;
      
      var url = self.url;
      var pos = url.indexOf('?');
      if (pos != -1) {
        data = (data ? data + '&' : '') + url.substring(pos + 1);
        url = url.substring(0, pos);
      }
      data = data ? parse(data) : {};
      
      var path = url.split('/');
      var service = path[1];

      var idspec = opensocial.newIdSpec({
        userId: selector[path[2] || ''],
        groupId: selector[path[3] || '@self']
      });

      var params = {
        first: data.startIndex || 0,
        max: data.count || 20
      };

      var req = opensocial.newDataRequest();
      req.add(req.newFetchPeopleRequest(idspec, params), service);
      req.send(function(res) {
        self.readyState = 4; // DONE

        var item = res.get(service);

        if (res.hadError()) {
          self.status = 400;
          self.responseText = item.getErrorMessage();

        } else {
          var collection = item.getData();
          var people = $.map(collection.asArray(), function(person) {
             return filter(person);
          });
          people.startIndex = collection.getOffset();
          people.itemsPerPage = params.max;
          people.totalResults = collection.getTotalSize();

          self.status = 200;
          self.responseData = people;
        }
      });
    }
  });

  // getData
  $.getData = function(url, data, callback) {
    return jQuery.get(url, data, callback, 'data');
  };
  
})(jQuery);
