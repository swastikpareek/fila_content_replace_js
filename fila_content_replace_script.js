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
      jQuery(document).ready(function() {
        var allContentLoaded = false;
        jQuery(_args[1]).empty();
        jQuery(_args[1]).addClass('CORScontentIsLoading');
        jQuery(_args[1]).append('<div class="CORScontentLoaderDiv">Loading Your Content Please wait...</div>');

        function Exception(type, message) {
          this.message = message;
          this.name = type;
        }
        jQuery.ajax({
          url: _args[0],
          type: "GET",
          dataType: "html",
          success: function(data) {
            data = data.replace(/\n/g, "");
            jQueryobj = jQuery(data);
            var scriptsArray = [];
            var stylesArray = [];
            jQueryobj.each(function(key, item) {
              if (item.nodeName === 'BASE') {
                jQuery('head').append(item);
                // Appending the base tag on head tag
              }
              if (item.nodeName === 'SCRIPT') {
                scriptsArray.push(item);
                //Collecting all the script tags
              }
              if (item.nodeName === 'STYLE') {
                jQuery('head').append(item);
                //Appending all the styles tag
              }
            });
            jQueryobj.each(function(key, item) {
              if (item.className === 'mainContentRegion') {
                jQuery(_args[1]).append(item);
                //Appending the HTML
              }
            });
            //First of adding Drupal.settings to an array
            scriptsArray.forEach(function(d, i) {
              if (d.getAttribute('src') === null) {
                jQuery('body').append(d);
                if (d.innerHTML.indexOf('Drupal.settings') > -1) {
                  var drupalSettingsJSON = d.innerHTML.substring(d.innerHTML.indexOf('jQuery.extend(Drupal.settings,'), d.innerHTML.indexOf('//--><!]]>'));
                  swastik = drupalSettingsJSON;
                }
              }
            });
            //After that adding all scripts other than custom.js and contentreplace.js
            // scriptsArray.forEach(function(d, i) {
            //   if (d.getAttribute('src') !== null && (d.getAttribute('src').indexOf('custom.js') === -1 && d.getAttribute('src').indexOf('contentReplaceScriptAddon.js') === -1)) {

            //     // console.log('check' + d.getAttribute('src').indexOf('jquery.min.js'));
            //     d.setAttribute('async', true);
            //     jQuery('body').append(d);
            //   }
            // });
            // //Adding custom.js file
            // scriptsArray.forEach(function(d, i) {
            //   if (d.getAttribute('src') !== null) {
            //     if (d.getAttribute('src').indexOf('custom.js') > -1) {
            //       d.setAttribute('defer', true);
            //       jQuery('body').append(d);
            //     }
            //   }
            // });
            // // ADding contentReplaceScriptAddon.js lastly to ensure delayed execution
            // scriptsArray.forEach(function(d, i) {
            //   if (d.getAttribute('src') !== null) {
            //     if (d.getAttribute('src').indexOf('contentReplaceScriptAddon.js') > -1) {
            //       d.setAttribute('defer', true);
            //       jQuery('body').append(d);
            //     }
            //   }
            // });
            var url = jQuery('base').attr('href');

            function getScripts(i) {
              if (scriptsArray[i] !== undefined) {
                if (scriptsArray[i].getAttribute('src') !== null && scriptsArray[i].getAttribute('src').indexOf('http://') === -1) {
                  var req_arr = url + scriptsArray[i].getAttribute('src');
                  console.log(req_arr);
                  jQuery.getScript(req_arr, function() {
                    // console.log(scriptsArray[i].getAttribute('src'));
                    getScripts(i + 1);
                  });
                } else {
                  getScripts(i + 1);
                }
              }
            }
            getScripts(0);
          },
          error: function(xhr, status) {
            console.log("Sorry, there was a problem! Status " + status);
          }
        });
      });
    }
  };
}());
