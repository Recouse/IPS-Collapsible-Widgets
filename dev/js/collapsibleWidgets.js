;( function($, _, undefined){
    "use strict";

    /* Hide collapsed widgets */
    var hiddenWidgets = ips.utils.db.get( 'hiddenWidgets' );

    if( _.isObject( hiddenWidgets ) && _.size( hiddenWidgets ) ){
        _.each( hiddenWidgets, function (val, key) {
            $( '.ipsWidget[data-blockid="' + key + '"]' )
                .addClass( 'ipsWidget_hidden' )
                .find( '.ipsWidget_inner' )
                    .hide();
        });
    }

    /* Add buttons to the widgets */
    var closeLink = $( '<a href="#" class="ipsPos_right toggleWidgetLink" data-action="toggleWidget" _title="' + ips.getString('toggle_this_widget') + '" data-ipsTooltip></a>' );
    $( '.ipsWidget .ipsWidget_title' ).append( closeLink );

    /* Handle button click (toggle widget) */
    $( '[data-action=toggleWidget]' ).click( function (e) {
        e.preventDefault();

        var widget = $( e.currentTarget ).closest( '.ipsWidget' );
        var widget_content = widget.children( '.ipsWidget_inner' );

        if ( !widget.hasClass( 'ipsWidget_hidden' ) ) {
            widget_content.hide();
            widget.addClass( 'ipsWidget_hidden' );

           ips.utils.db.set( 'hiddenWidgets', widget.attr( 'data-blockid' ), true );
        } else {
            ips.utils.anim.go( 'fadeIn', widget_content );
            widget.removeClass( 'ipsWidget_hidden' );

            ips.utils.db.remove( 'hiddenWidgets', widget.attr( 'data-blockid' ) );
        }
    } );
}(jQuery, _));