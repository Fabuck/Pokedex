const pokemonNames = document.querySelector(".pokemon-names");
const pokemonId = document.querySelector(".pokemon-number");
const pokemonType = document.querySelector(".types");
const pokemonImg = document.querySelector(".pokemon-image img");
const pokemonWeight = document.querySelector(".weight");
const pokemonHeight = document.querySelector(".height");
const pokemonTypesUn = document.querySelector(".types .un");
const pokemonTypesDeux = document.querySelector(".types .deux");
const pokemonAbilitieUn = document.querySelector(".abilities .un");
const pokemonAbilitieDeux = document.querySelector(".abilities .deux");
const pokemonDescription = document.querySelector(".description");
const fillBar = document.querySelectorAll(".fill");
const statValue = document.querySelectorAll(".stat-value ");
const header = document.querySelector(".header");
const statName = document.querySelectorAll(".statName");
const inputName = document.querySelector("#inputName");
const btn = document.querySelector("button");
const clue = document.querySelector(".indice div");
const pokemonCard = document.querySelector('.pokemon-card')
let cris;
const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

async function getData(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function getDdescription(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const description = await response.json();
    console.log(description);

    return description;
  } catch (error) {
    console.error(error.message);
  }
}

async function pokemonDisplay(pokemonName) {
  const json = await getData(pokemonName);

  const description = await getDdescription(pokemonName);
  let stat = [];
  let { name, id, types, weight, height, stats, abilities, sprites, cries } =
    json;
  stats.forEach((element) => {
    stat.push(element.base_stat);
  });
  function color(col) {
    header.style.backgroundColor = col;
    statName.forEach((element) => {
      element.style.color = col;
      pokemonTypesUn.style.backgroundColor = col;
      pokemonTypesDeux.style.backgroundColor =
        colours[types[1]?.type?.name] || "";
    });
  }

  pokemonNames.textContent = name;
  clue.textContent = name;
  pokemonId.textContent = id;
  pokemonTypesUn.textContent = types[0].type.name;
  pokemonTypesDeux.textContent = types[1]?.type?.name || "";
  pokemonImg.src = `${sprites.front_default}`;
  pokemonWeight.textContent = `${weight} kg`;
  pokemonHeight.textContent = `${height} m`;
  pokemonAbilitieUn.textContent = abilities[0].ability.name;
  pokemonAbilitieDeux.textContent = abilities[1]?.ability?.name;
  if(pokemonTypesDeux.textContent === ""){
    pokemonTypesDeux.style.display = 'none'
  }
  pokemonDescription.innerHTML =
    description.flavor_text_entries[0].flavor_text;
  cris = new Audio(json.cries.latest);

  fillBar.forEach((element) => {
    let index = 0;
    element.style.width = `${(stat[index] / 250) * 100}%`;
    element.style.backgroundColor = colours[types[0].type.name];
    index++;
  });

  statValue.forEach((element) => {
    let index = 0;
    element.textContent = `${stat[index]}`;
    index++;
  });
  color(colours[types[0].type.name]);

  document.querySelector(".test").addEventListener("click", () => {
    checkWin();
  });
}

function checkWin() {
  if (pokemonNames.textContent === inputName.value) {
    clue.classList.add("hidden");
    cris.play();
    pokemonDisplay(Math.floor(Math.random() * 151) + 1);
    inputName.value = "";
return
  } else  {
    pokemonCard.classList.add('shake')
    setTimeout(()=>{pokemonCard.classList.remove('shake')},500)
    
  }
}

function indice() {
  clue.classList.toggle("hidden");
}

pokemonDisplay(Math.floor(Math.random() * 1025) + 1);

