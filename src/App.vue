<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch
              v-model="subscribed"
              color="primary"
              value="primary"
              hide-details
              @click="clicked"
            ></v-switch>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Subscribe</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click="signIn" v-if="!signedIn">Sign In</v-btn>      
      <v-btn flat @click="signOut" v-if="signedIn">Sign Out</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view> 
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import * as firebase from 'firebase'
  import router from './router'
  export default {
    created () {},
    data () {
      return {
        fixed: true,
        drawer: false,
        dialog: false,
        subscribed: false,
        ex11: false,
        items: [
          { icon: 'bubble_chart', title: 'Keystone Notification' }
        ],
        title: 'Keystone Notification',
      }
    },
    methods: {
      signOut () {
        firebase.auth().signOut()
        this.$store.commit('signedOut', null)
        this.$router.push('/')
      },
      signIn () {
        this.$router.push('/auth')
      },
      clicked () {
        if (!this.subscribe) {
          firebase.messaging().requestPermission()
            .then(() => firebase.messaging().getToken()
            .then((token) => { 
              console.log(token)

              firebase.database().ref('/tokens').push({
                token: token,
                uid: firebase.auth().currentUser.uid
              })
            })
            .catch(() => console.log('No permission.')))
        } else {

        }
      }
    },
    computed: {
      signedIn () {
        return this.$store.getters.isSignedIn
      },
      isSubscribed () {
        /* firebase.database().ref('/token').orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              return true
            } else {
              return false
            }
          }) */
      }
    }    
  }
</script>
