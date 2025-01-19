import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            author
            image
            siteUrl
            twitterUsername
          }
        }
      }
    `
  );

  return site.siteMetadata;
};
