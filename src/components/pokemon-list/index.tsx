import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useMemo, useState } from "react";
import { PokemonProps } from "../types/types";
import styled from "styled-components";
import SearchInput from "../search-input/searchInput";
import FilterSelect from "../filter-select/filterSelect";
import { Button } from "../../pages/pokemon/[info]";

interface CardProps {
  noHover?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

export const Card = styled.div<CardProps>`
  width: 220px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    ${({ noHover }) =>
      !noHover &&
      `
      cursor: pointer;
      transform: translateY(-10px);
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    `}
  }

  text-align: center;
  padding: 1rem;
`;

export const TypeBox = styled.span`
  margin: 0.2rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.3rem;
  background-color: #3b4cca;
  color: white;
`;

export const Pokemon = ({ siteTitle }: any) => {
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(18);

  const allPokemon = useStaticQuery(graphql`
    query MyQuery {
      allPokemon(limit: 150, sort: { name: ASC }) {
        nodes {
          id
          image
          types
          stats {
            attack
            defense
            hp
            special_attack
            special_defense
            speed
          }
          name
        }
      }
    }
  `);

  const filteredPokemon = useMemo(() => {
    let filteredList = allPokemon.allPokemon.nodes;

    if (searchQuery) {
      filteredList = filteredList.filter((poke: PokemonProps) => poke.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    switch (filter) {
      case "high_attack":
        filteredList = filteredList
          .filter((poke: PokemonProps) => poke.stats.attack > 100)
          .sort((a: PokemonProps, b: PokemonProps) => b.stats.attack - a.stats.attack);
        break;
      case "high_defense":
        filteredList = filteredList
          .filter((poke: PokemonProps) => poke.stats.defense > 100)
          .sort((a: PokemonProps, b: PokemonProps) => b.stats.defense - a.stats.defense);
        break;
      case "ascendent":
        filteredList = filteredList.sort((a: PokemonProps, b: PokemonProps) => a.name.localeCompare(b.name));
        break;
      case "descendent":
        filteredList = filteredList.sort((a: PokemonProps, b: PokemonProps) => b.name.localeCompare(a.name));
        break;
      default:
        filteredList = filteredList.sort((a: PokemonProps, b: PokemonProps) => a.name.localeCompare(b.name));
        break;
    }

    return filteredList;
  }, [filter, searchQuery, allPokemon.allPokemon.nodes]);

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 18);
  };

  return (
    <div>
      <Link to={`/`}>{siteTitle}</Link>
      <FilterSelect filterQuery={filter} setFilterQuery={setFilter} />

      <div>
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Container>
          {filteredPokemon.slice(0, visibleCount).map((poke: PokemonProps) => {
            const pokemonName = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
            return (
              <Link
                to={`/pokemon/${poke.name.toLowerCase()}`}
                state={{ pokemon: poke }}
                key={poke.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card key={poke.id}>
                  <h1>{pokemonName}</h1>
                  <img src={poke.image} alt={`${poke.id}`} />
                  <div />
                  {poke.types.map((type: string, index: number) => (
                    <TypeBox key={index}>{type}</TypeBox>
                  ))}
                </Card>
              </Link>
            );
          })}
        </Container>

        {filteredPokemon.length > visibleCount && <Button onClick={handleLoadMore}>Load More Pokémon</Button>}
      </div>
    </div>
  );
};

export default Pokemon;
