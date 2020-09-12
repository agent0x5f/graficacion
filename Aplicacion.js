var canvas = document.getElementById("myCanvas");

var puntos1 = [];
var puntos2 = [];
var puntos3 = [];
cargaDatos1(puntos1);
cargaDatos1(puntos2);
cargaDatos2(puntos3);


var g = new Graficador(canvas);


var graf1 = g.addGrafica(80, 80, 300, 100);
graf1.addSerie("Serie 1", puntos1);
var graf2 = g.addGrafica(470, 80, 150, 150, "Angulo (radianes)", "Altura (milimetros)");
var serie1 = graf2.addSerie("Serie 2", puntos2);
var serie2 = graf2.addSerie("Serie 3", puntos3);
var graf3 = g.addGrafica(80, 280, 300, 200, "pH", "Voltaje");
var ejeX = graf3.addEjeX("Presión (psi)");
var ejeY = graf3.addEjeY("Temperatura");
var serie3 = graf3.addSerie("Serie 4", puntos1, 0, 0);
var serie4 = graf3.addSerie("Serie 5", puntos3, 0, 1);

g.dibuja();

/**************************************************************/

function cargaDatos1(datos) {
	var x;
	var y;
	for (x = -10; x <= 10; x += 0.1) {
		y = Math.sin(x);
		datos.push({ x: x, y: y*1.15 });
	}
}

function cargaDatos2(datos) {
	var x;
	var y;
	for (x = -10; x <= 10; x += 0.1) {
		y = Math.cos(x);
		datos.push({ x: x, y: y });
	}
}
/**************************************************************/

function dibujar() {
	g.dibuja();
}

function reset() {
	serie3.datos = [];
	cargaDatos1(serie3.datos);
	dibujar();
}
/**************************************************************/

function mover_arriba() {	
	for (i in serie3.datos)
		serie3.datos[i].y += 0.1;
	dibujar();
}

function mover_abajo() {
	for (i in serie3.datos)
		serie3.datos[i].y -= 0.1;
	dibujar();
}

function mover_izquierda() {
	for (i in serie3.datos)
		serie3.datos[i].x -= 0.2;
	dibujar();
}

function mover_derecha() {
	for (i in serie3.datos)
		serie3.datos[i].x += 0.2;
	dibujar();
}

document.onkeydown = function (e) {
	switch (e.keyCode) {
		case 37:
			mover_izquierda();
			break;
		case 38:
			mover_arriba();
			break;
		case 39:
			mover_derecha();
			break;
		case 40:
			mover_abajo();
			break;
	}
};
