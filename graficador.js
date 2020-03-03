var c = document.getElementById("myCanvas");
var g2d = c.getContext("2d");
g2d.strokeStyle = 'black';
//centro de mi canvas
var cx = c.width/2;
var cy = c.height/2;
var x;
var y;
//eje
g2d.moveTo(0,cx);
g2d.lineTo(500,cx);
//eje
g2d.moveTo(cx,0);
g2d.lineTo(cy,500);
//origen del plano cartesiano
var centrox = 250;
var centroy = 250;

//escala de la grafica
//var escalax = 20;2
//var escalay = 40;

function auto_escala()
{
    //1.-busco el mayor de la lista
    var mayorx = -Infinity;
    var mayory = -Infinity;
    var menorx = Infinity;
    var menory = Infinity;

    for(i in puntos)
    {
        if(puntos[i].x > mayorx)
            mayorx = puntos[i].x;
        
        if(puntos[i].y > mayory)
            mayory = puntos[i].y;

        if(puntos[i].x < menorx)
            menorx = puntos[i].x;

        if(puntos[i].y < menory)
            menory = puntos[i].y;
    }
    //2.-ajusto la escala de acuerdo al mayor
    escalax = cx/(mayorx)*1;//1 para no dejar margen izq y derecho, aqui mayorx=10
    escalay = cy/(mayory+(-1*menory))*0.5;//0.33 para escalarlo a 1/3 para margen 1/3 de cada lado, aqui mayory=1
    console.log("mayor: "+mayory);
    console.log("menor: "+menory);
    console.log("c: "+cy);
    console.log("escala: "+escalay);
    return 0;
}

function recorre_centro()
{
    //tomo el valor medio del eje y, y el punto medio de x
    //eso será mi nuevo pseudo-0,0
    var mayorx = -Infinity;
    var mayory = -Infinity;
    var menorx = Infinity;
    var menory = Infinity;
    for(i in puntos)
    {
        if(puntos[i].x > mayorx)
            mayorx = puntos[i].x;
        
        if(puntos[i].y > mayory)
            mayory = puntos[i].y;

        if(puntos[i].x < menorx)
            menorx = puntos[i].x;

        if(puntos[i].y < menory)
            menory = puntos[i].y;
    }
    cx = 0;
    //centroy -= ((mayory+(-1*menory))*escalay)*0.5;
}

//dibuja los ejes------------------------------------------------------------------------------------
g2d.stroke();

var puntos = [];
puntos.push({x: x,y: y});

//grafica coseno-----------------------------------------------------------------------------------
g2d.beginPath();
g2d.strokeStyle = 'blue';

x=-10;
C=3;
y=Math.cos(x)+C;
for(x=-10;x<=10;x+=0.1)
{
    y=Math.cos(x)+C;
    puntos.push({x: x,y: y});
}
auto_escala();
recorre_centro();
g2d.moveTo(centrox+puntos[0].x*escalax,centroy-puntos[0].y*escalay);    
for(i in puntos)
    g2d.lineTo(puntos[i].x*escalax+centrox,centroy-escalay*puntos[i].y);

g2d.stroke();
/*
//grafica seno-------------------------------------------------------------------------------------
g2d.beginPath();
g2d.strokeStyle = 'red';
x=-10;
y=Math.sin(x);
g2d.moveTo(centrox+x*escalax,centroy-y*escalay);
for(x=-10;x<=10;x+=0.1)
{
    y=Math.sin(x);
    g2d.lineTo(centrox+x*escalax,centroy-y*escalay);
}
//dibuja los cambios en el canvas
g2d.stroke();
*/