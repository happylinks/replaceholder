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

    /**
     * Extending or replacing DOM element class list
     * @param {HTMLElement} el - DOM element
     * @param {string} newClass - Class list that will be applied to the element
     * @param {boolean} [overwriteClass] - Overwrites element's class(es) (true); otherwise adds them (false)
     */
    var changeClass = function (el, newClass, overwriteClass) {
        if (!el || !newClass) {
            return;
        }
        if (overwriteClass) {
            el.setAttribute('class', newClass.trim());
        } else {
            el.className = (el.className + ' ' + newClass).trim();
        }
    };

    /**
     * Pass an object with image url, type and classes to be added when load ends or fails
     * @param {Object} [options] - Optional set of parameters
     * @param {string} [options.src] - URL of the image to load, can be used instead of data-src attribute
     * @param {boolean} [options.bg] - Sets background-image (true) or src (false); can be used instead of data-type="bg"
     * @param {string} [options.doneClass] - Class(es) that will be added to the element when image is loaded
     * @param {string} [options.failClass] - Class(es) that will be added to the element when image load fails
     * @param {boolean} [options.overwriteClass] - Overwrites element's class(es) (true); otherwise adds them (false)
     */
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

            var tempImg = new Image();
            tempImg.onload = function () {
                if (background) {
                    img.style.backgroundImage = 'url("' + this.src + '")';
                } else {
                    img.setAttribute('src', this.src);
                }
                changeClass(img, doneClass, options.overwriteClass);
            };
            tempImg.onerror = function () {
                changeClass(img, failClass, options.overwriteClass);
            };
            tempImg.src = src;
        });
    };
}));
