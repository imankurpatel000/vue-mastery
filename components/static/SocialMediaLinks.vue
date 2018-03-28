<template lang='pug'>
.social
  a.button.primary.link.-only-icon(href='https://www.facebook.com/vuemastery' target='_blank' alt='Facebook')
    i.fab.fa-facebook
      .visually-hidden Facebook

  a.button.primary.link.-only-icon(href='https://twitter.com/vuemastery' target='_blank' alt='Twitter')
    i.fab.fa-twitter
      .visually-hidden Twitter

  a.button.primary.link.-only-icon(href='https://medium.com/vue-mastery' target='_blank' alt='Medium')
    i.fab.fa-medium
      .visually-hidden Medium

  a.button.primary.link.-only-icon(href='https://www.youtube.com/vue-mastery' target='_blank' alt='Youtube')
    i.fab.fa-youtube
      .visually-hidden Youtube
</template>


<script>
export default {
  name: 'social-media-links'
}
</script>

<style lang='stylus' scoped>
.social
  display flex
  font-size 2em
  margin-right 1em
</style>
