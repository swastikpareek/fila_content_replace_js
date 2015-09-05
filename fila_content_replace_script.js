// var CONTENTREPLACE = CONTENTREPLACE || (function() {
//   var _args = {}; // private

//   return {
//     init: function(Args) {
//       _args = Args;
//       // some other initialising
//     },
//     executeAjaxCall: function() {
//       $(document).ready(function() {
//         function createXMLHttpRequest() {
//           try {
//             return new XMLHttpRequest();
//           } catch (e) {}
//           try {
//             return new ActiveXObject("Msxml2.XMLHTTP");
//           } catch (e) {}
//           alert("XMLHttpRequest not supported");
//           return null;
//         }
//         var xhReq = createXMLHttpRequest();
//         xhReq.open("GET", _args[0], false);
//         xhReq.send(null);
//         var serverResponse = xhReq.responseText;
//         var data = serverResponse.replace(/\n/g, "");
//         $obj = $(data);
//         $obj.each(function(key, item) {
//           if (item.className === 'mainContentRegion') {
//             $(_args[1]).html('');
//             $(_args[1]).append(item);
//           }
//           if (item.nodeName === 'SCRIPT') {
//             $('body').append(item);
//           }
//           if (item.nodeName === 'STYLE') {
//             $('head').append(item);
//           }
//         });
//       });
//     }
//   };
// }());

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

        function Exception(type, message) {
          this.message = message;
          this.name = type;
        }
        // console.log($('#body').text(''));
        $.ajax({
          url: _args[0],
          type: "GET",
          dataType: "html",
          success: function(data) {
            data = data.replace(/\n/g, "");
            $obj = $(data);
            $obj.each(function(key, item) {
              if (item.className === 'mainContentRegion') {
                $(_args[1]).empty();
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
                    Drupal.behaviors.homePageSettings.attach();
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
