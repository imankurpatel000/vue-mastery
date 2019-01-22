<template lang='pug'>
  .container
    PageHeader(title='We Teach Live'
              title2='Learn Vue in our interactive workshop'
              align='center'
              background_image='/images/conference-background-transparent.png'
              background_color='linear-gradient(to right, #41B782 , #86D169)')
       
    section.benefit-section
      .wrapper
        .flex-columns
          div
            Icon(name="info" width="60" height="60")
            h3 What's covered?
            p You’ll learn everything needed to build production-level Vue.js apps, from Vue Router to Vuex to API calls with Axios.
          div
            Icon(name="award" width="60" height="60")
            h3 Learn by doing
            p This is an in-person 2-day workshop where we’ll build real-world apps together, step-by-step.
          div
            Icon(name="users" width="60" height="60")
            h3 Who's it for?
            p Our workshop is available as a public course or a private training. Students need to be comfortable with HTML5 and JavaScript.
        
    section.introduction-section
      .text-wrapper.text-center
          h2.display-3 2-Day Course Outline
          p.lead The Vue Mastery workshop is designed to start you at ground zero and elevate you to production-level Vue skills by the end of day 2.
      .wrapper
        
        .flex-columns
          div
            p We begin with the essential Vue syntax, then create a single page application that has routing, makes API calls, utilizes state management with Vuex, and has efficient code reuse.

            p All content includes best practices and is reviewed by members of the core Vue.js team.

            p After each new topic is taught, students are guided through interactive exercises as they learn by building a complete Vue app.
          div
            img(src="/images/img-live-training.png" alt="Adam teaching students in person")

    section.schedule-section
      .wrapper
        .flex-columns
          div
            h4.display-1 Day 1
            ul
              li Essential Syntax
              li Setup & Tooling
                li Create & Manage your Vue app with Vue CLI
                li Vue Router & Single Page Applications
                li Vue Components
                  ul
                    li Props, Events & Slots
                    li Global & Base Components
                li API Calls with Axios
          div
            h4.display-1 Day 2
            ul
              li State Management with Vuex
              li Implementing a Progress Bar
              li Component Loading
              li Route Guards
              li Error Handling
              li Forms and Validation
              li Filters & Mixins
      
    section.workshops-section
      .wrapper
        h3.display-3.text-center Upcoming Workshops

        .flex-columns.-half
          .workshop
            label.primary-label 1 Day Only
            h4 Intro to Vue @ VueConf US
            .workshop-meta.-light
              Icon(name="calendar")
              span March 25, 2019 - 9:00 AM to 6:00 PM
            .workshop-meta
              Icon(name="map")
              b Tampa, FL
            p This one day intensive in Tampa, Florida is for developers who haven’t started learning Vue, or just got started.  We teach you the fundamentals of Vue so you can start being productive and building apps immediately.  This is the day before VueConf US, so our workshop will be a great primer for those new to Vue.js.

            b Cost for Workshop + Conference: $1295
            .workshop-promo 
                span Use Promo code: #[b() VUEMASTERYWS50]
            div
              button(class="button secondary") Visit Conference Website

          .workshop
            label.primary-label 1 Day Only
            h4 Intro to Vue @ VueJS Amsterdam
            .workshop-meta.-light
              Icon(name="calendar")
              span February 12, 2019 - 9:00 AM to 5:00 PM
            .workshop-meta
              Icon(name="map")
              b Amsterdam, Netherlands
            p This one day intensive in Amsterdam, Netherlands is for developers who haven’t started learning Vue, or just got started.  We teach you the fundamentals of Vue so you can start being productive and building apps immediately.  This is the day before the FrontEnd Love & VueJS Amsterdam conferences, so our workshop will be a great primer for those new to Vue.js.

            b Cost for Workshop: €754.98
            div
              button(class="button secondary") Visit Workshop Registration

    section.public-section
      .text-wrapper.text-center
        h3.display-3 Private Workshops
        p.lead If your company wants onsite training, we’d love to send two of our teachers to run this workshop with your team.

        h5 Cost: #[b $9,000] for 1-Day, #[b $12,000] for 2-Days
        p (for 10 or less developers, then $1,000 per extra developer)
      .wrapper
        .flex-columns
          .checklist.-primary
            h4 The cost also includes:
            ul
              li
                div
                  Icon(name="check")
                p A one year Vue Mastery subscription for each attendee.
              li
                div
                  Icon(name="check")
                p Our travel & hotel expenses if traveling within the United States / Canada.
          
          .checklist.-danger
            h4 The cost does not include:
            ul
              li
                div
                  Icon(name="slash")
                p A training room to teach in, we assume you’ll be providing this.
              li
                div
                  Icon(name="slash")
                p Catering.
              li
                div
                  Icon(name="slash")
                p Live music, sorry to say. ;-p
          
    section.faq-panel
      h3.text-center Frequently Asked Questions
      ul
        Faq(question='What knowledge do my developers need to have before they do the workshop?'
          answer='Students need to be comfortable with HTML5 and JavaScript, otherwise they might be a little lost.')

        Faq(question='Is this covering the same content as seen on Vue Mastery?'
          answer='Yes, we teach from the material we’ve produced on Vue Mastery, however, between each lesson we provide labs where you get hands-on experience coding Vue yourself.  We’ll be there in person when you get stuck, and will answer any questions along the way.  This also means that when you leave the workshop, if you want to review the material you’ll be able to watch each lesson again.  This is why with private workshops we provide a year membership to Vue Mastery.')

        Faq(question='Can I get a discount to a public workshop?'
          answer='Join our mailing list to receive information on occasional promo codes.')
        
        Faq(question='Will you run a public workshop in my city?'
          answer='If you think there’s enough interest in your city, just get in touch.')

        Faq(question='Which version of Vue are you using?'
          answer='We are *always* teaching the latest version of Vue. We constantly update the training material to follow the new Vue versions.')

        Faq(question='Can we customize the content?'
          answer='Public classes follow our normal outline, but if there’s something specific you want to learn with a private workshop, please do ask.')

        Faq(question='Do I need to bring my own laptop to your workshop?'
          answer='Yes. Both PC and MAC are perfectly fine, you\'ll get the same experience during the workshop.')

        Faq(question='What is the setup required on my laptop?'
          answer='A detailed setup document will be sent to attendees one week prior to the training.')

        Faq(question='Will I get any certification on completion of the course?'
          answer='You will receive a Vue Mastery course completion certificate.')
          
          
