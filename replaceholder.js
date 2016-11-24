(function (global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD require.js
        define('replaceholder', ['jquery'], function ($) {
            $.fn.replaceholder = factory();
        });
    } else if (typeof exports !== 'undefined') {
        // Node.js CommonJS
        require('jquery').fn.replaceholder = factory();
    } else if (typeof global.$ === 'function' && typeof global.$.fn === 'object') {
        // Global scope
        global.$.fn.replaceholder = factory();
    }
}(this, function () {
    'use strict';

    // options argument is an object that may contain:
    // src: 'newImage.png' // required image url
    // bg: false           // replaces src attribute (false) or background-image style (true) of the element
    // doneClass: 'string' // class or classes that will be added to the element when image is loaded
    // failClass: 'string' // class or classes that will be added to the element if image can't be loaded
    // replaceClass: false // doneClass and failClass will rewrite (true) or be added (false) current value
    return function (options) {
        options = options || {};
        return this.each(function () {
            var img = this;
            var src = options.src || img.getAttribute('data-src');
            if (!src) {
                return;
            }
            var background = options.bg || img.getAttribute('data-type') === 'bg' ||
                img.tagName.toLowerCase() !== 'img';
            var doneClass = (typeof options.doneClass === 'string') ? options.doneClass : undefined;
            var failClass = (typeof options.failClass === 'string') ? options.failClass : undefined;

            var changeClass = function (newClass) {
                if (!newClass) {
                    return;
                }
                if (options.replaceClass) {
                    img.setAttribute('class', newClass);
                } else {
                    img.className = (img.className + ' ' + newClass).trim();
                }
            };

            var tempImg = new Image();
            tempImg.onload = function () {
                if (background) {
                    img.style.backgroundImage = 'url("' + this.src + '")';
                } else {
                    img.setAttribute('src', this.src);
                }
                changeClass(doneClass);
            };
            tempImg.onerror = function () {
                changeClass(failClass);
            };
            tempImg.src = src;
        });
    };
}));
