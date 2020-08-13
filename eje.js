class Eje {

	constructor(nombre) {
		this.nombre = nombre;
		this.min = -1;
		this.max = 1;
		this.esc = 1;
		this.orig = 0;
		this.limitesValidos = false;
		this.autoEscala = true;
		this.nDiv = 6;
		this._nDiv = 6;
		this.div = 0;
		this.nSubDiv = 5;
		this.subDiv = 0;
	}

	resetMinMax() {
		this.limitesValidos = false;
	}

	setMinMax(min, max) {
		if (!this.limitesValidos) {
			this.min = min;
			this.max = max;
		}
		else {
			if (min < this.min) this.min = min;
			if (max > this.max) this.max = max;
		}
		this.limitesValidos = true;
	}

	calculaEscalaX(pixeles) {
		this.ajusta();
		var rango = this.max - this.min;
		this.esc = pixeles / rango;
		this.orig = -this.min * this.esc;
	}

	calculaEscalaY(pixeles) {
		this.ajusta();
		var rango = this.max - this.min;
		this.esc = pixeles / rango;
		this.orig = this.max * this.esc;
	}

	ajusta() {
		let div = (this.max - this.min) / this.nDiv;
		let n = Math.floor(Math.log10(div));
		let factor = Math.pow(10, n);

		div = div / factor;
		if (div >= 7.5) div = 10;
		else if (div >= 3.5) div = 5;
		else if (div >= 2.3) div = 2.5;
		else if (div >= 1.5) div = 2;
		else div = 1;
		div = div * factor;
		this.div = div;
		this.subDiv = div / this.nSubDiv;

		// if (this.autoEscala) {
		// 	this.min = Math.floor(this.min / div) * div;
		// 	this.max = Math.ceil(this.max / div) * div;
		// }
		this._nDiv = Math.round(this.max - this.min) / div;
	}



/*************************************************************
 *                  Seccion de Dibujo
 * ***********************************************************/

	dibujaGridX(g, g2d) {
		g2d.beginPath();
		g2d.strokeStyle = "#C0C0C0";

		let inferior = this.min;
		let superior = this.max;
		let division = this.div;
		let nSubdivisiones = this.nSubDiv;
		let esc = this.esc;
		let orig = this.orig;
		let inicio = Math.floor(inferior / division) * division;

		for (let xVal = inicio; xVal <= superior; xVal += division) {
			let xPix = g.x0 + xVal * esc + orig;
			if (xVal >= inferior && xVal <= superior) {
				g2d.moveTo(xPix, g.y0);
				g2d.lineTo(xPix, g.y1);
			}
		}
		g2d.stroke();
	}


	dibujaGridY(g, g2d) {
		g2d.beginPath();
		g2d.strokeStyle = "#C0C0C0";

		let inferior = this.min;
		let superior = this.max;
		let division = this.div;
		let nSubdivisiones = this.nSubDiv;
		let esc = this.esc;
		let orig = this.orig;
		let inicio = Math.floor(inferior / division) * division;

		for (let yVal = inicio; yVal <= superior; yVal += division) {
			let yPix = g.y0 - yVal * esc + orig;
			if (yVal >= inferior && yVal <= superior) {
				g2d.moveTo(g.x0, yPix);
				g2d.lineTo(g.x1, yPix);
			}
		}
		g2d.stroke();
	}




	dibujaEjeX(g, pos, g2d) {
		this.x0 = g.x0;
		this.y0 = g.y1 + pos;
		this.width = g.width;
		this.height = g.espacioEntreEjes;
		this.x1 = this.x0 + this.width;
		this.y1 = this.y0 + this.height;

		g2d.beginPath();
		g2d.strokeStyle = "black";
		g2d.fillStyle = "black";
		g2d.moveTo(g.x0, g.y1 + pos);
		g2d.lineTo(g.x1, g.y1 + pos);
		//g2d.rect(this.x0, this.y0, this.width, this.height);

		g2d.font = "13px Arial";
		g2d.textAlign = "center";
		g2d.textBaseline = "hanging";
		g2d.fillText(this.nombre, (g.x0 + g.x1) / 2, g.y1 + 17 + pos);

		g2d.font = "10px Arial";

		let inferior = this.min;
		let superior = this.max;
		let division = this.div;
		let nSubdivisiones = this.nSubDiv;
		let esc = this.esc;
		let orig = this.orig;
		let inicio = Math.floor(inferior / division) * division;

		for (let xVal = inicio; xVal <= superior; xVal += division) {
			let xPix = g.x0 + xVal * esc + orig;
			let yPix = g.y1 + pos;
			if (xVal >= inferior && xVal <= superior) {
				g2d.moveTo(xPix, yPix);
				g2d.lineTo(xPix, yPix + 5);
				g2d.fillText(xVal + "", xPix, yPix + 6);
			}
			let subDiv = division / nSubdivisiones;

			for (let xSub = xVal + subDiv; xSub < xVal + division; xSub += subDiv) {
				xPix = g.x0 + xSub * esc + orig;
				if (xSub >= inferior && xSub <= superior) {
					g2d.moveTo(xPix, yPix);
					g2d.lineTo(xPix, yPix + 3);
				}
			}
		}
		g2d.stroke();
	}


	dibujaEjeY(g, pos, g2d) {
		this.x1 = g.x0 - pos;
		this.y0 = g.y0;
		this.width = g.espacioEntreEjes;
		this.height = g.height;
		this.x0 = this.x1 - this.width;
		this.y1 = this.y0 + this.height;

		g2d.beginPath();
		g2d.strokeStyle = "black";
		g2d.fillStyle = "black";
		g2d.moveTo(g.x0 - pos, g.y0);
		g2d.lineTo(g.x0 - pos, g.y1);
		//g2d.rect(this.x0, this.y0, this.width, this.height);

		g2d.font = "13px Arial";
		g2d.textAlign = "center";
		g2d.textBaseline = "bottom";
		g2d.save();
		g2d.translate(g.x0 - 17 - pos, (g.y0 + g.y1) / 2);
		g2d.rotate(-Math.PI / 2);
		g2d.fillText(this.nombre, 0, 0);
		g2d.restore();

		g2d.font = "10px Arial";

		let inferior = this.min;
		let superior = this.max;
		let division = this.div;
		let nSubdivisiones = this.nSubDiv;
		let esc = this.esc;
		let orig = this.orig;
		let inicio = Math.floor(inferior / division) * division;

		for (let yVal = inicio; yVal <= superior; yVal += division) {
			let xPix = g.x0 - pos;
			let yPix = g.y0 - yVal * esc + orig;

			if (yVal >= inferior && yVal <= superior) {
				g2d.moveTo(xPix, yPix);
				g2d.lineTo(xPix - 5, yPix);
				g2d.save();
				g2d.translate(xPix - 6, yPix);
				g2d.rotate(-Math.PI / 2);
				g2d.fillText(yVal + "", 0, 0);
				g2d.restore();
			}
			let subDiv = division / nSubdivisiones;

			for (let ySub = yVal + subDiv; ySub < yVal + division; ySub += subDiv) {
				yPix = g.y0 - ySub * esc + orig;
				if (ySub >= inferior && ySub <= superior) {
					g2d.moveTo(xPix, yPix);
					g2d.lineTo(xPix - 3, yPix);
				}
			}
		}
		g2d.stroke();
	}



}

