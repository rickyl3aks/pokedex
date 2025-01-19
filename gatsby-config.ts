import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Pokedex`,
    description: `List of pokemon`,
    author: "Riccardo Consolandi",
    twitterUsername: `@rickyL3aks`,
    image: `./images/icon.png`,
    siteUrl: ``,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-pokeapi`,
      options: {
        nbOfPokemons: 150,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Pokedex",
        short_name: "Pokedex",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: "src/images/icon.png",
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        web: [
          {
            name: `Oswald`,
            file: `https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap`,
          },
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap`,
          },
          {
            name: `Roboto`,
            file: `https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap`,
          },
        ],
      },
    },
  ],
};

export default config;
