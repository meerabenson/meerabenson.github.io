var canvas;
var gl;

var axis = 0;
var index = 0;

var thetaC = [-0.8, 0.0, 0.0];
var thetaP = [-0.8, 0.0, 0.0];
var thetas = [];
var pointsArray = [];
var pointsArray1 = [];
var pointsArray2 = [];
var pointsArray3 = [];
var points = [];
var pointsLowRes = [];
var normalsArray = [];
var normalsArray2 = [];
var normals = [];
var matrices = [];
var materials = [];
var am = [];
var diff = [];
var spec = [];
var shin = [];

var t = Math.PI/4;
var highRes = true;
var isred, lightAnimate, rotating, drawNorms = false;
var near = -10;
var far = 10;
var radius = 3.0;
var theta  = Math.PI;
var phi = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -3.0;
var right = 3.0;
var ytop =3.0;
var bottom = -3.0;
    
var ambientColor, diffuseColor, specularColor;
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, ambientP, diffuseP, specularP, lightP, shine, shininess, lightPosition, thetaLoc, vBuffer, vBuffer2, vPosition, vPosition2;
var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);



window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
    radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    //HW470: cylinder initial properties
    ambientProduct = mult(lightAmbient, materialAmbient1);
    am.push(ambientProduct);
    diffuseProduct = mult(lightDiffuse, materialDiffuse1);
    diff.push(diffuseProduct);
    specularProduct = mult(lightSpecular, materialSpecular1);
    spec.push(specularProduct);
    shininess = 8.0;
    shin.push(shininess);

    //HW470: parametric surface initial properties
    ambientProduct2 = mult(lightAmbient, materialAmbientP1);
    am.push(ambientProduct2);
    diffuseProduct2 = mult(lightDiffuse, materialDiffuseP1);
    diff.push(diffuseProduct2);
    specularProduct2 = mult(lightSpecular, materialSpecularP1);
    spec.push(specularProduct2);
    shininess2 = 5.0;
    shin.push(shininess2);   
    
    //HW470: create two objects
    cylinder();
    cylinder2();
    

    vPosition = gl.getAttribLocation( program, "vPosition" );
    diffuseP = gl.getUniformLocation( program, "diffuseProduct" );
    specularP = gl.getUniformLocation( program, "specularProduct" );
    ambientP = gl.getUniformLocation( program, "ambientProduct" );
    shine = gl.getUniformLocation( program, "shininess");
    lightP = gl.getUniformLocation( program, "lightPosition" );
    
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );    
    thetaLoc = gl.getUniformLocation(program, "thetaC"); 
    
    
    //HW470: toggle white and red light
    document.getElementById("Button8").onclick = function(){
        if (isred) {
            lightAmbient = lightWhite;
            isred = !isred;
        }
        else {
            lightAmbient = lightRed;
            isred = !isred;
        }
        console.log(lightAmbient);
        am[0] = mult(lightAmbient, materialAmbient1);
        am[1] = mult(lightAmbient, materialAmbientP1);

    };
    //HW470: light animation
    document.getElementById("lights").onclick = function(){
        lightAnimate = !lightAnimate;
    };
    //HW470: toggle rotation about random axis
    document.getElementById("rotate").onclick = function(){
        rotating = !rotating;
        axis = Math.floor(Math.random() * 3);
    };
    //HW470: change cylinder materials to #1
    document.getElementById("mat1").onclick = function(){
        ambientProduct = mult(lightAmbient, materialAmbient1);
        am[0] = ambientProduct;
        diffuseProduct = mult(lightDiffuse, materialDiffuse1);
        diff[0] = diffuseProduct;
        specularProduct = mult(lightSpecular, materialSpecular1);
        spec[0] = specularProduct;
        shininess = materialShininess1;
        shin[0] = shininess;
    };
    //HW470: change cylinder materials to #2
    document.getElementById("mat2").onclick = function(){
        ambientProduct = mult(lightAmbient, materialAmbient2);
        am[0] = ambientProduct;
        diffuseProduct = mult(lightDiffuse, materialDiffuse2);
        diff[0] = diffuseProduct;
        specularProduct = mult(lightSpecular, materialSpecular2);
        spec[0] = specularProduct;
        shininess = materialShininess2;
        shin[0] = shininess;
    };
    //HW470: change cylinder materials to #3
    document.getElementById("mat3").onclick = function(){
        ambientProduct = mult(lightAmbient, materialAmbient3);
        am[0] = ambientProduct;
        diffuseProduct = mult(lightDiffuse, materialDiffuse3);
        diff[0] = diffuseProduct;
        specularProduct = mult(lightSpecular, materialSpecular3);
        spec[0] = specularProduct;
        shininess = materialShininess3;
        shin[0] = shininess;
    };
    //HW470: change parametirc surface materials to #1
    document.getElementById("mat4").onclick = function(){
        ambientProduct = mult(lightAmbient, materialAmbientP1);
        am[1] = ambientProduct;
        diffuseProduct = mult(lightDiffuse, materialDiffuseP1);
        diff[1] = diffuseProduct;
        specularProduct = mult(lightSpecular, materialSpecularP1);
        spec[1] = specularProduct;
        shininess = materialShininess1;
        shin[1] = shininess;
    };
    //HW470: change parametirc surface materials to #2
    document.getElementById("mat5").onclick = function(){
        ambientProduct = mult(lightAmbient, materialAmbientP2);
        am[1] = ambientProduct;
        diffuseProduct = mult(lightDiffuse, materialDiffuseP2);
        diff[1] = diffuseProduct;
        specularProduct = mult(lightSpecular, materialSpecularP2);
        spec[1] = specularProduct;
        shininess = materialShininessP2;
        shin[1] = shininess;
    };
    //HW470: change parametirc surface materials to #3
    document.getElementById("mat6").onclick = function(){
        ambientProduct = mult(lightAmbient, materialAmbientP3);
        am[1] = ambientProduct;
        diffuseProduct = mult(lightDiffuse, materialDiffuseP3);
        diff[1] = diffuseProduct;
        specularProduct = mult(lightSpecular, materialSpecularP3);
        spec[1] = specularProduct;
        shininess = materialShininess3;
        shin[1] = shininess;
    };
    //HW470: toggle resolution of objects
    document.getElementById("resolution").onclick = function(){
        highRes = !highRes;
    };
    //HW470: toggle normals of objects
    document.getElementById("normals").onclick = function(){
        drawNorms = !drawNorms;
    };

    gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, 
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
       "shininess"), materialShininess1 );
    gl.uniform3fv( gl.getUniformLocation(program, 
       "thetaC"), thetaC );
    
    
    render();
}


