let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 20){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=984cb62ec2af1cdbdf45db7cee0ca2a7&language=en-EN&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';

			datos.results.forEach(pelicula => {
				// Verificar si la película tiene un póster disponible
				if (pelicula.poster_path !== null) {
					peliculas += `
						<div class="pelicula">
							<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
							<h4 class="titulo">${pelicula.title}</h4>
							<h4 class="titulo">${pelicula.release_date}</h4>
						</div>
					`;
				}
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();