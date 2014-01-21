define(function(require, exports, module) {
    var Backbone = require('backbone');
    require('jquery.cookie');
    return Backbone.Model.extend({
        initialize: function() {

        },
        defaults: {
            ytid: 'yedffFht3f4',
            style: {
                autohide: 1,
                autoplay: 0,
                iv_load_policy: 3,
                color: "black",
                controls: 0,
                enablejsapi: 1,
                wmode: "transparent",
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                theme: "dark",
                cc_lang_pref: 'en',
                cc_load_policy: 0,
                //vq: "hd720"
            },
            autoplay: true,
            ended: false
        }
    });
});
