let equiposNBA = [];

fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NBA")
  .then(res => res.json())
  .then(data => {
    equiposNBA = data.teams;
    const select = document.getElementById("select-equipo");

    equiposNBA.forEach(team => {
      const option = document.createElement("option");
      option.value = team.idTeam;
      option.textContent = team.strTeam;
      select.appendChild(option);
    });
  });


document.getElementById("select-equipo").addEventListener("change", function() {
  const idSeleccionado = this.value;
  const equipo = equiposNBA.find(t => t.idTeam === idSeleccionado);
  const infoDiv = document.getElementById("equipo-info");

  if (equipo) {
    const imgSrc = equipo.strTeamBadge || "https://via.placeholder.com/120x120?text=No+Image";

    infoDiv.innerHTML = `
      <img src="${imgSrc}" alt="Escudo de ${equipo.strTeam}" />
      <h2>${equipo.strTeam}</h2>
      <p><strong>Ciudad / Localización:</strong> ${equipo.strStadiumLocation || 'Desconocida'}</p>
      <p><strong>Año de creación:</strong> ${equipo.intFormedYear || 'Desconocido'}</p>
      <p><strong>Estadio:</strong> ${equipo.strStadium || 'Desconocido'}</p>
      <p class="description"><em>Descripción:</em><br>${equipo.strDescriptionEN || 'Sin descripción disponible.'}</p>

    `;
  
  }
});
