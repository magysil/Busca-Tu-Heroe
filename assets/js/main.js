//Captura de Información y validación de la información (solo numero)

$(function () {
  $("#form-busqueda").submit(function (e) {
    e.preventDefault();
    let id = $("#id").val();
    if ((id >= 1) & (id <= 731) & /^\d+$/.test(id)) {
      buscarSuperHero(id);
      $("#id").val("")
    } else {
      $("#errorModal").modal("show");
    }
  });

  //Consulta a la API y envío de la data para mostrar la información

  function buscarSuperHero(id) {
    const key = "10160796884347278";
    $.ajax({
      url: `https://www.superheroapi.com/api.php/10160796884347278/${id}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        infoSuperHero(data);
        console.log(data);
      },
      error: function (error) {
        alert("Hay problemas de conexión por favor intente mas tarde ", error);
      },
    });
  }

  //Renderizado de Informacion en Card

  function infoSuperHero(info) {
    $("#info-SuperHero").empty();
    const cardHero = `
        <h2 class ="text-center">Super Heroe Encontrado N°${info.id}</h2>
        <div class="container d-flex justify-content-center mb-5">
        <div class="card my-5 shadow p-3  bg-white rounded ">
              <img src="${info.image.url}" class="card-img-top" alt="${info.name}">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${info.name}</h5>
          <p class="card-text">Nombre Real: ${info.biography["full-name"]}</p>
          <p class="card-text"><small  class="text-body-secondary">Conexiones: ${info.connections["group-affiliation"]}</small></p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><small  class="text-body-secondary">Primera Aparición: ${info.biography["first-appearance"]}</small></li>
          <li class="list-group-item"><small  class="text-body-secondary">Publicado por: ${info.biography.publisher}</small></li>
          <li class="list-group-item"><small  class="text-body-secondary"> Ocupación: ${info.work.occupation}</small></li>
          <li class="list-group-item"><small  class="text-body-secondary">Altura: ${info.appearance.height.join(" - ")}</small></li>
          <li class="list-group-item"><small  class="text-body-secondary">Peso: ${info.appearance.weight.join(" - ")}</li>
        </ul>
        <div class="card-body">
        <button type="button" class="btn btn-danger text-warning fw-bold" data-bs-toggle="modal" data-bs-target="#poderModal">Poderes</button>         
        </div>      
      </div>
      </div>
        `;
    $("#info-SuperHero").append(cardHero);

// Graficos método CanvaJS

    $("#poderModal").on("shown.bs.modal", function(){
        let poderes = [];
        for (let labelPoder in info.powerstats){
          let value = info.powerstats[labelPoder] == "null" ? 0 : info.powerstats[labelPoder];
          poderes.push({y:(value), label:labelPoder})
          console.log(poderes)
        }
        
      var chart = new CanvasJS.Chart("chartContainer", {
         theme: "light2", // "light1", "light2", "dark1", "dark2"
       exportEnabled: true,
       animationEnabled: true,
         title: {
           text: `Estadísticas de poder de ${info.name}`
         },
         data: [{
           type: "pie",
           startAngle: 270,
           dataPoints: poderes             
         }]
       });
       chart.render();
    })     
  }    
  
});
