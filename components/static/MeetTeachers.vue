<template lang="pug">
  .banner
    .wrapper
      h2.title Meet Your Teachers

      .instructor.gregg
        img(src='/images/gregg-avatar.jpg')
        h3 Gregg Pollack
        p Gregg is passionate about teaching open source technology online. Previously he created Code School, an online software programming school which was acquired by Pluralsight.  He lives in Orlando, Florida with his two kids Ender and Alanna.

      .instructor.adam
        img(src='/images/adam-avatar.jpg')
        h3 Adam Jahr
        p Adam Jahr is a developer and programming instructor passionate about making it easier to learn complex skills. He previously instructed at The Iron Yard’s coding bootcamp before joining Vue Mastery in order to help developers progress along their professional paths.

      .instructor.ben
        img(src='/images/ben-avatar.jpg')
        h3 Ben Hong
        p Ben Hong is a psychologist / developer / educator hybrid, whose origin story harkens back to the days when he would build cheesy websites like his “Fortune Cookie Universe” using one too many marque, blink elements, and dancing baby GIFs
</template>

<script>
export default {
  name: 'meet-teachers'
}
</script>

<style lang="stylus" scoped>
.wrapper
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)
  grid-template-columns 1fr
  grid-row-gap 2em
  grid-template-areas 'title'\
                      'gregg'\
                      'adam'\
                      'ben'

  +tablet-up()
    padding-top $vertical-space
    padding-bottom $vertical-space
    grid-column-gap 4%
    grid-row-gap 0
    grid-template-columns 1fr 1fr
    grid-template-areas 'title title'\
                        'gregg adam'\
                        'ben ben'

.title
  grid-area title
  padding-top 0
  margin-bottom ($vertical-space/2)
  border-bottom solid 2px $secondary-color
  color $secondary-color
  text-align center

  +tablet-up()
    margin-bottom $vertical-space

.instructor
  text-align center
  max-width 500px
  justify-self center

  h3
    padding-top 0
    color $primary-color
  img
    margin-bottom ($vertical-space/2)
    max-width 245px

.gregg
  grid-area gregg

.adam
  grid-area adam

.ben
  grid-area ben
  margin-top ($vertical-space/2)
</style>
