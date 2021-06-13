import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_AUTHOR } from '@constants/site';

interface SEOProps {
  title: string;
  description?: string;
  author?: string;
  lang?: string;
  meta?:
    | {
        name: string;
        content: string;
        property?: undefined;
      }
    | {
        name?: undefined;
        content: string;
        property: string;
      }[];
}

const SEO: FC<SEOProps> = props => {
  const { description, lang, meta, title } = {
    lang: `kr`,
    meta: [],
    description: ``,
    ...props,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${SITE_TITLE}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: SITE_TITLE,
        },
        {
          property: `og:description`,
          content: SITE_DESCRIPTION,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: SITE_AUTHOR,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: SITE_DESCRIPTION,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
