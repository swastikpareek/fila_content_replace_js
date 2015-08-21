var CONTENTREPLACE = CONTENTREPLACE || (function() {
  var _args = {}; // private

  return {
    init: function(Args) {
      _args = Args;
      // some other initialising
    },
    executeAjaxCall: function() {
      $(document).ready(function() {
        function createXMLHttpRequest() {
          try {
            return new XMLHttpRequest();
          } catch (e) {}
          try {
            return new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {}
          alert("XMLHttpRequest not supported");
          return null;
        }
        var xhReq = createXMLHttpRequest();
        xhReq.open("GET", _args[0], false);
        xhReq.send(null);
        var serverResponse = xhReq.responseText;
        var data = serverResponse.replace(/\n/g, "");
        $obj = $(data);
        $obj.each(function(key, item) {
          if (item.className === 'mainContentRegion') {
            $(_args[1]).html('');
            $(_args[1]).append(item);
          }
          if (item.nodeName === 'SCRIPT') {
            $('body').append(item);
          }
          if (item.nodeName === 'STYLE') {
            $('head').append(item);
          }
        });
      });
    }
  };
}());