</template>

<script>
import Faq from '~/components/ui/Faq'
import Icon from '~/components/ui/Icon'
import PageHeader from '~/components/ui/PageHeader'
export default {
  name: 'page-live-training',
  components: {
    Faq,
    Icon,
    PageHeader
  }
}
</script>

<style lang='stylus' scoped>
.display-1
  font-size 72px
  margin-bottom 0

.display-3
  font-size 54px

.lead
  font-weight 200
  font-size 20px
  +tablet-up()
    font-size 26px

.flex-columns
  display flex
  flex-wrap wrap
  justify-content space-between

  &.-half > div
    width 100%

    +tablet-up()
      width 45%

.header-hero
  padding-top: $size.by-6
  padding-bottom: $size.by-6
  background rgba($secondary-color, 10%)

.benefit-section
  width 100%
  padding-top: $size.by-5
  padding-bottom: $size.by-5

.schedule-section
.public-section 
  position relative
  width 100%
  padding-top: $size.by-7
  padding-bottom: $size.by-7

.benefit-section .flex-columns > div
  width 100%
  +tablet-up()
    width 30%

.benefit-section .icon
  color $primary-color

.introduction-section
  display flex
  flex-wrap wrap
  flex-direction column
  align-items center

.introduction-section .flex-columns > div
.schedule-section .wrapper .flex-columns > div
  width 100%

  +tablet-up()
    width 45%

  ul > li > ul
    padding-bottom 0

.schedule-section
  background url(/images/bkg-schedule-workshop.svg) no-repeat
  background-position center 40px

.workshop
  display flex
  flex-direction column
  margin-top: $size.by-2
  margin-bottom: $size.by-2

  h4
    margin-bottom 16px
  p
    margin-top 0

.workshop-promo
  margin-top: $size.by-1
  margin-bottom: $size.by-1
  align-self flex-start
  padding 10px
  color #7a7a7a
  background #f2f2f2
  border 1px dashed #dcdcdc

.workshop-meta
  display flex
  align-items center
  margin-bottom: $size.by-1

  &.-light
    font-weight 200
    font-size 22px
    font-style normal

  .icon
    margin-right: $size.by-1

.primary-label
  font-weight 700
  color $primary-color

.text-wrapper
  max-width 700px

.public-section 
  display flex
  flex-direction column
  align-items center
  width 100%
  margin 0 auto

  .flex-columns
    max-width 1000px
    margin 0 auto

    h5
      margin 0
      
      > b
        font-size 1.2em

.checklist
  width 100%

  +tablet-up()
    width 40%

  ul
    padding 0
    margin 0
    list-style-type none

    li
      display flex
      align-items center
      justify-content space-between
        
      .icon
        margin-right: $size.by-1

      p
        flex-grow 1
        margin-top 10px


  &.-primary
    h4
    .icon
      color $primary-color
  
  &.-danger
    h4
    .icon
      color: $states.error

.faq-panel
  width 100%
  margin-top: $size.by-2
  padding: 0 $size.by-2
  color $secondary-color
  ul
    max-width 650px
    margin 0 auto
    list-style-type none

</style>