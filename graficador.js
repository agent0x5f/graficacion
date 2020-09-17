document.write("<script type='text/javascript' src='grafica.js'></script>");
document.write("<script type='text/javascript' src='serie.js'></script>");
document.write("<script type='text/javascript' src='eje.js'></script>");
document.write("<script type='text/javascript' src='estilo.js'></script>");
//En general, lo que tienes que hacer es: avanzarle todo lo que puedas a la 
//librería de graficación y crear una pequeña aplicación web que haga uso de la 
//librería, que contenga varias gráficas, con diferentes datos. Los datos pueden 
//estar en arerglos dentr de la aplicación, o en archivos, o en una base de datos 
//(donde tu prefieras).
 
class Graficador{

	constructor(canvas) {
		this.canvas = canvas; //document.getElementById(canvas);
		this.g2d = this.canvas.getContext("2d");
		const { width, height } = this.canvas.getBoundingClientRect();
		this.width = width; //recibido desde el html
		this.height = height; //recibido desde el html
		this.maxX = width - 2;
		this.maxY = height - 2;
		this.origX = this.maxX / 2;
		this.origY = this.maxY / 2;
		this.escX = 10;
		this.escY = 10;
		this.autoEscala = true;
		this.graficas = [];
		this.titulo = "";
		this.contador_graficas = 0;
		this.fondo = "#b3d1ff";
	}
	
	addGrafica(x, y, width, height, nombreEjeX, nombreEjeY, titulo, estilo_titulo, fondo_g) {
		this.contador_graficas +=1;
		console.log(this.contador_graficas);

		var grafica = new Grafica(x, y, width, height, nombreEjeX, nombreEjeY, titulo, estilo_titulo, fondo_g);
		this.graficas.push(grafica);
		return grafica;
	}
	
	dibuja() {
		var inicio = Date.now();

		this.borra();
		this.g2d.fillStyle=this.fondo;
		this.g2d.fillRect(0, 0, canvas.width, canvas.height);

		for (let i in this.graficas)
			this.graficas[i].dibuja(this.g2d);
		var tiempo = Date.now() - inicio;

		this.g2d.fillStyle = "black";
		this.g2d.font = "13px Arial";
		this.g2d.textAlign = "end";
		this.g2d.textBaseline = "hanging";
		this.g2d.fillText(tiempo + " ms", this.maxX, 0);
	}

	borra(){
		this.g2d.clearRect(0, 0, this.maxX, this.maxY);
	}


}

