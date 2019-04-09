export default {
  get (d) {
    let title = `${d.pageTitle} - ${d.categoryTitle} | Vue Mastery`
    return {
      title: title,
      meta: [{
        hid: `description`,
        name: 'description',
        content: d.description
      }, {
        hid: `og:description`,
        name: 'og:description',
        content: d.description
      }, {
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/${d.category}/${d.categorySlug}/${d.pageSlug}`
      }, {
        hid: `og:title`,
        property: 'og:title',
        content: title
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
      }, {
        hid: `author`,
        name: 'author',
        content: d.author || 'Adam Jahr'
      }]
    }
  }
}
