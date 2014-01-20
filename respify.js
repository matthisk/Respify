/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}());

/**
 * Respify responsive image library
 *
 * Parse a responsive image from a set of data attributes trough media queries, depends upon the matchMedia polyfill for older browsers
 * @version  0.2.1
 * @author  Matthisk Heimensen
 */
var init = function( $ ) {

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
         * If in browser which does not support media queries the following will return false
         * Where this should always return true if the browser supports media queries.
         * @type {Bool}
         */
        mediaQueriesEnabled : matchMedia('(min-width: 1px)').matches
    };

    var Picture = function( $el, settings ) {
        this.$el = $el;
        this.types = [];
        this.currentMatch == undefined;
        this.settings = settings;
    };

    Picture.prototype.match = function( dry ) {
        var match = undefined,
            i = this.types.length - 1;

        while( ! match && i >= 0 ) {
            var possibility = this.types[ i ];

            if( ! possibility.media || window.matchMedia( possibility.media || '' ).matches ) {
                match = possibility;
            }

            i--;
        }

        if( ! dry && match !== this.currentMatch ) {
            this.currentMatch = match;
            this.setMatch();
        }

        return match;
    };

    Picture.prototype.setLast = function( ) {
        this.currentMatch = this.types[ this.types.length - 1 ];
        this.setMatch();
    };

    Picture.prototype.setMatch = function() {
        if( ! this.settings.background ) {
            this.$el.attr( 'src', this.currentMatch.src );
        } else {
            this.$el.css( 'background-image', 'url(' + this.currentMatch.src + ')' );
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
                var match;
                if( ! settings.dryRun ) {
                    match = picture.match();

                    // Recalculate image to set on resize
                    $( window ).resize(function() {
                        picture.match();
                    });
                } else {
                    match = picture.match( true );
                }

                dryRunMatches.push({
                    node : $el,
                    match : match
                });
            // Else use the last picture from the set
            } else {
                picture.setLast();
            }
        });

        if( dryRunMatches.length === 1 ) {
            return dryRunMatches[ 0 ].match.src
        } else {
            return dryRunMatches
        }
    }
}

if( typeof window.define === 'function' && window.define.amd ) {
    define( [ 'jquery' ], init );
} else {
    init( window.jQuery );
}