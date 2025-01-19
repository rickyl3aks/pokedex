import React, { ReactNode } from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  children?: ReactNode;
}

export const SEO = ({ title, description, pathname, children }: SeoProps) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `src/images/icon.png`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link key="favicon" rel="icon" href="./images/icon.png" type="image/png" />,{children}
    </>
  );
};
