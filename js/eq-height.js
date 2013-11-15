// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function($, window, document, undefined) {

  // undefined is used here as the undefined global 
  // variable in ECMAScript 3 and is mutable (i.e. it can 
  // be changed by someone else). undefined isn't really 
  // being passed in so we can ensure that its value is 
  // truly undefined. In ES5, undefined can no longer be 
  // modified.
  
  // window and document are passed through as local 
  // variables rather than as globals, because this (slightly) 
  // quickens the resolution process and can be more 
  // efficiently minified (especially when both are 
  // regularly referenced in your plugin).

  var pluginName = 'eqHeight';
  
  var defaults = {
    backupOriginalElement: false,
    getDataAttr: true,

    onInit: function() {},
    onDestroy: function() {}
  };
  
  // The actual plugin constructor
  function Plugin(element, options) {
    var el = element;
    var $el = $(element);
    
    var originalEl;
    var $originalEl;
    
    // jQuery has an extend method that merges the 
    // contents of two or more objects, storing the 
    // result in the first object. The first object 
    // is generally empty because we don't want to alter 
    // the default options for future instances of the plugin
    options = $.extend({}, $.fn[pluginName].defaults, options);
    
    function init() {
      if (options.backupOriginalElement) backupOriginalElement();
      if (options.getDataAttr) getDataAttr();
      
      events();

      var maxHeight = 0;
      var oh;
      $el.each(function() {
        oh = $(this).outerHeight();
        

        if (oh > maxHeight) {
          maxHeight = oh;

          console.log('higher')
        }
        console.log(oh)
      });

      $el.height(maxHeight);
      
      hook('onInit');
    }

    function backupOriginalElement() {
      $originalEl = $el.clone(true);
    }
    
    function restoreOriginalElement($el) {
      $el.replaceWith($originalEl.wrap('<div>').parent().html());
    }

    /**
     * Destroy plugin.
     * Usage: $('#el').demoplugin('destroy');
     */
    function destroy() {
      $el.each(function() {
        var el = this;
        var $el = $(this);
        
        if (options.backupOriginalElement) restoreOriginalElement($el);
 
        hook('onDestroy');

        // remove plugin instance from the element
        $el.removeData('plugin_' + pluginName);
      });
    }
    
    // get/set option(s)
    function option(arg1, arg2) {
      if (arg1 === undefined) {
        // plugin('option') returns options object
        return options;
      } else if (typeof arg2 == 'string') {
        // plugin('option', optionName, value) sets value of given option
        options[arg1] = arg2;
      } else if (arg2 === undefined) {
        if (typeof arg1 == 'string') {
          // plugin('option', optionName) returns value of given option
          return options[arg1];
        } else if (typeof arg1 == 'object') {
          // plugin('option', optionsObject) extends existing options object with given options object
          $.extend(options, arg1);
        } 
      }
    }
    
    /**
     * Callback hooks.
     * Usage: In the defaults object specify a callback function:
     * hookName: function() {}
     * Then somewhere in the plugin trigger the callback:
     * hook('hookName');
     */
    function hook(hookName, args) {
      if (options[hookName] !== undefined) {
        // IE7-8 doesn't support undefined as second argument of apply method
        if (args === undefined) args = [];

        // Call the user defined function.
        // Scope is set to the jQuery element we are operating on.
        options[hookName].apply(el, args);
      }
    }

    
    function getDataAttr() {
      $.each($el.data(), function(key, val) {
        if (options[key] !== undefined) {
          options[key] = val;
        }
      });
    }
    
    function events() {

    }
    
    init();
    
    return {
      option: option,
      destroy: destroy
    };
  }
  
  $.fn[pluginName] = function(options) {
    // If the first parameter is a string, treat this as a call to
    // a public method.
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      
      this.each(function() {
        // Check that the element has a plugin instance, and that
        // the requested public method exists.
        if ($.data(this, 'plugin_' + pluginName) &&
            typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          // Call the method of the Plugin instance, and Pass it
          // the supplied arguments.
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });
      
      if (returnVal !== undefined) {
        // If the method returned a value, return the value.
        return returnVal;
      } else {
        // Otherwise, returning 'this' preserves chainability.
        return this;
      }
    // If the first parameter is an object (options), or was omitted,
    // instantiate a new instance of the plugin.
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        // Only allow the plugin to be instantiated once.
        if (!$.data(this, 'plugin_' + pluginName)) {
          // Pass options to Plugin constructor, and store Plugin
          // instance in the elements jQuery data object.
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };
  
  $.fn[pluginName].defaults = defaults;

})(jQuery);
