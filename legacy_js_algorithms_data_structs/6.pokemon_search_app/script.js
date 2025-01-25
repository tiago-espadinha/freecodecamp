const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");

const types = document.getElementById("types");
const sprite = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");

const hp = document.getElementById("hp-value");
const attack = document.getElementById("attack-value");
const defense = document.getElementById("defense-value");
const specialAttack = document.getElementById("special-attack-value");
const specialDefense = document.getElementById("special-defense-value");
const speed = document.getElementById("speed-value");

const typeColors = {
  normal: "#aa9",
  fire: "#f42",
  water: "#39f",
  electric: "#fc3",
  grass: "#7c5",
  ice: "#6cf",
  fighting: "#b54",
  poison: "#a59",
  ground: "#db5",
  flying: "#89f",
  psychic: "#f59",
  bug: "#ab2",
  rock: "#ba6",
  ghost: "#66b",
  dragon: "#76e",
  dark: "#754",
  steel: "#aab",
  fairy: "#e9e",
  curse: "#698",
};

const generateTypeStyles = () => {
  const styles = Object.entries(typeColors)
    .map(([type, color]) => `.${type} { background-color: ${color}; }`)
    .join("\n");

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
};

generateTypeStyles();

const fillStatBars = (statValues, primaryType) => {
  const statBars = [
    { element: document.getElementById("hp-bar"), value: statValues[0] },
    { element: document.getElementById("attack-bar"), value: statValues[1] },
    { element: document.getElementById("defense-bar"), value: statValues[2] },
    {
      element: document.getElementById("special-attack-bar"),
      value: statValues[3],
    },
    {
      element: document.getElementById("special-defense-bar"),
      value: statValues[4],
    },
    { element: document.getElementById("speed-bar"), value: statValues[5] },
  ];

  statBars.forEach((bar) => {
    const percentage = (bar.value / 255) * 100;
    bar.element.style.setProperty("--fill", `${percentage}%`);
  });

  const typeColor = typeColors[primaryType] || "#aa9";
  statBars.forEach((bar) => {
    bar.element.style.setProperty("--type-color", typeColor);
  });
};

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`,
    );
    const data = await response.json();

    pokemonName.innerText = `${data.name.toUpperCase()}`;
    pokemonId.innerText = `#${String(data.id).padStart(4, "0")}`;
    weight.innerText = `⚖️ ${data.weight / 10} kg`;
    height.innerText = `📏 ${data.height / 10} m`;
    sprite.src = `${data.sprites.front_default}`;

    types.innerHTML = data.types
      .map(
        (obj) =>
          `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`,
      )
      .join(" ");

    const statValues = [
      data.stats[0].base_stat,
      data.stats[1].base_stat,
      data.stats[2].base_stat,
      data.stats[3].base_stat,
      data.stats[4].base_stat,
      data.stats[5].base_stat,
    ];

    hp.innerText = `${statValues[0]}`;
    attack.innerText = `${statValues[1]}`;
    defense.innerText = `${statValues[2]}`;
    specialAttack.innerText = `${statValues[3]}`;
    specialDefense.innerText = `${statValues[4]}`;
    speed.innerText = `${statValues[5]}`;

    const primaryType = data.types[0].type.name;
    fillStatBars(statValues, primaryType);
  } catch (err) {
    alert("Pokemon Not Found");
  }
};

searchBtn.addEventListener("click", () => {
  getPokemon();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getPokemon();
  }
});
