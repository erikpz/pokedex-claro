export const getTypeColor = (type: string) => {
  switch (type) {
    case "water":
      return {
        bgcolor: "#219ebc",
        color: "#fff",
      };
    case "bug":
      return {
        bgcolor: "#588157",
        color: "#fff",
      };
    case "grass":
      return {
        bgcolor: "#02c39a",
        color: "#fff",
      };
    case "dark":
      return {
        bgcolor: "#495057",
        color: "#fff",
      };
    case "dragon":
      return {
        bgcolor: "#8338ec",
        color: "#fff",
      };
    case "electric":
      return {
        bgcolor: "#fcbf49",
        color: "#fff",
      };
    case "fairy":
      return {
        bgcolor: "#ff99c8",
        color: "#fff",
      };
    case "fighting":
      return {
        bgcolor: "#b08968",
        color: "#fff",
      };
    case "fire":
      return {
        bgcolor: "#ef233c",
        color: "#fff",
      };
    case "flying":
      return {
        bgcolor: "#a2d2ff",
        color: "#fff",
      };
    case "ghost":
      return {
        bgcolor: "#540d6e",
        color: "#fff",
      };
    case "ground":
      return {
        bgcolor: "#9c6644",
        color: "#fff",
      };
    case "ice":
      return {
        bgcolor: "#56cfe1",
        color: "#fff",
      };
    case "normal":
      return {
        bgcolor: "#83c5be",
        color: "#fff",
      };
    case "poison":
      return {
        bgcolor: "#7209b7",
        color: "#fff",
      };
    case "psychic":
      return {
        bgcolor: "#e0b1cb",
        color: "#fff",
      };
    case "rock":
      return {
        bgcolor: "#7f4f24",
        color: "#fff",
      };
    case "steel":
      return {
        bgcolor: "#ced4da",
        color: "#000",
      };
    case "shadow":
      return {
        bgcolor: "#073b4c",
        color: "#fff",
      };
    default:
      return {
        bgcolor: "#6c757d",
        color: "#fff",
      };
  }
};

export const getTypeTranslate = (type: string) => {
  switch (type) {
    case "water":
      return "Agua";
    case "bug":
      return "Insecto";
    case "grass":
      return "Planta";
    case "dark":
      return "Oscuro";
    case "dragon":
      return "Dragón";
    case "electric":
      return "Eléctrico";
    case "fairy":
      return "Hada";
    case "fighting":
      return "Lucha";
    case "fire":
      return "Fuego";
    case "flying":
      return "Aire";
    case "ghost":
      return "Fantasma";
    case "ground":
      return "Tierra";
    case "ice":
      return "Hielo";
    case "normal":
      return "Normal";
    case "poison":
      return "Veneno";
    case "psychic":
      return "Psiquico";
    case "rock":
      return "Roca";
    case "steel":
      return "Acero";
    case "shadow":
      return "Sombra";
    default:
      return "Desconocido";
  }
};
