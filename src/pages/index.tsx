import * as React from "react";
import { SEO } from "../components/seo";
import Layout from "../components/Layout";
import Title from "../components/styles/styles";
import Pokemon from "../components/pokemon-list";

const IndexPage = () => {
  return (
    <Layout>
      <Title>Pokedex</Title>
      <Pokemon />
    </Layout>
  );
};

export const Head = () => <SEO title="Homepage" />;

export default IndexPage;
