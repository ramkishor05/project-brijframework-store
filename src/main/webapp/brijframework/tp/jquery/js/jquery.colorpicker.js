/*
 * INFORMATION
 Jquery Color Picker
 */
(function ($) {
  $.fn.extend({
    colorpicker: function (options) {
      //console.log("in colorpicker,.....");
      //Settings list and the default values
      var defaults = {
        label: '',
        size: 20,
        count: 6,
        colors: [],
        hide: true
      };

      var options = $.extend(defaults, options);
      var obj;
      var colors = {};

      var wrap = $('<div class="colorpicker-wrap"></div>');
      var label = $('<div class="colorpicker-label"></div>');
      var trigger = $('<div class="colorpicker-trigger"></div>');
      var picker = $('<div style="width: ' + (options.size + 4) * options.count + 'px" class="colorpicker-picker"></div>');
      var info = $('<div class="colorpicker-picker-info"></div>');
      var clear = $('<div style="clear:both;"></div>');

      return this.each(function () {
        obj = this;
//console.log("length : "+options.colors.length);
        //build an array of colors
        for (var i = 0; i < options.colors.length; i++) {
          colors[i] = {};
          colors[i].color = options.colors[i];
          colors[i].value = options.colors[i];
        }
        /*$(obj).children('option').each(function(i, elm) {
         colors[i] = {};
         colors[i].color = $(elm).text();
         colors[i].value = $(elm).val();
         });*/
        create_wrap();
        if (options.label != '')
          create_label();
        create_trigger();
        create_picker();
        wrap.append(label);
        wrap.append(trigger);
        wrap.append(picker);
        wrap.append(clear);
        $(obj).after(wrap);
        if (options.hide)
          $(obj).css({
            position: 'absolute',
            left: -10000
          });
      });


      function create_wrap() {
        wrap.mouseleave(function () {
          picker.fadeOut('slow');
        });
      }

      function create_label() {
        label.text(options.label);
        label.click(function () {
          trigger.click()
        });
      }

      function create_trigger() {
        trigger.click(function () {
          var offset = $(this).position();
          var top = offset.top;
          var left = offset.left + $(this).width() + 5;
          $(picker).css({
            'top': top,
            'left': left
          }).fadeIn('slow');
        });
      }

      function create_picker() {
        //	console.log("in create,.....");
        picker.append(info);
        for (var i in colors) {
          picker.append('<span class="colorpicker-picker-span ' + (colors[i].color == $(obj).children(":selected").text() ? ' active' : '') + '" rel="' + colors[i].value + '" style="background-color: #' + colors[i].color + '; width: ' + options.size + 'px; height: ' + options.size + 'px;"></span>');
        }
        trigger.css('background-color', '#' + $(obj).children(":selected").text());
        // info.text('#'+$(obj).children(":selected").text());  // Closed  For Selected Color Code
        // picker.children(".colorpicker-picker-span").hover(function() {
        //     info.text('#' + $(this).attr('rel'));
        //  }, function() {
        //    info.text('#' + picker.children('.colorpicker-picker-span.active').attr('rel'));
        //  });  Closed By


        picker.delegate(".colorpicker-picker-span", "click", function () {
          $(obj).val($(this).attr('rel'));
          $(obj).change();
        });
        $(obj).change(function () {
          var val = $(obj).val();
          //   info.text('#' + val);    // Closed  For Selected Color Code
          picker.children('.colorpicker-picker-span.active').removeClass('active');
          var active = $(picker).find('span.colorpicker-picker-span[rel="' + val + '"]');
          $(active).addClass('active');
          trigger.css('background-color', '#' + val);
        });
        $(obj).after(picker);
      }
    }
  });
})(jQuery);