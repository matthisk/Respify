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
        selectorPattern : /^data\-respify\-(small|medium|large)$/,
        dataPattern : /^\{(.*)\},\{(.*)\}$/,
        dataMediaQuery : 1,
        dataSrc : 2
    };

    $.fn.respify = function( options ) {
        var settings = $.extend({}, $.respify.DEFAULTS, options);
        this.dryRunResults = [];

        var setSrc = function( $el, src ) {
            if( ! settings.background ) {
                $el.attr( 'src', src );
            } else {
                $el.css( 'background-image', 'url(' + src + ')' );
            }
        };

        $els = $( this );

        $els.each(function() {
            var $el = $( this ),
                attr = $el.get( 0 ).attributes,
                types = [];

            for( var i = 0; i < attr.length; i++ ) {

                if( settings.selectorPattern.test( attr[ i ].name ) && settings.dataPattern.test( attr[ i ].value ) ) {
                    types.push( attr[ i ].value );
                }

            }

            for( var i in types ) {
                var matched = settings.dataPattern.exec( types[ i ] );
                var mediaQuery = matched[ settings.dataMediaQuery ];
                var src = matched[ settings.dataSrc ];

                if( matchMedia( mediaQuery ).matches ) {
                    this.dryRunResults.push( { el : $el, src : src } );
                    if( ! settings.dryRun ) {
                        setSrc( $el, src );
                    }
                    break;
                }
            }
        }.bind( this ));

        if( this.dryRunResults.length === 1) {
            return this.dryRunResults[ 0 ].src;
        } else {
            return this.dryRunResults;
        }
    }


}

if( typeof window.define === 'function' && window.define.amd ) {
    define( [ 'jquery' ], init );
} else {
    init( window.jQuery );
}