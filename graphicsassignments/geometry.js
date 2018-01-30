// HW470: functions definitions to create cube, from Prof. Angel

function cylinder(){
    var u = -0.5;
    var v = -0.51;
    var r = 0.5; var rr = r+0.3;
    var a, m;
    var b = 0;
    
    for(u = -0.5; u < 1.0; u += 0.01)
    {
        for(var t = 0; t < 2*Math.PI; t += 0.01){
            a = vec3(0+r*Math.cos(t), u, 0+r*Math.sin(t));
            pointsArray.push(a);
            
            a = vec3(0+r*Math.cos(t),v, 0+r*Math.sin(t));
            pointsArray.push(a);
            
        }
        u += 0.01;
        v += 0.01;
        //r += 0.01;
    }
    
    points.push(pointsArray);
      
    m = (lookAt(eye, at , up));
    m[0][3] = -1.5;
    matrices.push(m);
    
    thetas.push(thetaC);
    
    
    v = -0.49;
    u = -0.5
    //////low res///////
    for(u = -0.5; u < 1.0; u += 0.01, v+=0.01)
    {
        for(var t = 0; t < 2*Math.PI; t += 0.2, b++){
            a = vec3(0+r*Math.cos(t), u, 0+r*Math.sin(t));
            pointsArray1.push(a);
            
            a = vec3(0+r*Math.cos(t),v, 0+r*Math.sin(t));
            pointsArray1.push(a);
            
            if(b%14 == 0)
            {
                normalsArray.push(0+r*Math.cos(t));
                normalsArray.push(u);
              normalsArray.push(0+r*Math.sin(t));

                normalsArray.push(0+rr*Math.cos(t));
                normalsArray.push(u);
                normalsArray.push(0+rr*Math.sin(t));        
            }        
        }

    }
    
    var p = [];
    for (var i = 0; i < pointsArray1.length; i += 5) {
        p.push(pointsArray1[i]);
    }
    
    normals.push(normalsArray);
    pointsLowRes.push(p);
    
}

function cylinder2(){
    var u = -0.5;
    var v = -0.51;
    var r = 0.3; var rr = r+0.3;
    var a, m;
    var x = 0.0;
    var c = 0;
    var b = 0;
    
    for(u = -0.5; u < 0.5; u += 0.01, v +=0.01, c++)
    {
        for(var s = 0; s < 2*Math.PI; s += 0.01, b++){
            r += Math.pow(x,2);
            a = vec3(0+r*Math.cos(s), u, 0+r*Math.sin(s));
            pointsArray2.push(a);
            
              

            a = vec3(0+r*Math.cos(s),v, 0+r*Math.sin(s));
            pointsArray2.push(a);
        }
        //increment z
        //u += 0.01;
        //v += 0.01;
        x += 0.00003;
        
    }
    console.log(x);
    points.push(pointsArray2);
      
    m = (lookAt(eye, at , up));
    m[0][3] = 1.5;
    m[1][3] = 0.3;
    m[0][0] = 1.5;
    m[1][1] = 1.5;
    m[2][2] = 1.5;

    matrices.push(m);
    thetas.push(thetaP);
    
    
    r = 0.3;
    v = -0.55;
    ///////low res////////
    for(u = -0.5; u < 0.45; u += 0.05, v +=0.05)
    {
        for(var s = 0; s <= 2*Math.PI; s += 0.05, b++){
            r += Math.pow(x,2);
            rr = r+0.3;
            a = vec3(0+r*Math.cos(s), u, 0+r*Math.sin(s));
            pointsArray3.push(a);
            
            a = vec3(0+r*Math.cos(s),v, 0+r*Math.sin(s));
            pointsArray3.push(a);
            
            if(b%20 == 0)
            {
                normalsArray2.push(0+r*Math.cos(s));
                normalsArray2.push(u);
                normalsArray2.push(0+r*Math.sin(s));

                normalsArray2.push(0+rr*Math.cos(s));
                normalsArray2.push(u);
                normalsArray2.push(0+rr*Math.sin(s));        
            }        
        }

        x += 0.0006;
    }
    var p = [];
    for (var i = 0; i < pointsArray2.length; i += 61) {
        p.push(pointsArray2[i]);
    }
    
    pointsLowRes.push(p);
    normals.push(normalsArray2);
}


