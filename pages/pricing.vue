<template lang="pug">
  .wrapper
    .pricing-content
      h2.title Becoming a Vue Mastery Subscriber means
      ul
        li Access to all paid content.  New Lessons Weekly.
        li The ability to track your course progress.
        li Supporting the Vue.js News Podcast.
        li Most importantly, supporting the Vue.js project itself.
    .pricing-structure
      .page-title.text-center
        h2 Pricing
      .monthly
        nuxt-link.card(to="/")
          .card-body
            h3.text-center Monthly
            .money
              .symbol $
              .decimal 19
            div.text-center
              i per month
            .benefit
              img(src="/images/lgo-vue.svg" alt="Vue.js")
              span $5 of your monthly subscription goes to supporting the Vue.js project itself.
            .benefit.color-gold
              i.fas.fa-shield-alt
              b Guaranteed Value
            button.button.primary.border.-full Select Plan
      .annually
        nuxt-link.card(to="/")
          .card-body
            h3.text-center Annual
            .money
              .symbol $
              .decimal 190
            div.text-center
              i per year
            .benefit
              img(src="/images/lgo-vue.svg" alt="Vue.js")
              span $50 of your monthly subscription goes to supporting the Vue.js project itself.
            .benefit.color-primary
              i.fa.fa-piggy-bank
              b Get 2 months free <br>
                small ($38 discount)
            .benefit.color-gold
              i.fas.fa-shield-alt
              b Guaranteed Value
            button.button.primary.-full Select Plan
      .team
        nuxt-link.card.secondary(to="/")
          .card-body
            h3.text-center Team
            img(src="/images/img-group.svg" alt="Team accounts VueMastery")
            div
              p Please contact us, and we’ll take care of you.
              p FYI, all team accounts are billed yearly.
            button.button.inverted.border Contact Us
</template>

<script>
export default {
  name: 'page-pricing'
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

build-grid-area(pricing-content pricing-structure page-title monthly annually team)

.wrapper
  background url(/images/bkg-outline-mountains.svg)
  background-position center bottom
  background-size cover
  grid-template-columns 1fr
  grid-template-areas 'pricing-content'\
                      'pricing-structure'

  +laptop-up()
    grid-template-columns 33% 1fr
    grid-column-gap 2%
    grid-template-areas 'pricing-content pricing-structure'


.pricing-content
  display flex
  flex-direction column
  justify-content center
  text-align center

  .title
    color $secondary-color

  +laptop-up()
    text-align left

.pricing-structure
  display grid
  margin-bottom $vertical-space
  grid-column-gap 20px
  grid-row-gap 20px
  grid-template-columns 1fr
  grid-template-areas 'page-title'\
                      'monthly'\
                      'annually'\
                      'team'

  +tablet-up()
    grid-template-columns 1fr 1fr
    grid-template-areas 'page-title page-title'\
                        'monthly annually'\
                        'team team'

  +laptop-up()
    align-items stretch
    grid-template-columns 1fr 1fr 1fr
    grid-template-areas 'page-title page-title page-title'\
                        'monthly annually team'\

.page-title h2
  color $secondary-color
  font-weight 400

.card
  height 100%
  h3
    padding-top 0

  &.secondary
    color #FFFFFF
    background $secondary-color
    &:hover button
      color $secondary-color

  .button
    margin-bottom 0

  .card-body
    display flex
    flex-direction column

.benefit
  display flex
  align-items start
  margin-bottom 10px
  margin-top 10px

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

.team
  .card-body
    text-align center

    h3
      width 100%
    img
      margin-top 10px
      margin-bottom 0px
      max-width 140px

    +tablet-up()
      display flex
      justify-content space-around
      align-items center
      flex-wrap wrap
      text-align left

    +laptop-up()
      text-align center

      .button
        width 100%

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
</style>
