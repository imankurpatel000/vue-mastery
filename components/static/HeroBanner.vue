<template lang='pug'>
  .banner
    .text
      h1.title The ultimate learning resource for Vue developers
      p.lead Weekly Vue.js tutorials to guide your journey to Mastery.

      //- .actions
      //-   nuxt-link.button.inverted(to='/courses') Explore courses
</template>

<script>
export default {
  name: 'hero-banner'
}
</script>

<style lang='stylus' scoped>
.text
  position absolute
  color white
  top: 20%
  text-align: center
  padding: 0 15px;
  width: 100%
  height: 100%
  +tablet-up()
    top: 14%
  +laptop-up()
    top: 20%

.banner
  position: relative;
  overflow: hidden;
  min-height: 600px
  height: 92vh;

.title
  max-width: 300px;
  padding-top 0
  margin 0 auto
  font-size: 24px;
  font-weight: 600;

  +tablet-up()
    font-size: 29px;
    max-width: 400px;

  +laptop-up()
    font-size: 40px;
    max-width 550px

.lead
  font-size: 16px;
  font-weight: 400;

.actions
  +mobile-only()
    position: absolute
    top: 64%
    left: 0
    width: 100%
  .button
    background: rgb(92,86,182);
    background: linear-gradient(180deg, rgba(92,86,182,1) 0%, rgba(116,110,202,1) 100%);
    line-height: 35px;
    color: #fff;
    padding: 14px;
    border-radius: 4px;
    height: 36px;
    font-size: 14px;
    font-weight: 600;

.video
  +tablet-up()
    width 600px
    margin 0 auto

  +laptop-up()
    width 800px

</style>
