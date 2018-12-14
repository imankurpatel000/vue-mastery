<template lang="pug">
.pricing-card
  .card-body(:style="alignment")
    h3.text-center {{ title }}

    template(v-if="price")
      .money
        .symbol $
        .decimal {{ price }}

      .text-center(v-if="per")
        i per {{ per }}

    slot(name="benefits")

    slot(name='action')
</template>

<script>
export default {
  name: 'pricing-card',
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: [String, Number]
    },
    per: {
      type: String
    },
    align: {
      type: String
    }
  },
  data () {
    return {
      alignment: {
        placeItems: this.align
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pricing-card
  display flex
  align-items: stretch;
  flex-direction: column;
  background #fff
  border-radius: 12px
  transition: box-shadow .5s cubic-bezier(0.19, 1, 0.22, 1)
  color $secondary-color
  box-shadow: $shadow.depth-1

  &:hover
    text-decoration none

  h3
    padding-top 0

  &.secondary
    color #FFFFFF
    background $secondary-color

    &:hover button
      color $secondary-color

  .button
    margin-top auto
    margin-bottom 0

  .card-body
    display flex
    flex-direction column
    align-items stretch
    flex-grow 1

.benefit
  display flex
  align-items start
  margin-bottom: $size.by-1
  margin-top: $size.by-1

  &.color-primary
    color $primary-color

  &.color-gold
    color #968E11
    flex-grow 1

  i
  img
    margin-right 10px
    font-size 30px
    max-width 30px

.money
  display flex
  justify-content center

.symbol
  font-weight 700
  color $primary-color
  font-size 35px
  padding-top 10px
  margin-left -20px

.decimal
  color $secondary-color
  font-weight 700
  font-size 100px
  line-height 1



// .card
//   height 100%
//   color $secondary-color

//   &:hover
//     text-decoration none

//   h3
//     padding-top 0

//   &.secondary
//     color #FFFFFF
//     background $secondary-color
//     &:hover button
//       color $secondary-color

//   .button
//     margin-bottom 0

//   .card-body
//     display flex
//     flex-direction column

// .benefit
//   display flex
//   align-items start
//   margin-bottom 10px
//   margin-top 10px

//   &.color-primary
//     color $primary-color

//   &.color-gold
//     color #968E11
//     flex-grow 1

//   i
//   img
//     margin-right 10px
//     font-size 30px
//     max-width 30px

</style>
