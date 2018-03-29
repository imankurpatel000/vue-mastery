export default {
  get (d) {
    return {
      title: `${d.categoryTitle}: ${d.pageTitle}`,
      meta: [{
        hid: `og:description`,
        name: 'description',
        content: d.description
      }, {
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/courses/${d.categorySlug}/${d.pageSlug}`
      }, {
        hid: `og:title`,
        property: 'og:title',
        content: `${d.categoryTitle}: ${d.pageTitle}`
      }, {
        hid: `og:image`,
        property: 'og:image',
        content: d.facebookImage || d.image || `${process.env.url}/images/facbeook_image.png`
      }, {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: d.pageTitle
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: d.description
      }, {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: d.twitterImage || d.image || `${process.env.url}/images/facbeook_image.png`
      }]
    }
  }
}
