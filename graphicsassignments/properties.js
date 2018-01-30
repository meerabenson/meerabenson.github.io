//HW470: light properties
var lightPosition = vec4(2.0, -2.0, 2.0, 0.0 );
var lightAmbient = vec4(0.0, 0.0, 0.0, 1.0 );
var lightRed = vec4(0.4,0.0,0.0,1.0); //red light
var lightWhite = vec4(0.0, 0.0, 0.0, 1.0 ); //white light
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );



//HW470: 3 different cylinder material properties
var materialAmbient1 = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse1 = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular1 = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess1 = 8.0;

var materialAmbient2 = vec4( 1.0, 0.0, 0.0, 1.0 );
var materialDiffuse2 = vec4( 1.0, 0.8, 1.0, 1.0 );
var materialSpecular2 = vec4( 1.0, 0.8, 1.0, 1.0 );
var materialShininess2 = 5.0;

var materialAmbient3 = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse3 = vec4( 0.4, 0.8, 0.5, 1.0 );
var materialSpecular3 = vec4( 0.0, 0.3, 1.0, 1.0 );
var materialShininess3 = 10.0;



//HW470: 3 different parametric material properties
var materialAmbientP1 = vec4( 1.0, 0.0, 0.0, 1.0 );
var materialDiffuseP1 = vec4( 0.9, 0.8, 0.5, 1.0 );
var materialSpecularP1 = vec4( 0.0, 0.0, 1.0, 1.0 );
var materialShininessP1 = 10.0;

var materialAmbientP2 = vec4( 1.0, 1.0, 0.5, 1.0 );
var materialDiffuseP2 = vec4( 1.0, 0.8, 1.0, 1.0 );
var materialSpecularP2 = vec4( 0.0, 0.8, 0.0, 1.0 );
var materialShininessP2 = 5.0;

var materialAmbientP3 = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuseP3 = vec4( 0.4, 0.8, 0.4, 1.0 );
var materialSpecularP3 = vec4( 0.0, 0.3, 0.9, 1.0 );
var materialShininessP3 = 2.0;