<template lang='pug'>
form.form.card
  .card-body
    .form-group
      label Profile Image
      
      .upload
        button.button.primary.border Upload Image
        input.input(type='file'
                    accept='image/*'
                    placeholder='Profile Image'
                    ref='fileInput'
                    @change='updateProfileImage')
    
    .form-group
      label Display Name
      input.input(type='email'
                  placeholder='Display Name'
                  v-model='newData.displayName'
                  @input="updateField('displayName')")

    .form-error
      .callout.-error(v-if='formError.length > 0' v-text='formError')
      .callout.-success(v-if='formSuccess.length > 0' v-text='formSuccess')

</template>

<script>
export default {
  name: 'account-edit',

  props: {
    account: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      newData: {
        displayName: this.account.displayName || '',
        image: this.account.image || ''
      },
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },

  watch: {
    account () {
      if (this.account) {
        this.newData = {
          displayName: this.account.displayName,
          image: this.account.image
        }
      }
    }
  },

  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },

    updateField (key) {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.$store.dispatch('account/userUpdate', this.newData)
          .then(() => {
            this.formSuccess = 'Successfully updated your account details'
          })
          .catch((err) => {
            this.formError = 'Error saving the profile changes'
            console.error(err)
          })
      }, 500)
    },

    updateProfileImage () {
      this.resetFormMessages()
      this.$store.dispatch(`account/userUpdateImage`, this.$refs.fileInput.files[0])
        .then(() => {
          this.formSuccess = 'Successfully uploaded a new profile image'
          // reset the form input
          this.$refs.fileInput.value = null
        })
        .catch((err) => {
          this.formError = 'Error uploading new profile image'
          console.error(err)
        })
    }
  }
}
</script>
<style lang='stylus' scoped>
label
  font-weight 600
  margin-bottom 5px

.form-group.-switched
  display flex
  flex-direction: row
  align-items center
</style>
