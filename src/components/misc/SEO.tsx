// Source https://www.gatsbyjs.com/tutorial/seo-and-social-sharing-cards-tutorial/

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import banner from 'images/banner.jpg';

type Image = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
};

type Props = {
  description?: string;
  lang?: string;
  meta?: object[];
  image?: Image;
  title?: string;
  pathname?: string;
};

function SEO({ description, lang, meta, image, title, pathname }: Props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  let imageData: Image = {
    src: '',
  };

  if (image && image.src) {
    imageData.src = `${site.siteMetadata.siteUrl}${image.src}`;
    imageData.width = image?.width;
    imageData.height = image?.height;
    imageData.alt = image?.alt;
  } else {
    imageData.src = banner;
    imageData.width = 1200;
    imageData.height = 675;
    imageData.alt = 'A blown windsock in front of semi cloudy skies.';
  }

  const additionalMeta: any = [];
  if (typeof meta !== 'undefined' && meta.length > 0) {
    additionalMeta.concat(meta);
  }

  const canonical = pathname
    ? `${site.siteMetadata.siteUrl}${pathname}/`
    : null;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: 'canonical',
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: imageData.src,
        },
        {
          property: 'og:image:width',
          content: imageData.width,
        },
        {
          property: 'og:image:height',
          content: imageData.height,
        },
        {
          name: 'twitter:image',
          content: imageData.src,
        },
        {
          name: 'twitter:image:alt',
          content: imageData.alt,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ].concat(additionalMeta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default SEO;
