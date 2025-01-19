export type PokemonProps = {
  id: string;
  image: string;
  stats: {
    attack: number;
    defense: number;
    hp: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  types: string[];
  name: string;
};

export type SpeciesProps = {
  species: {
    name: string;
  };
};

export type EntryProps = {
  language: {
    name: string;
  };
};
