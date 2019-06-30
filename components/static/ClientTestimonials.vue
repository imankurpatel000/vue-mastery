<template lang="pug">
.wrapper
  .quote-box
    cite
      img(src='/images/testimonials/william-clement.jpg')
      | William C.

    blockquote Vue Mastery is absolutely the best place to learn Vue, from your first version to advanced techniques. Instructors are brilliant, material is laid out perfectly for easy comprehension, and videos are high quality. I've purchased a handful of other courses and they don't even come close to Vue Mastery. Thank you guys for putting together these awesome courses!

  .quote-box
    cite
      img(src='/images/testimonials/jhillen.jpg')
      | J.D. H.

    blockquote
      | Vue Mastery has given me a better understanding of how Vue.js works under the hood. I've been able to take the lessons I've learned and apply them to my everyday development.
      br
      | Not just the best practices, but why things work the way they do. And how to adapt my applications for future use cases.
      br
      | Vue Mastery is a must to any developer who is interested in learning more about Vue.js.

  .quote-box
    cite
      img(src='/images/testimonials/aaron-davidolson.jpg')
      | Aaron O.

    blockquote
      | Solid, consistent instructional content can be hard to find all in one place.  Many of us bounce around from platform to platform trying to piece together our own custom learning experience which helps address the actual problems we're trying to solve in the real world.  I had been attracted to the buffet style learning platforms, assuming I was getting the best bang for my buck, only to find out that more content didn't mean more helpful.  As someone who is focused on developing Vue.js solutions, Vue Mastery has the exact type of in-depth focus that allows me to further my knowledge each time new content is released.


  .quote-box
    cite
      img(src='/images/testimonials/ludvik-wiejowski.jpg')
      | Ludvik W.

    blockquote
      | All vital information in one place, professionally presented with examples, cheat sheets. If you can't watch the video, you can read it. A truly great way how to learn a new technology not being flooded by huge amount of information when searching the Internet. I feel safe knowing that all important things I need to know about Vue.js are covered by Vue Mastery, moreover they are adding a new content regularly.

  .quote-box
    cite
      img(src='/images/testimonials/tarah-perry.jpg')
      | Tarah P.

    blockquote Vue Mastery has helped me significantly better understand Vuex and the basics of Vue.js. I am just a beginner, but I went ahead and got a year subscription and I am so happy and satisfied that I did. Definitely worth the money and I just do the tutorials as they come out.

  .quote-box
    cite
      img(src='/images/testimonials/callum-blow.jpg')
      | Callum B.

    blockquote Vue Mastery has been an ideal way to learn not only Vue, but other web app and development principles. Gregg and Adam explain everything from the fundamentals to advanced concepts in a clear and methodical way, supported by funny videos and neat visuals! Money well spent!

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
  display flex
  flex-direction column
  justify-content left
  align-self baseline
  margin-top 30px
  margin-bottom 20px

  +laptop-up()
    width 46%

blockquote
  color $gray
  font-style italic
  text-align center

  +tablet-up()
    font-size: 18px
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
