import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import EvolutionChain from "./evolution";
import { EntryProps } from "../../components/types/types";
import Flag from "../../components/flag/flag";
import wordsData from "../../components/translations/words.json";
import PokeballImage from "../../images/pokeball.png";
import { styled } from "styled-components";
import { Card, Container, TypeBox } from "../../components/pokemon-list";
import Layout from "../../components/Layout";
import Loading from "../../components/loading/loading";
import { SEO } from "../../components/seo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
`;

const PokemonImage = styled.img`
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #f1f1f1;
  max-width: 600px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
`;

const StatItem = styled.p`
  color: #fff;
`;

export const Button = styled.button`
  padding: 0.7rem 1.5rem;
  margin: 1rem auto;
  display: flex;
  background-color: #617eff;
  color: #fff;
  border: 2px solid #6164ff;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #5090e4;
    box-shadow: 0 0 5px rgba(80, 181, 228, 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(80, 181, 228, 0.5);
  }
`;

const EvolutionHeader = styled.h2`
  font-size: 1.5rem;
  color: #fff;
`;

const PokemonDetail = ({ params }: any) => {
  let name = params.info;
  const [evolution, setEvolution] = useState<any>("");
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const words: any = wordsData;
  const pokemonData = typeof window !== "undefined" && window.history.state?.pokemon;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const description =
          speciesData.flavor_text_entries.find((entry: EntryProps) => entry.language.name === selectedLanguage)?.flavor_text || null;
        setDescription(description);

        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();

        setEvolution(evolutionChainData);
      } catch (error) {
        console.error("error: ", error);
      }
    };

    fetchPokemonData();
  }, [name, selectedLanguage]);

  if (!pokemonData) {
    navigate("/");
    return <Loading />;
  }

  const { image, stats, types } = pokemonData;

  return (
    <Layout>
      <Wrapper>
        <Flag setSelectedLanguage={setSelectedLanguage} />
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Container>
          <Card noHover={true}>
            <Title>{name.charAt(0).toUpperCase() + name.slice(1)}</Title>
            <img src={image} alt={`${name}`} />
            <div />
            {types.map((type: string, index: number) => (
              <TypeBox key={index}>{type}</TypeBox>
            ))}
          </Card>
        </Container>

        {description.length > 0 ? <Description>{description}</Description> : <Loading />}
        <EvolutionHeader>EVOLUTION</EvolutionHeader>
        {evolution ? <EvolutionChain chain={evolution.chain} descriptions={description} /> : <Loading />}
        <StatsContainer>
          <StatItem>HP: {stats.hp}</StatItem>
          <StatItem>
            {words.attack[selectedLanguage]}: {stats.attack}
          </StatItem>
          <StatItem>
            {words.defense[selectedLanguage]}: {stats.defense}
          </StatItem>
          <StatItem>
            {words.specialAttack[selectedLanguage]}: {stats.special_attack}
          </StatItem>
          <StatItem>
            {words.specialDefense[selectedLanguage]}: {stats.special_defense}
          </StatItem>
          <StatItem>
            {words.speed[selectedLanguage]}: {stats.speed}
          </StatItem>
        </StatsContainer>
      </Wrapper>
    </Layout>
  );
};

export const Head = ({ params }: any) => {
  const name = params.info;
  return <SEO title={`${name.charAt(0).toUpperCase() + name.slice(1)} | Pokedex`} />;
};
export default PokemonDetail;
