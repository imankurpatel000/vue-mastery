
<template lang="pug">
.card
  p Are you sure you want to delete your account?

  button.button.danger.-has-icon.-small(type="button" v-on:click="deleteAccount")
    span
      i.fa.fa-trash-alt
      | Delete Account
</template>

<script>
export default {
  methods: {
    deleteAccount () {
      this.$store.dispatch('deleteUser')
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

