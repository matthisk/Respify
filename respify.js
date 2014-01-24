/**
 * Respify responsive image library
 *
 * Parse a responsive image from a set of data attributes trough media queries, depends upon the matchMedia polyfill for older browsers
 * @version  0.3.2
 * @author  Matthisk Heimensen <m@tthisk.nl>
 */
(function( w, factory ) {

    if( typeof w.define === 'function' && w.define.amd ) {
        define( [ 'jquery' ], factory );
    } else {
        factory( w.jQuery );
    }

})( window, function( $ ) {

    $.respify = {};

    $.respify.DEFAULTS = {

        /**
         * Set the matched image as background on the parent element
         * @type {Boolean}
         */
        background : false,

        /**
         * Dryrun only returns matched pictures but does not actually set them
         * @type {Boolean}
         */
        dryRun : false,

        /**
         * Callback function to call once a new image is set
         * @type {Function}
         */
        callback : undefined,

        /**
         * If in browser which does not support media queries the following will return false
         * Where this should always return true if the browser supports media queries.
         * @type {Bool}
         */
        mediaQueriesEnabled : matchMedia('(min-width: 1px)').matches
    };

    var Picture = function( $el, settings ) {
        this.$el = $el;
        this.types = [];
        this.currentMatch = { src : undefined, media : undefined };
        this.settings = settings;
    };

    Picture.prototype.match = function( dry, callback ) {
        var match = undefined,
            i = this.types.length - 1;

        while( ! match && i >= 0 ) {
            var possibility = this.types[ i ];

            if( ! possibility.media || window.matchMedia( possibility.media || '' ).matches ) {
                match = possibility;
            }

            i--;
        }

        var newMatch = match.src !== this.currentMatch.src;
        if( newMatch ) {
            this.currentMatch = match;
        }

        if( ! dry && newMatch ) {
            this.setMatch();
        }

        if( callback && newMatch ) {
            callback( match );
        }

        return match;
    };

    Picture.prototype.setImage = function( src, alt ) {
        if( ! this.$img ) {
            this.$img = $('<img>').appendTo( this.$el );
        }

        this.$img.attr({
            src : src,
            alt : alt
        });
    }

    Picture.prototype.setLast = function( ) {
        this.currentMatch = this.types[ this.types.length - 1 ];
        this.setMatch();
    };

    Picture.prototype.setMatch = function() {
        if( ! this.settings.background ) {
            this.setImage( encodeURI( this.currentMatch.src ), this.$el.data( 'alt' ) );
        } else {
            this.$el.css( 'background-image', 'url(' + encodeURI( this.currentMatch.src ) + ')' );
        }
    };

    $.fn.respify = function( options ) {
        var settings = $.extend({}, $.respify.DEFAULTS, options),
            $els = $( this ),
            dryRunMatches = [];

        $els.each(function() {
            var $el = $( this ),
                picture = new Picture( $el, settings );

            $el.find( 'span' ).each(function() {
                var $img = $( this );

                if( $img.data( 'src' ) ) {
                    picture.types.push({
                        src : $img.data( 'src' ),
                        media : $img.data( 'media' )
                    });

                    $img.remove();
                }
            });

            // When matchMedia api is supported set correct image
            if( settings.mediaQueriesEnabled ) {
                var match = picture.match( settings.dryRun, settings.callback );

                // Recalculate image to set on resize
                $( window ).resize(function() {
                    picture.match( settings.dryRun, settings.callback );
                });

                if( match ) {
                    dryRunMatches.push({
                        node : $el,
                        match : match
                    });
                }
            // Else use the last picture from the set
            } else {
                picture.setLast();
            }
        });

        return dryRunMatches;
    }
});
