var canvas;
var gl;
var cIndex = 0;

var NumVertices  = 36;
var maxNumCubes = 200;  
var maxNumVertices  = 3 * maxNumCubes;

var points = [];
var colors = [];
var speeds = [];
var mvMatrix;
var modelView;
var matrices = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var index = 0;
var axis = 0;
var theta = [ 0, 0, 0 ];

var thetas = [];
var thetaLoc;
var z;
var zPos;
var scale = 1;

var vertices = [
        vec3( -0.05, -0.05,  0.05 ),
        vec3( -0.05,  0.05,  0.05 ),
        vec3(  0.05,  0.05,  0.05 ),
        vec3(  0.05, -0.05,  0.05 ),
        vec3( -0.05, -0.05, -0.05 ),
        vec3( -0.05,  0.05, -0.05 ),
        vec3(  0.05,  0.05, -0.05 ),
        vec3(  0.05, -0.05, -0.05 )
    ];


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    var c = new cube(0,1);
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.1 );
    
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );

    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    z = gl.getUniformLocation(program, "zPos"); 
    thetaLoc = gl.getUniformLocation(program, "theta"); 
    //HW470: added model view matrix
    modelView = gl.getUniformLocation( program, "modelView" );
    
    //event listeners for buttons
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    document.getElementById( "randButton" ).onclick = function () {
        
        axis = Math.floor(Math.random() * 3);
    };
    // HW470: listener for slider
    document.getElementById("slider").onchange = function() {
        scale = event.srcElement.value;        
        
        for(var i = 0; i<index; i++){
            matrices[i][0][0] = scale;
            matrices[i][1][1] = scale;
            matrices[i][2][2] = scale;
        }
            
    };
    
    // HW470: listener when user clicks the canvas
     canvas.addEventListener("click", function(event){

        var x = 2*event.clientX/canvas.width-1;
        var y = 2*(canvas.height-event.clientY)/canvas.height-1;
         
        var m = mat4();
        var degree = Math.random() * 360;         
        var r;
         
        // HW470: rotate cubes
        if(index%2 == 0) {
            r = rotate(degree, 0.0,1.0,0.0);
        }
        else
            r = rotate(degree, 0.0,1.0,0.0);

         m[0][0] = scale;
         m[1][1] = scale;
         m[2][2] = scale;
         
         m[0][3] = x;
         m[1][3] = y;
         m[2][3] = Math.random() * -1;
         
         m = mult(m, r);         
         matrices.push(m);
         
         speeds.push(Math.random() * 2);
         thetas.push(vec3(0.0,0.0,0.0));
         console.log("thetas = " + thetas);
         
         index++;

    } );
     
        
    render();
}

function render()
{
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    theta[axis] += 1.0; //decrease to 0.2 to make slower
    
    // HW470: increase each theta by their speed
    for(var i = 0; i<index; i++){
        thetas[i][axis] += speeds[i];
    }

    // HW470: send to GPU, draw each cube
    for(var i = 0; i<index; i++){
        gl.uniform1f(z, zPos);
        gl.uniform3fv(thetaLoc, theta);
        gl.uniformMatrix4fv( modelView, false, flatten(matrices[i]) );
        gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    }

    requestAnimFrame( render );
}

