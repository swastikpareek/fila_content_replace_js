console.log('dont fuck with me');
var CONTENTREPLACE = CONTENTREPLACE || (function() {
  var _args = {}; // private

  return {
    init: function(Args) {
      _args = Args;
      // some other initialising
    },
    executeAjaxCall: function() {
      $(document).ready(function() {
        $.ajax({
          url: _args[0],
          // data: {
          //     txtsearch: $('#appendedInputButton').val()
          // },
          type: "GET",
          dataType: "html",
          success: function(data) {
            data = data.replace(/\n/g, "");
            $obj = $(data);
            $obj.each(function(key, item) {
              if (item.className === 'mainContentRegion') {
                // console.log('div');
                $(_args[1]).append(item);
              }
              if (item.nodeName === 'SCRIPT') {
                // console.log('SCRIPT');
                $('body').append(item);
              }
              if (item.nodeName === 'STYLE') {
                // console.log('STYLE');
                $('head').append(item);
              }
            });
          },
          error: function(xhr, status) {
            alert("Sorry, there was a problem!");
          },
          complete: function(xhr, status) {
            // console.log('hello');
          }
        });
      });
    }
  };
}());
