
// 
(function( $ ){

	var pluginName = 'rImg',
		selector = '[data-rimg]',
		$root = false,
		$style = false,
		methods = {
			init: function() {
				//console.log("$.fn[ '"+ pluginName +"' ].init();");

				// make sure this String prototype exists
				if ( typeof( String.endsWith ) == "undefined" ) { 
					String.prototype.endsWith = function(suffix) {
						return this.indexOf(suffix, this.length - suffix.length) !== -1;
					};
				};
				
				// create style block, if necessary
				if ( $root.length > 0 ) {
					$style = $('<style>')
							.attr('id', 'rimg_styles')
							.appendTo( $('head') );
				} else {
					return;
				}
				
				// go through each image, and add background-image styles
				$root.each( function(index) {
					var $this = $( this );
					methods.writeCSS( $this );
				});
			},
			
			writeCSS: function( $this ) {
				// get the background attributes we need
				var imgId = $this.attr('id');
				var src   = $this.attr('data-rimg');
				var ratio = $this.attr('data-rimg-ratio');
				var sizes = $this.attr('data-rimg-sizes').split(',');

				// if there is no ID, we should give it one
				if ( !imgId ) {
					imgId = 'rImg-' + Math.floor((Math.random()*10000000)+1);
					$this.attr('id', imgId);
				};

				// figure out what sizes we need
				var sizeData = [], tmp = [], strTmp = '';
                for (var i=0; i<sizes.length; i++) {
					tmp = sizes[i].split('-');
					if ( tmp.length == 1) {
						sizeData.push( [ tmp[0], tmp[0], false ] );
					} else {
						if ( tmp[0].endsWith('x2') )
							// retina
							sizeData.push( [ parseInt( tmp[0].substring(0, tmp[0].length-2) ), parseInt( tmp[1] ), true ] );
						else 
							// non-retina
							sizeData.push( [ parseInt( tmp[0] ), parseInt( tmp[1] ), false ] );
					};
				};
				console.log(sizeData);



				// declare string vars we'll need
				var x2Query = '';
				//var imgSrc = src.replace("?size?",  sizes[0]);
				//	imgSrc = imgSrc.replace("?ratio?", ratio);
				var imgSrc = methods.getUrl( src, sizeData[0][1], ratio );

				// define base style declaration
				var html =  '#'+ imgId +' {background-image:url("'+ imgSrc +'")}\n';
				
				// subsequent @media queries
				for (var i=1; i<sizes.length; i++) {
					// image size
					//imgSrc = src.replace("?size?", sizeData[i][1]);
					//imgSrc = imgSrc.replace("?ratio?", ratio);
					imgSrc = methods.getUrl( src, sizeData[i][1], ratio );
					// retina display extension
					x2Query = ( sizeData[i][2] ) ? 'and (-webkit-min-device-pixel-ratio: 1.5)' : '';
					// style declaration
					html += '@media (min-width:'+ sizeData[i][0] +'px) '+ x2Query +' { #'+ imgId +' {background-image:url("'+ imgSrc +'")}  }\n';
				};
				html += '\n';
				
				// add sizes to <style> node
				$style.append( html );
				
				// add 'loaded' to image, for good measure
				$this.addClass('rimg-loaded');
			},

			getUrl: function( imgSrc, imgSize, imgRatio ) {
				var src = imgSrc.replace("?size?", imgSize);
					src = src.replace("?ratio?", imgRatio);
				return src;
			},

			EOF: null
		};

	// COLLECTOR
	$.fn[pluginName] = function () {
		$root = this;
		methods.init();
		return $root;
	};

	// ON DOM LOAD
	$( function() {
		//console.log("$( '"+ selector +"' ).fn[ '"+ pluginName +"' ] auto-init() method: ");
		$( selector )[ pluginName ]();
	} );

	// RUNS IMMEDIATELY
	$( 'html' ).addClass( 'jsEnabled' );	

})(jQuery);

