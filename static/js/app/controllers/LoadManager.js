define(function(require, exports, module) {
    var Marionette = require('marionette');

    return Backbone.Marionette.Controller.extend({
        INTERSTITIAL_PATTERN: 'img/scenes/int{}/int_{}.jpg',
        PARALLAX_PATTERN: 'img/scenes/px{}/px_{}',

        intImgArr: [],
        pxImgArr: [],

        initialize: function(options) {
            this.timecodes = options.timecodes;
        },

        loadScene: function(index) {
            console.log('LoadManager -> loadScene -> load scene', index);

            if (this.timecodes[index].showLoader) {
                $('body').addClass('show-loader');
            }

            var clips = this.timecodes[index].clips;
            var tempArr = this.INTERSTITIAL_PATTERN.split('{}');
            var images = [];
            var self = this;
            this.intImgArr[index] = [];
            this.intImgArr[index].totalLoaded = 0;
            for (var i = 0; i < clips; i++) {
                var img = new Image();
                this.intImgArr[index][i] = img;

                $(img).bind('load', function() {
                    self.onImgLoaded(index);
                });
                var imgPath = tempArr[0] + index + tempArr[1] + i + tempArr[2];
                img.src = imgPath;
                img.draggable = false;
            }
        },

        loadPx: function(index) {
            var px_layers = this.timecodes[index].px_layers;
            var tempArr = this.PARALLAX_PATTERN.split('{}');
            var images = [];
            var self = this;
            this.pxImgArr[index] = [];
            this.pxImgArr[index].totalLoaded = 0;
            for (var i = 0; i < px_layers; i++) {
                var img = new Image();
                this.pxImgArr[index][i] = img;

                $(img).bind('load', function() {
                    self.onPxLoaded(index);
                });
                var imgPath = tempArr[0] + index + tempArr[1] + i + tempArr[2];
                // workaround for varying file extensions
                // since we know that the background image is always a jpg...
                // well use that, and then rest will be png
                if (i === 0) {
                    img.src = imgPath + '.jpg';
                } else {
                    img.src = imgPath + '.png';
                }
                img.draggable = false;
            }
        },

        onImgLoaded: function(sceneIndex) {
            var clips = this.timecodes[sceneIndex].clips;
            this.intImgArr[sceneIndex].totalLoaded++;
            var percent = this.intImgArr[sceneIndex].totalLoaded / clips;
            this.trigger('scene:percent:update', percent);
            if (this.intImgArr[sceneIndex].totalLoaded == clips) {
                this.timecodes[sceneIndex].done = true;
                this.trigger('scene:loaded', sceneIndex);
            }
        },

        onPxLoaded: function(sceneIndex) {
            // Don't do anything here brother
            /*var px_layers = this.timecodes[sceneIndex].px_layers;
            this.pxImgArr[sceneIndex].totalLoaded++;
            var percent = this.pxImgArr[sceneIndex].totalLoaded / px_layers;
            this.trigger('parallax:percent:update', percent);
            if (this.pxImgArr[sceneIndex].totalLoaded == px_layers) {
                this.timecodes[sceneIndex].done = true;
                this.trigger('parallax:loaded', sceneIndex);
            }*/
        },

        loadNextScene: function(index) {
            // Make sure we dont try and load assets after
            // the last scene
            if (index < this.timecodes.length) {
                this.loadScene(index);
                this.loadPx(index);
            }
        }
    });
});
