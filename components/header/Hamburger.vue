<template>
  <button class="hamburger" @click="$emit('toggleNav')">Toggle menu</button>
</template>

<script>
export default {
  name: 'hamburger',
  model: {
    event: 'toggleNav'
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.hamburger
  background-color: transparent
  display: flex
  right: 0
  margin: 0
  padding: 0
  width: 5rem
  height: 4rem
  font-size: 0
  text-indent: -9999px
  z-index: 40
  appearance: none
  box-shadow: none
  border-radius: 0
  border: none
  cursor: pointer
  overflow: hidden
  position: absolute
  top: 18px

  +laptop-up()
    display: none

  &:focus
    outline: 0

  &:before,
  &:after
    content: ''
    display: block
    height: 2px
    width: 2rem
    background-color: $black
    transition: transform .1s ease-in-out, margin-top .1s ease-in-out .1s
    position: absolute
    right: 1rem
    top: 50%

  &:before
    margin-top: -0.6rem

  &:after
    margin-top: 0.3rem

.open-nav
  .hamburger
    &:before,
    &:after
      transition: transform .1s ease-in-out .1s, margin-top .1s ease-in-out

    &:before
      transform: rotate(45deg)
      margin-top: 0

    &:after
      transform: rotate(-45deg)
      margin-top: 0

</style>
