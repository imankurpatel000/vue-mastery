<template lang='pug'>
  .container
    .wrapper
      div.header-hero
        h1.display-1 We Teach Live
        h2 Learn Vue in our interactive workshop

      section.benefit-section.flex-columns
        div
          Icon(name="info" width="60" height="60")
          h3 What's covered?
          p You’ll learn everything needed to build production-level Vue.js apps, and get a free one-year membership to Vue Mastery bundled in admission price.
        div
          Icon(name="award" width="60" height="60")
          h3 Learn by doing
          p This is an in-person 2-day workshop where we’ll build apps together, step-by-step.
        div
          Icon(name="users" width="60" height="60")
          h3 Who's it for?
          p Our workshop is available as a public course or a private training. Students need to have a foundational understanding of HTML5 and JavaScript.
        
      section.introduciton-section
        h2.display-3 2-Day Course Outline
        p.lead The Vue Mastery workshop is designed to start you at ground zero and elevate you to production-level Vue skills by the end of day 2.
        
        .flex-columns
          div
            p We begin with the essential Vue syntax, then create a single page application that has routing, makes API calls, utilizes state management with Vuex, and has efficient code reuse.

            p All content includes best practices and is reviewed by members of the core Vue.js team.

            p After each new topic is taught, students are guided through interactive exercises as they learn by building a complete Vue app.
        
      section.schedule-section.flex-columns
        div
          h4.display-1 Day 1
          ul
            li Essential Syntax
              ul
                li The Vue Instance
                li Reactivity 
                li Directives
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
            li Filters 
            li Mixins
            li Deploying to production
      
      section.quotes-section
        h3.display-3.text-center What students are saying

      section.workshops-section
        h3.display-3.text-center Upcoming Workshops

        .flex-columns.-half
          div
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
            span Use Promo code: VUEMASTERYWS50
            button(class="button secondary") Visit Conference Website

          div
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
            button(class="button secondary") Visit Workshop Registration

      section.public-section
        .text-wrapper.text-center
          h3.display-3 Public Workshops
          p.lead If your company wants to train your team onsite, we’d love to send two of our teachers to run this workshop with your team.

          h5 Cost: #[b $12,000]
          p (for 10 or less developers, then $1,000 per extra developer)

        div.flex-columns
          .checklist.-primary
            h4 The cost includes:
            ul
              li
                div
                  Icon(name="check")
                p A one year Vue Mastery subscription for each attendee.
              li
                div
                  Icon(name="check")
                p Our travel & hotel expenses if traveling within the United States / Canada.  If you need us elsewhere around the world we’ll need to adjust the price for additional travel.
          
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
        h3.text-center Frequently Asked Question
        ul
          Faq(question='What is the Vue Mastery 2 day workshop?'
            answer='This is a 2-day training for web professionals, available as a public workshop or as a corporate on-site training.')

          Faq(question='Is this covering the same content as seen on Vue Mastery?'
            answer='Yes, we teach from the material we’ve produced on Vue Mastery, however, between each lesson we present we provide labs where you get hands-on experience and try coding Vue yourself.  We’ll be there in person when you get stuck, and will answer any questions along the way.  This also means that when you leave the workshop, if you want to review the material you’ll be able to watch the lesson online again.  This is why your admission comes with a year membership to Vue Mastery.')

          Faq(question='Can I get a discount to a public workshop?'
            answer='Join our mailing list, follow us on Facebook, or Twitter as we can find promo codes.')
          
          Faq(question='Will you visit my city?'
            answer='If you think there’s enough interest to run a workshop in your city, definitely!  Just get in touch.')

          Faq(question='Which version of Vue are you using?'
            answer='We are *always* teaching on the latest version of Vue. We constantly update the training material to follow the new Vue versions.')

          Faq(question='Can we customize the content?'
            answer='Public classes follow our normal outline, but if there’s something specific you want to learn with a private workshop please do ask.')

          Faq(question='Is it ok to bring a MAC or a PC?'
            answer='Both PC and MAC are perfectly fine, you\'ll get the same experience during the workshop.')

          Faq(question='What is the setup required?'
            answer='A detailed setup document is sent to attendees one week prior to the training.   Basically, you’ll need the latest version of npm setup.')

          Faq(question='Will I get any certification on completion of the course?'
            answer='You will receive a Vue Mastery course completion certificate.')
          
          
</template>

<script>
import Faq from '~/components/ui/Faq'
import Icon from '~/components/ui/Icon'
export default {
  name: 'page-live-training',
  components: {
    Faq,
    Icon
  }
}
</script>

<style lang='stylus' scoped>
.display-1
  font-size 72px

.display-3
  font-size 54px

.lead
  font-weight 200
  font-size 26px

.flex-columns
  display flex
  justify-content space-between

  &.-half > div
    width 45%

  
.benefit-section
.schedule-section
.public-section 
  padding-top: $size.by-5
  padding-bottom: $size.by-5

.benefit-section > div
.schedule-section > div
    width 30%

.schedule-section > div
  width 45%

  ul > li > ul
    padding-bottom 0

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

.public-section 
  max-width 1000px
  margin 0 auto

  > .text-wrapper
    max-width 700px
    margin 0 auto

    h5
      margin 0
      
      > b
        font-size 1.2em

.checklist
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