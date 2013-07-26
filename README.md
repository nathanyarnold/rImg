rImg
====

A jQuery plugin for the display of 'responsive design' images via CSS background image declarations

Feel free to clone and use at your own risk. Note, this isn't an open source project, it's just publically available. That said, if you'd like to collaborate on this, let me know. 

<em>Note: Doesn't work in IE <=8. Yet. </em>

<strong>Basic Usage:</strong>

Attach a 'data-rImg="&lt;filename&gt;"' attribute to any span tags you'd like to use as an image. There are two tokens that are necessary, ?ratio? for the image ratio, and ?size? for the image size. Put these in your src filepath and make that the value for the 'data-rImg' attribute. Eg. &lt;span data-rimg="img/?ratio?/?size?.jpg" /&gt;

Add a 'data-rimg-ratio' attribute to define the ratio of the image you'd like to use. Eg. '4x3' or '16x9'

Add a 'data-rimg-sizes' attribute to define the various @media breakpoints (and corresponding image size values) you'd like to use. Add these in '-' seperated pairs (eg. 320-320 for @media (min-width:320px) and an image 320px wide). Use the 'x2' extension for retina display images (eg. 320x2-320 for @media (min-width:320px) and (-webkit-min-device-pixel-ratio: 1.5) and an image 320px wide). all query/size pairs should be comma-separated. Eg: data-img-sizes="320-320,320x-640,640-640,640x2-1280"

See the example-js.html page as an example of this in action. 

