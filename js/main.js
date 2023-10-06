    let base_url_carrito = 'https://japceibal.github.io/japflix_api/movies-data.json';
    let movies = [];

    
async function getMovies() {
    try {
        const response = await fetch(base_url_carrito);
        if (!response.ok) {
            throw new Error('Error fetching data.')
        }
        moviesJSON = await response.json();
        movies = moviesJSON;
        
    } catch (error) {
        console.error('Error:', error)
    }
}
getMovies();    

function getStarRating(voteAverage) {
    let starCount = Math.round(voteAverage / 2 * 2) / 2;
    let fullStars = Math.floor(starCount);
    let halfStar = starCount % 1 ? '⭐' : '';
    return Array(fullStars + 1).join('⭐') + halfStar;
  }

  function displayMovies(coincidencias) {
    let list = $('#lista');
    list.empty();
    let urlImg='';
    coincidencias.forEach(movie => {
      let listItem = `
        <li class="list-group-item movie-item">
          <span class="movie-title">${movie.title}</span>
          <img src="${urlImg}">
          <span class="movie-tagline">${movie.tagline}</span>
          <span class="movie-rating">${getStarRating(movie.vote_average)}</span>
          <button class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="mostraImg()">Mostrar info</button>
        </li>

        <div class="modal fade flex" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        
        <div class="modal-dialog custom-modal-width d-inline-block" style="max-width: 100%; width: 100%;">
            <div class="modal-content ">
                <div class="modal-body flex "> <!-- Aplica las clases aquí -->
                    <h1>${movie.title}</h1>
                    <p></p>
                    <div class="dropdown">
                    
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Mas info
                            </button>
                        <ul class="dropdown-menu">
                            <li>Fecha de lanzamiento: ${movie.release_date}</li>
                            <li>Presupuesto: $USD ${movie.budget}</li>
                            <li>Ganancias: $USD ${movie.revenue}</li>
                            <li>Duración: ${movie.runtime} min.</li>
                            <li>Genero: ${movie.genres[0].name}, ${movie.genres[1].name}, ${movie.genres[2].name}</li>

                        </ul>
</div>

                </div>
            </div>
        </div>
    </div>

        `;
      list.append(listItem);
    });
  }
  /*
function mostrarPeliculas(peliculasFiltradas){
    console.log(peliculasFiltradas);
    
    const lista = document.querySelector('#lista');
    lista.innerHTML= '';
    console.log(peliculasFiltradas);
    peliculasFiltradas.forEach(element => {
       let li = document.createElement('li');
       li.classList.add('list-group-item');
       lista.appendChild(li);

       li.setAttribute('onclick', 'mostrarInfo(element.title)');

       let h1 = document.createElement('h1');
       h1.innerText= element.title;
       li.appendChild(h1);
       
       let estrellas = getStarRating(element.vote_average);
       let span = document.createElement('span');
       span.classList.add('movie-rating');
       span.innerText = estrellas;
       li.appendChild(span);

       let p = document.createElement('p');
       p.innerText= element.overview;
       li.appendChild(p);

       var modal = new bootstrap.Modal(document.getElementById('movieDetailsModal'));
        modal.show();
        

       
    });
    
}
*/
/*
function mostrarInfo(titulo){
    
    

}
*/

    const btnBuscar=document.querySelector('#btnBuscar');

    btnBuscar.addEventListener('click',function(){

        const busqueda = document.querySelector('#inputBuscar');
        let terminoBusqueda = busqueda.value ;
    
        let coincidencias = movies.filter(movie => 
            movie.title.toLowerCase().includes(terminoBusqueda) || 
            movie.overview.toLowerCase().includes(terminoBusqueda) ||
            movie.tagline.toLowerCase().includes(terminoBusqueda) ||
            movie.genres.some(genre => genre.name.toLowerCase().includes(terminoBusqueda))
        );

        displayMovies(coincidencias);

        
    })

    
 


