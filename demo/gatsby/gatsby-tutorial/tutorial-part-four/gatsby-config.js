module.exports = {
  siteMetadata: {
    // 标题
    title: `Blah Blah Fake Title`
  },
  plugins: [
    // 文件系统
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    // Markdown文件转换插件
    `gatsby-transformer-remark`,
    `gatsby-plugin-glamor`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
};
