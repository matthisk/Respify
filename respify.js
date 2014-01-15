/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}());

/**
 * Respify responsive image library
 *
 * Parse a responsive image from a set of data attributes trough media queries, depends upon the matchMedia polyfill for older browsers
 * @version  0.1.0
 * @author  Matthisk Heimensen
 */
var init = function( $ ) {

    $.respify = {};

    $.respify.DEFAULTS = {
        background : false,
        dryRun : false,
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

        return match.src;
    };

    Picture.prototype.setMatch = function() {
        if( ! this.settings.background ) {
            this.$el.attr( 'src', this.currentMatch.src );
        } else {
            this.$el.css( 'background-image', 'url(' + this.currentMatch.src + ')' );
        }
    };

    $.fn.respify = function( options ) {
        var settings = $.extend({}, $.respify.DEFAULTS, options);
        this.dryRunResults = [];

        $els = $( this );

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

            return match.src;
        });
    }
}

if( typeof window.define === 'function' && window.define.amd ) {
    define( [ 'jquery' ], init );
} else {
    init( window.jQuery );
}