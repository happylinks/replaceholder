(function ($) {
    $.fn.replaceholder = function () {
        return this.each(function () {
            var img = $(this);
            var src = img.data('src');
            var type = img.data('type');

            var new_img = new Image();
            new_img.onload = function () {
                if (type === 'bg'){
                    img.css('background-image', 'url("' + this.src + '")');
                } else {
                    img.attr('src', this.src);
                }
                delete new_img;
            };
            if (src){
                new_img.src = src;
            }
        });
    };
}(jQuery));

