class Grafica {

	constructor(x, y, width, height, nombreEjeX, nombreEjeY, titulo) {
		this.x0 = x;
		this.y0 = y;
		this.width = width;
		this.height = height;
		this.x1 = width + x;
		this.y1 = height + y;
		this.series = [];
		this.ejesX = [];
		this.ejesY = [];
		if (nombreEjeX != undefined) this.ejesX.push(new Eje(nombreEjeX));
		else this.ejesX.push(new Eje("Eje X"));
		if (nombreEjeY !== undefined) this.ejesY.push(new Eje(nombreEjeY));
		else this.ejesY.push(new Eje("Eje Y"));
		this.gridX = 0;
		this.gridY = 0;
		this.colorBorde = "#505050";
		this.colorFondo = "#A4F2F0";
		this.posicionPrimerEje = 5;
		this.espacioEntreEjes = 35;
		if (titulo != undefined) this.titulo= titulo;
		else this.titulo = "Titulo";
	}


	addSerie(nombre, datos, ejeX, ejeY) {
		if (ejeX == undefined) var ejeX = 0;
		if (ejeY == undefined) var ejeY = 0;
		var serie = new Serie(nombre, datos, ejeX, ejeY);
		this.series.push(serie);
		if (this.ejesX.length == 0)
			this.ejesX.push(new Eje("Eje X"));
		if (this.ejesY.length == 0)
			this.ejesY.push(new Eje("Eje Y"));
		return serie;
	}


	addEjeX(nombre, min, max) {
		var eje = new Eje(nombre, min, max);
		this.ejesX.push(eje);
		return eje;
	}


	addEjeY(nombre, min, max) {
		var eje = new Eje(nombre, min, max);
		this.ejesY.push(eje);
		return eje;
	}

	nombreEjeX(n, nombre) {
		this.ejesX[n].nombre = nombre;
	}

	nombreEjeY(n, nombre) {
		this.ejesY[n].nombre = nombre;
	}


/*************************************************************
*             Seccion de Calculo de Escalas
* ***********************************************************/

//Calcula los límites y las escalas de todos los ejes de una gráfica
	autoescala() {
		//Resetea los ejes para iniciar el cálculo automatico de los límites
		for (let i in this.ejesX)
			this.ejesX[i].resetMinMax();
		for (let i in this.ejesY)
			this.ejesY[i].resetMinMax();

		//Establece los límites minimo y maximo de cada eje, de acuerdo a los valores de las series
		for (let i in this.series) {
			let s = this.series[i];
			let ejeX = this.ejesX[s.ejeX];
			let ejeY = this.ejesY[s.ejeY];

			s.calculaMinMax();

			if (ejeX.autoEscala)
				ejeX.setMinMax(s.xmin, s.xmax);

			if (ejeY.autoEscala)
				ejeY.setMinMax(s.ymin, s.ymax);
		}

		//Ajusa limites y calcula la escala y el origen de cada eje, de acuerdo a sus límites establecidos
		for (let i in this.ejesX)
			this.ejesX[i].calculaEscalaX(this.width);

		for (let i in this.ejesY)
			this.ejesY[i].calculaEscalaY(this.height);
	}

	

/*************************************************************
 *                  Seccion de Dibujo
 * ***********************************************************/

	dibuja(g2d) {
		this.autoescala();
		this.dibujaFondo(g2d);

		//Dibuja grid X
		if (this.gridX != -1)
			this.ejesX[this.gridX].dibujaGridX(this, g2d);

		//Dibuja grid Y
		if (this.gridY != -1)
			this.ejesY[this.gridY].dibujaGridY(this, g2d);

		//Dibuja ejes X
		var pos = this.posicionPrimerEje;
		for (let i in this.ejesX) {
			this.ejesX[i].dibujaEjeX(this, pos, g2d);
			pos += this.espacioEntreEjes;
		}

		//Dibuja ejes Y
		pos = this.posicionPrimerEje;
		for (let i in this.ejesY) {
			this.ejesY[i].dibujaEjeY(this, pos, g2d);
			pos += this.espacioEntreEjes;
		}
		//Dibuja el titulo de la grafica
		g2d.fillText(this.titulo,this.x0,this.y0);

		g2d.save();	//Guarda el estado del 2DContext antes del recorte (clip)
		//Limita el área de dibujo de la grafica
		g2d.rect(this.x0, this.y0, this.width, this.height);
		g2d.clip();

		//Dibuja las series
		for (let i in this.series) {
			let serie = this.series[i];
			let ejeX = this.ejesX[serie.ejeX];
			let ejeY = this.ejesY[serie.ejeY];
			serie.dibuja(this, ejeX, ejeY, g2d);
		}
		g2d.restore();	//Restaura el estado del 2DContext
	}


	dibujaFondo(g2d) {
		g2d.beginPath();
		g2d.lineWidth = "1";
		if (this.colorFondo != null) {
			g2d.fillStyle = this.colorFondo;
			g2d.fillRect(this.x0, this.y0, this.width, this.height);
		}
		if (this.colorBorde != null) {
			g2d.strokeStyle = this.colorBorde;
			g2d.rect(this.x0, this.y0, this.width, this.height);			
		}
		g2d.stroke();
	}


}
