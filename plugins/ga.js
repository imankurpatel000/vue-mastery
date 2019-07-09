/* eslint-disable */
import Vue from 'vue'

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return
  /*
  ** Include Google Analytics Script
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /*
  ** Set the current page
  */
  ga('create', 'UA-90157003-2', 'auto')
  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to) => {
    /*
    ** We tell Google Analytics to add a `pageview`
    */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })

  Vue.prototype.$trackAccount = function(location){
    ga('send', 'event', 'User', 'Created Account', location, 1)
  }

  Vue.prototype.$trackMonthly = function(){
    ga('send', 'event', 'User', 'Monthly Subscription')
  }

  Vue.prototype.$trackAnnual = function(){
    ga('send', 'event', 'User', 'Annual Subscription')
  }

  Vue.prototype.$track3Months = function(){
    ga('send', 'event', 'User', '3 months Subscription')
  }
}