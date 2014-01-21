define(function(require, exports, module) {
    var Marionette = require('marionette'),
        Modernizr = require('modernizr'),
        YT = require('youtube');


    return Marionette.ItemView.extend({
        previousPos: null,
        hasTriggeredStartPlay: false,
        ui: {
            ytvideo: '#ytvideo',
        },
        initialize: function() {
            this.listenTo(this, 'show', this.loadPlayer);
            this.listenTo(this, 'video:ready', this.autoPlay);
            this.listenTo(this, 'close', this._onClose);
        },
        loadPlayer: function() {
            this.ytDivID = 'youtube-' + new Date().getTime();
            this.ui.ytvideo.attr('id', this.ytDivID);
            if (!YT.Player) {
                setTimeout(_.bind(this.loadPlayer, this), 500);
                return;
            }
            var self = this;
            this.YTplayer = new YT.Player(this.ytDivID, {
                width: self.model.get('width') || "1000",
                height: self.model.get('height') || "563",
                videoId: self.model.get('ytid'),
                playerVars: self.model.get('style'),
                events: {
                    onReady: function() {
                        self.trigger('video:ready');
                        self._onVideoReady();
                    },
                    onError: function(err) {
                        console.log(err);
                    },
                    onStateChange: _.bind(function(event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            self.trigger('video:end');
                            self.onVideoEnd();
                        }
                        if (event.data === YT.PlayerState.PLAYING) {
                            self.trigger('video:play');
                            self.onVideoPlay();
                        }
                        if (event.data === YT.PlayerState.PAUSED) {
                            self.trigger('video:pause');
                            self.onVideoPause();
                        }
                        if (event.data === YT.PlayerState.BUFFERING) {
                            self.trigger('video:buffering');
                            self.onVideoBuffering();
                        }
                        self.trigger('video:statechange');
                    }, this)
                }
            });
        },
        _onClose: function() {
            this.destroyVideo();
        },
        playVideo: function() {
            this.YTplayer.playVideo();
        },
        stopVideo: function() {
            this.YTplayer.stopVideo();
        },

        unMuteVideo: function() {
            this.YTplayer.unMute();
        },

        muteVideo: function() {
            this.YTplayer.mute();
        },

        pauseVideo: function() {
            this.YTplayer.pauseVideo();
        },
        destroyVideo: function() {
            this.YTplayer.destroy();
        },
        restartVideo: function(timecode) {
            this.YTplayer.seekTo(timecode || 0);
        },
        seekTo: function(seconds) {
            this.YTplayer.seekTo(seconds, false);
        },
        autoPlay: function() {
            if (this.model.get('autoplay') && !Modernizr.touch) {
                this.playVideo();
            }
        },
        loadVideoById: function(videoId, startSeconds) {
            startSeconds = !startSeconds ? 0 : startSeconds;
            this.YTplayer.loadVideoById(videoId, startSeconds);
        },
        getCurrentTime: function() {
            return this.YTplayer.getCurrentTime();
        },
        getPlayerState: function() {
            return this.YTplayer.getPlayerState();
        },
        _onVideoReady: function() {
            this.onVideoReady();
            this.playheadInterval = setInterval(_.bind(this._playheadCheck, this), 200);
        },
        _playheadCheck: function() {

            if (!this.hasTriggeredStartPlay && this.getCurrentTime() > 0) {
                this.hasTriggeredStartPlay = true;
                this.trigger('video:playstart');
            }
            if (this.previousPos == this.getCurrentTime()) return;
            if (this.getPlayerState() == YT.PlayerState.PLAYING || this.getPlayerState() == YT.PlayerState.PAUSED) {
                this.trigger('video:playheadupdate', this.getCurrentTime());
                this.onPlayheadUpdate(this.getCurrentTime());
            }
            this.previousPos = this.getCurrentTime();
        },



        //DO NOT TOUCH THESE, OVERRIDE THEM AS NEEDED BUT NEVER TOUCH!
        onVideoEnd: function() {},
        onVideoPlay: function() {},
        onVideoPause: function() {},
        onVideoReady: function() {},
        onVideoBuffering: function() {},
        onPlayheadUpdate: function(pos) {}
    });
});
