define(function(require, exports, module) {
    var BaseVideoPlayer = require('app/views/BaseVideoPlayerView'),
        template = require('hbs!templates/hero-video-player'),
        HeroVideoModel = require('app/models/HeroVideoModel');

    return BaseVideoPlayer.extend({
        className: 'embed-container',
        events: {

        },
        ui: _.extend({

        }, BaseVideoPlayer.prototype.ui),
        template: template,
        onPlayheadUpdate: function(pos) {
            var index = null;
            if (this.timecodes === null) return;
            for (var i = this.timecodes.length - 1; i >= 0; i--) {
                //within timecode timefame
                if (pos > this.timecodes[i].start && pos < this.timecodes[i].end) {
                    console.log('HeroVideoPlayerView -> onPlayheadUpdate -> index:', i);
                    index = i;
                    break;
                }
            }

            // make sure it only dispatches once each time it changes
            if (index != this.itemInView) {

                this.itemInView = index;

                if (this.itemInView === null) {
                    //hide it?
                } else {
                    this.lastItemInView = this.itemInView;
                    this.displayOverlay();
                }
            }
        },
        displayOverlay: function() {
            console.log('HeroVideoPlayerView -> displayOverlay -> itemInView:', this.itemInView);
            this.trigger('scene:show', this.itemInView);
            this.pauseVideo();
        },

        initialize: function(options) {
            BaseVideoPlayer.prototype.initialize.apply(this, arguments);
            this.model = new HeroVideoModel();
            this.timecodes = options.timecodes;
        },

        onRender: function() {
            this.preloadSpriteAnimations();
        },

        preloadSpriteAnimations: function() {
            var myImages = ['img/sprites/orb-animation.png', 'img/sprites/smoke-animation.png', 'img/sprites/smoke-text-animation.png'];
            for (var i = myImages.length - 1; i >= 0; i--) {
                var img = new Image();
                img.src = myImages[i];
            }
        },

        onVideoPlay: function() {
            this.model.set('ended', false);
            if (localStorage.getItem('soundOff')) {
                this.trigger('sound:off', this);
            }
        },

        onVideoEnd: function() {
            console.log('---- video ended ----');
            this.model.set('ended', true);
            this.trigger('video:ended', this);
            ga('send', 'event', 'Trailer', 'end');
        }

    });
});
