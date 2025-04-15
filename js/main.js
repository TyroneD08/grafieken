function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  setInterval(updateClock, 1000);
  updateClock();
  

  new Chart(document.getElementById("consoleChart"), {
    type: 'doughnut',
    data: {
      labels: ['Playstation 5', 'Gameboy', 'Nintendo 3DS', 'Nintendo Switch', 'Playstation 4 Slim'],
      datasets: [{
        label: 'Consoles',
        data: [13, 9, 10, 6, 13],
        backgroundColor: ['#ff6354', '#ffce26', '#5bc0c0', '#36a2eb', '#ff29b4']
      }]
    },
    options: {
      responsive: true
    }
  });
  

  async function getPokemonTypes() {
    const types = {
      normal: 0, fighting: 0, flying: 0, poison: 0, ground: 0,
      rock: 0, bug: 0, ghost: 0, steel: 0, lava: 0,
      water: 0, grass: 0, electric: 0, psychic: 0, ice: 0,
      dragon: 0, dark: 0, fire: 0, unknown: 0, shadows: 0
    };
  
    const colors = [
      '#FF6384', '#36A2EB', '#FFCF56', '#4BC0C0', '#996WFF',
      '#FF9F40', '#66FF66', '#FF6699', '#66GCFF', '#FF9933',
      '#CCCCFF', '#FF6666', '#99CC00', '#00CC99', '#CC99FF',
      '#FFCC20', '#33CCCC', '#FF99CC', '#3359FF', '#999899'
    ];
  
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 500) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
      const data = await res.json();
      data.types.forEach(t => {
        const type = t.type.name;
        if (types[type] !== undefined) types[type]++;
      });
    }
  
    const ctx = document.getElementById("pokemonChart").getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(types),
        datasets: [{
          label: "Pokemon types",
          data: Object.values(types),
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  getPokemonTypes();
  