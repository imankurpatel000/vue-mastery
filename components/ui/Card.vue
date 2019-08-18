<template lang='pug'>
.ui-card
  .ui-media-top(v-if="image_placement === 'top'")
    img(:src='image_url'
        :alt='title')

  .ui-card-body
    .ui-media-block
      .ui-media-image(v-if="image_url && image_placement !== 'top'")
        img(:src='image_url'
            :alt='title')
      .ui-media-body
        h3.ui-media-title
          | {{ title }}
          Badge(v-if='badge'
                text='FREE'
                variant='primary')
        p.ui-media-meta(v-if='meta') {{ meta }}
        p.ui-media-content {{ content }}

        slot(name='upcoming')

    .ui-actions
      slot(name='actions')
</template>

<script>
import Badge from '~/components/ui/Badge.vue'
import Icon from '~/components/ui/Icon.vue'
export default {
  name: 'ui-card',
  props: {
    title: {
      type: String,
      required: true
    },
    image_url: {
      type: String
    },
    image_placement: {
      type: String,
      default: 'left'
    },
    meta: {
      type: String
    },
    content: {
      type: String
    },
    badge: {
      type: Boolean
    }
  },
  components: {
    Badge,
    Icon
  }
}
</script>

<style lang='stylus' scoped>
.ui-card
  display flex
  flex-direction column
  position relative
  background #fff
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.30)
  border-radius: 12px
  transition: box-shadow .5s cubic-bezier(0.19, 1, 0.22, 1)

.ui-card-title
  transition color ease-in 200ms

.ui-card-body
  display flex
  flex-flow column
  justify-content space-between
  width 100%
  padding: 20px

  +tablet-up()
    flex-flow row

.ui-card:hover
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, .3)

  .title
    color $primary-color

.ui-media-block
  display flex
  flex-flow column
  align-items center
  flex-grow 1

  +tablet-up()
    flex-flow row

.ui-media-meta
  margin 0
  font-style italic
  color $gray

.ui-media-content
  margin 0

.ui-actions
  display flex
  align-items center
  justify-content center
  width 100%
  text-align: center
  margin-top 20px

  +tablet-up()
    flex-basis 0
    margin-left 4%
    margin-top: 0

  span
    font-weight: 700

.ui-media-top
  overflow hidden
  border-top-left-radius 12px
  border-top-right-radius 12px

.ui-media-image
  display flex
  justify-content center
  align-items center
  margin-bottom 20px

  +tablet-up()
    align-self flex-start
    margin-right 4%
    margin-bottom 0

  img
    object-fit contain
    max-width 100px

    +tablet-up()
      width: 120px
      height: 120px

.ui-media-body
  grid-area body
  text-align center

  +tablet-up()
    max-width 400px
    min-width: calc(100% - 200px)
    margin 0
    text-align left

.ui-media-title
  font-size 27px
  position relative
  padding-top 0

</style>