function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    //HW470: increase theta if rotation is on
    if(rotating){
        console.log(axis);
        thetas[0][axis] += 0.7;
        if(axis == 1)
            thetas[1][axis] -= 0.7;
        else
            thetas[1][axis] += 0.7;
    }
    else{
        thetas[0] = [-8.0,0.0,0.0];
        thetas[1] = [-8.0,0.0,0.0];
    }

    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    
    //HW470: rotate light position around z-axis
    if(lightAnimate) {
        lightPosition[0] = Math.sqrt(8)*Math.cos(t);
        lightPosition[1] = 0;
        lightPosition[2] = Math.sqrt(8)*Math.sin(t);     
    }
    else {
        lightPosition = vec4(2.0, -2.0, 2.0, 0.0 );
        t = Math.PI/4;
    }
    t += 0.005;
    
    for(var i = 0; i<2; i++){
        
        vBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
        
        //HW470: toggle resolution
        if(highRes)
            gl.bufferData( gl.ARRAY_BUFFER, flatten(points[i]), gl.STATIC_DRAW );
        else
            gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsLowRes[i]), gl.STATIC_DRAW );

        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );    

        gl.uniform4fv(lightP, flatten(lightPosition) );
        gl.uniform4fv(ambientP, flatten(am[i]) );
        gl.uniform4fv(diffuseP, flatten(diff[i]) );
        gl.uniform4fv(specularP, flatten(spec[i]) );
        gl.uniform1f(shine, shin[i]);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(matrices[i]) );
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
        gl.uniform3fv(thetaLoc, thetas[i]);
        
        if(highRes)
            gl.drawArrays( gl.TRIANGLE_STRIP, 0, points[i].length);
        else
            gl.drawArrays( gl.TRIANGLE_STRIP, 0, pointsLowRes[i].length);
    }

    
    //HW470: draw the normals of the objects
    if(drawNorms) {
        for(var i = 0; i<2; i++){
            vBuffer2 = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(normals[i]), gl.STATIC_DRAW );
            gl.vertexAttribPointer( vPosition2, 3, gl.FLOAT, false, 0, 0 );
            gl.uniform4fv(ambientP, vec4(0.0,0.0,0.0,0.0) );
            gl.uniform4fv(diffuseP, vec4(0.0,0.0,0.0,0.0) );
            gl.uniform4fv(specularP, vec4(0.0,0.0,0.0,0.0) );
            gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(matrices[i]) );
            gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
            gl.uniform3fv(thetaLoc, thetas[i]);
            gl.enableVertexAttribArray( vPosition2 );    
            gl.drawArrays(gl.LINES, 0, normals[i].length/3, normals[i]);
        }
    }
    

    window.requestAnimFrame(render);
}
