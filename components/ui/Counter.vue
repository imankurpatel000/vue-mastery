<template lang="pug">
.counter
  h4
    | 25% of every dollar goes to the Vue.js project! 
    | Together, we’ve given:
  .count
    span.dollar $
    i-count-up(
      :delay="delay"
      :endVal="participation"
      :options="options"
    )
    .fa.fa-chevron-right
    .love(:class='{beat: hover}')
      img(src='/images/counter/vue.png')
</template>

<script>
import ICountUp from 'vue-countup-v2'
export default {
  name: 'counter',
  props: {
    participation: {
      type: Number,
      required: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ICountUp
  },
  data () {
    return {
      delay: 1000,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  }
}
</script>

<style lang='stylus' scoped>

.counter
  position relative
  display flex
  flex-direction column
  justify-content center
  align-items center
  height 12rem
  margin-bottom -4.2rem
  margin-top -1.5rem
  padding-bottom 2rem
  background-image url(/images/counter/ribbon.svg)
  background-size cover
  background-position center
  font-size 16px
  text-align center
  z-index 2
  color #fff

  h4
    padding-top 0
    font-size 16px
    line-height 21px
    margin-top -7px
    margin-bottom 7px
    max-width 24rem

    +tablet-up()
      max-width 100%
      margin-bottom 2px

.count
  font-size 3rem
  font-weight bold

  +tablet-up()
    font-size 4rem



.dollar
  font-weight 700
  color #39b982
  font-size 35px
  vertical-align top
  padding-right 2px

.fa
  font-size 23px
  vertical-align middle
  padding-left 1.5rem
  position relative
  top -5px

.love
  display inline-block
  width 45px
  height 45px
  margin-left 1rem
  border 2px solid #fff
  border-radius 50%
  padding 8px
  justify-items center

  +mobile-only()
    margin-bottom -6px

  img
    display block
    margin-top 2px
    object-fit contain

  &.beat
    animation .8s infinite beatHeart

@keyframes beatHeart
  0%
    transform scale(1)
  25%
    transform scale(1.1)
  40%
    transform scale(1)
  60%
    transform scale(1.1)
  100%
    transform scale(1)

</style>
