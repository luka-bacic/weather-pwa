module.exports = {
  siteMetadata: {
    title: 'weather-app',
    siteUrl: 'https://weather-jfsd3t5.netlify.app/',
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Weather - get forecasts for any part of the world.`,
        short_name: `Weather`,
        start_url: `/`,
        background_color: `#e4eff6`,
        theme_color: `#055583`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-offline',
    //   options: {
    //     workboxConfig: {
    //       globPatterns: ['**/icon-path*'],
    //     },
    //   },
    // },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-resolve-src',
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true,
      },
    },
  ],
};
