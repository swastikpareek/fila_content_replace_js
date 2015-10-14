var swastik;
var filesExecuted = false;
var CONTENTREPLACE = CONTENTREPLACE || (function() {
  var _args = {}; // private

  return {
    init: function(Args) {
      _args = Args;
      // some other initialising
    },
    executeAjaxCall: function() {
      $(document).ready(function() {
        var allContentLoaded = false;
        $(_args[1]).empty();
        $(_args[1]).addClass('CORScontentIsLoading');
        $(_args[1]).append('<div class="CORScontentLoaderDiv">Loading Your Content Please wait...</div>');

        function Exception(type, message) {
          this.message = message;
          this.name = type;
        }
        $.ajax({
          url: _args[0],
          type: "GET",
          dataType: "html",
          success: function(data) {
            data = data.replace(/\n/g, "");
            $obj = $(data);
            var scriptsArray = [];
            var stylesArray = [];
            $obj.each(function(key, item) {
              if (item.nodeName === 'BASE') {
                $('head').append(item);
              }
              if (item.nodeName === 'SCRIPT') {
                scriptsArray.push(item);
              }
              if (item.nodeName === 'STYLE') {
                $('head').append(item);
              }
            });
            $obj.each(function(key, item) {
              if (item.className === 'mainContentRegion') {
                $(_args[1]).append(item);
              }
            });
            scriptsArray.forEach(function(d, i) {
              if (d.getAttribute('src') === null) {
                if (d.innerHTML.indexOf('Drupal.settings') > -1) {
                  var drupalSettingsJSON = d.innerHTML.substring(d.innerHTML.indexOf('jQuery.extend(Drupal.settings,'), d.innerHTML.indexOf('//--><!]]>'));
                  swastik = drupalSettingsJSON;
                }
              }
            });
            scriptsArray.forEach(function(d, i) {
              if (d.getAttribute('src') !== null && d.getAttribute('src').indexOf('custom.js') === -1) {
                $(body).append(d);
              }
            });
            scriptsArray.forEach(function(d, i) {
              if (d.getAttribute('src').indexOf('custom.js') > -1) {
                $(body).append(d);
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
