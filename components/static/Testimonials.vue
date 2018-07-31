<template lang="pug">
.wrapper
  .quote-box
    blockquote Use Vue? Wish it had something like Laracasts/Railscasts? You NEED to check out Vue Mastery. Weekly, high-quality video tutorials by two veterans: Gregg Pollack and Adam Jahr.

    cite
      img(src='/images/chris-avatar.jpg')
      | Chris Fritz, #[br]Vue Core Team

  .quote-box
    blockquote Vue Mastery has been doing a great job curating important and relevant materials, if you're into Vue, you should consider following them!

    cite
      img(src='/images/sarah-avatar.jpg')
      | Sarah Drasner, #[br]Vue Core Team
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  padding-bottom $vertical-space
  justify-content space-between
  align-items center
  flex-flow wrap

.quote-box
  width 100%
  margin-bottom 20px

  +laptop-up()
    width 46%

blockquote
  color $gray
  font-style italic
  text-align center

  +tablet-up()
    font-size 1.2em
    line-height 1.6

cite
  display flex
  flex-flow column
  text-align center
  font-size 1.2em
  color $gray

  img
    border-radius 40px
    width 80px
    margin 0 auto 10px
</style>
