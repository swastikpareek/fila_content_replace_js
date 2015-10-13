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
            $obj.each(function(key, item) {
              if (item.nodeName === 'BASE') {
                $('head').append(item);
              }
              if (item.className === 'mainContentRegion') {
                $(_args[1]).append(item);
              }
              if (item.nodeName === 'SCRIPT') {
                $('body').append(item);
              }
              if (item.nodeName === 'STYLE') {
                $('head').append(item);
              }
              if ($obj.length === (key + 1)) {
                allContentLoaded = true;
              }
            });

            var checkContent = setInterval(function() {
              try {
                if (Drupal === undefined || Drupal.behaviors.homePageSettings === undefined) {
                  throw new Exception('contentUndefined', 'Drupal is not Defined');
                } else {
                  if (allContentLoaded) {
                    Drupal.behaviors.homePageSettings.attach(true);
                    clearInterval(checkContent);
                  }
                }
              } catch (e) {
                // console.log(e);
              }
            }, 100);
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
