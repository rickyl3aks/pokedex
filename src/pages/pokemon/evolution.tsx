import React from "react";
import { SpeciesProps } from "../../components/types/types";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  border: 10px solid rgba(255, 255, 255, 0.7);
  color: rgba(255, 255, 255, 0.7);
  background-color: rgb(59, 59, 59);
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(77, 77, 77, 0.7);
  border-radius: 50%;
  padding: 0.5rem;
  position: relative;
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const EvolutionChain = ({ chain }: { species: string } | any) => {
  if (!chain) {
    return null;
  }

  return (
    <Container>
      <Card>
        <Title>{chain.species.name.charAt(0).toUpperCase() + chain.species.name.slice(1)}</Title>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.match(/(\d+)\/$/)[1]}.png`}
          alt={`${chain.species.name}`}
        />
      </Card>
      {chain.evolves_to.length > 0 &&
        chain.evolves_to.map((nextChain: SpeciesProps) => <EvolutionChain key={nextChain.species.name} chain={nextChain} />)}
    </Container>
  );
};

export default EvolutionChain;
