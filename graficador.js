var c = document.getElementById("myCanvas");
var g2d = c.getContext("2d");
g2d.strokeStyle = 'black';
//centro de mi canvas
var cx = c.width/2;
var cy = c.height/2;
var dibujar_malla=true;
var x;
var y;
//sea la guia un (x,y) que se incremente a todo lo que se dibuje
//para así realizar una traslación de la guia con respecto a la grafica
var gx=0;
var gy=0;
var guiax=gx*-1; //para recorrer la guia
var guiay=gy*1; //para recorrer la guia

var mayorx = -Infinity;
var mayory = -Infinity;
var menorx = Infinity;
var menory = Infinity;
function dibuja_ejes(){
    g2d.beginPath();
    g2d.strokeStyle = 'black';
    //eje y
    g2d.moveTo(0,cy+guiay);
    g2d.lineTo(500,cy+guiay);
    console.log("guiax: "+guiax);
    console.log("guiay: "+guiay);
    //eje x
    g2d.moveTo(cx+guiax,0);
    g2d.lineTo(cx+guiax,500);
    g2d.stroke();
}
//origen del plano cartesiano
var centrox = 250;
var centroy = 250;

function mover_arriba()
{
    guiay-=10;
    centroy-=10;
    limpia();
    dibuja();
}

function mover_abajo()
{
    guiay+=10;
    centroy+=10;
    limpia();
    dibuja();
}

function mover_izquierda()
{
    guiax+=10;
    centrox+=10;
    limpia();
    dibuja();
}

function mover_derecha()
{
    guiax-=10;
    centrox-=10;
    limpia();
    dibuja();
}
function auto_escala()
{
    //1.-busco el mayor de la lista
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
    escalax = cx/(mayorx)*1;//1 para no dejar margen izq y derecho
    escalay = cy/(mayory+(-1*menory))*0.5;//para escalarlo con margen
    //console.log("mayor: "+mayory);
    //console.log("menor: "+menory);
    //console.log("c: "+cy);
    //console.log("escala: "+escalay);
    return 0;
}

function recorre_centro()
{
    dibuja();
    var cerox = 0;
    var ceroy = menory*escalay;
    guiax+=cerox;
    centrox+=cerox;
    guiay+=ceroy;
    centroy+=ceroy;
}

function toggle_malla(){
    dibujar_malla = !dibujar_malla;
    dibuja();
}

function malla()
{
    g2d.beginPath();
    g2d.strokeStyle = 'rgba(0,0,0,0.3)';
    for(i in puntos)
    {
        g2d.moveTo(i*escalax,0);
        g2d.lineTo(i*escalax,c.height);
    }
    for(i in puntos)
    {
        g2d.moveTo(0,i*escalay);
        g2d.lineTo(c.width,i*escalay);
    }
    g2d.font = "12px Arial";
    g2d.fillText("Escala X-> 1:"+escalax.toFixed(1)+"px",0,480);
    g2d.fillText("Escala Y-> 1:"+escalay.toFixed(1)+"px",0,490);
    //numeros en la regla x
  
    var maximox=-Infinity;
    var minimox=Infinity;
    for(i in puntos)
    {
        if(puntos[i].x>maximox)
        maximox=puntos[i].x.toFixed(0);
        if(puntos[i].y<minimox)
        minimox=puntos[i].x.toFixed(0);
    }
    //console.log("max:"+maximox);
    //console.log(minimox);
    for(z=minimox;z<=maximox;z++)
        g2d.fillText(z,z+z*escalax+centrox,cy+10);

    //numeros en la regla y
    var maximoy=-Infinity;
    var minimoy=Infinity;
    for(i in puntos)
    {
        if(puntos[i].y>maximoy)
        maximoy=puntos[i].y.toFixed(0);
        if(puntos[i].y<minimoy)
        minimoy=puntos[i].y.toFixed(0);
    }
    //console.log(maximoy);
    //console.log(minimoy);
    for(z=maximoy;z>=minimoy;z--)
    {
        if(z!=0)
        g2d.fillText(z,cx,z-z*escalay+centroy);
    }

   g2d.stroke();
}

var puntos = [];
puntos.push({x: x,y: y});
x=-10;
C=2;
y=Math.cos(x)+C;
for(x=-5;x<=5;x+=0.1)
{
    y=Math.cos(x)+C;
    puntos.push({x: x,y: y});
}

function limpia(){
    g2d.beginPath();
    g2d.clearRect(0,0,500,500);
    g2d.stroke();
}

//grafica coseno---------------------------------------------------------------
function dibuja(){
limpia();
dibuja_ejes();
auto_escala();
g2d.beginPath(); 
g2d.strokeStyle = 'blue';

for(i in puntos)
{
    //console.log("largo: "+ puntos.length);
    if(i < puntos.length)
    g2d.lineTo(puntos[i].x*escalax+centrox,centroy-escalay*puntos[i].y);
    else
    g2d.moveTo(250,250);
}
g2d.stroke();


if(dibujar_malla==true)
    malla();
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            mover_derecha();
            break;
        case 38:
            mover_arriba();
            break;
        case 39:
            mover_izquierda();
            break;
        case 40:
            mover_abajo();
            break;
    }
};