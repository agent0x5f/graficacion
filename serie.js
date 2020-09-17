class Serie {

	constructor(nombre, datos, ejeX, ejeY, color, stilo) {
		this.nombre = nombre;
		this.datos = datos;
		this.ejeX = ejeX;
		this.ejeY = ejeY;
		this.xmin = 0;
		this.ymin = 0;
		this.xmax = 0;
		this.ymax = 0;
		this.color = color;
		this.stilo = stilo;
	}

	//Busca los vales máximos y mínimos en X y Y de una serie
	calculaMinMax() {
		var xmin, xmax, ymin, ymax, x, y;
		let d = this.datos;
		xmin = xmax = d[0].x;
		ymin = ymax = d[0].y;
		for (let i in d) {
			x = d[i].x;
			if (x < xmin) xmin = x;
			else if (x > xmax) xmax = x;

			y = d[i].y;
			if (y < ymin) ymin = y;
			else if (y > ymax) ymax = y;
		}
		this.xmin = xmin;
		this.xmax = xmax;
		this.ymin = ymin;
		this.ymax = ymax;
	}

/*************************************************************
 *                  Seccion de Dibujo
 * ***********************************************************/

	dibuja(grafica, ejeX, ejeY, g2d) {
		var datos = this.datos;
		var escX = ejeX.esc;
		var escY = ejeY.esc;
		var origX = ejeX.orig + grafica.x0;
		var origY = ejeY.orig + grafica.y0;
		g2d.beginPath();
		g2d.strokeStyle = this.color;
		g2d.moveTo(datos[0].x * escX + origX, -datos[0].y * escY + origY);
		for (let i in datos)
			g2d.lineTo(datos[i].x * escX + origX, -datos[i].y * escY + origY);
		g2d.stroke();
	}

}

