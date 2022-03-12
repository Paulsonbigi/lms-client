<template>
    <main>
        <v-item-group active-class="primary">
            <v-container>
              <template>
                <div>
                  <v-alert
                    v-model="alert"
                    dismissible
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                    icon="mdi-twitter"
                  ><nuxt-link :to="url">
                    {{message}}
                    </nuxt-link>
                  </v-alert>

                  <div class="text-center">

                  </div>
                </div>
              </template>
                <v-row>
                    <v-col  cols="12" md="4" >
                        <v-item >
                            <v-card  class="d-flex align-center justify-center flex-column pa-2"  height="150" >
                                <nuxt-link to="/shelf">
                                    <div class="text-subtitle-1 text-center mx-auto font-weight-normal grey--text">Number of books borrowed </div>
                                    <div class="text-h3 text-center mx-auto primary--text">{{borrowedBooks.length}}</div>
                                </nuxt-link>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
    </main>
</template>
<script>
import Pusher from "pusher-js"
import { mapGetters, mapActions } from "vuex"
import ENV from "@/env"
export default {
    middleware: ['auth', 'isUser'],
    data(){
        return {
          message: null,
          url: "/",
          alert: false
        }
    },
    computed: {
        ...mapGetters({
            'borrowedBooks': 'transactions/borrowedBooks'
        })
    },
    methods: {
        ...mapActions({
            'getMyBorrowedBooks': 'transactions/getMyBorrowedBooks'
        })
    },
    mounted(){
        if(this.user.role ==="admin"){
            this.$router.push("/admins/dashboard")
        }
        this.$notify({
            group: 'all',
            text: `Welcome ${this.user.firstName}`,
            max: "1",
            duration: 1500,
        })
        this.getMyBorrowedBooks();

      const pusher = new Pusher(ENV.pusherKey, {
        cluster: 'mt1'
      });

      const channel = pusher.subscribe('book-notification-channel');
      channel.bind('test_event', function(data) {
        this.alert = true
        this.message = data.message;
        this.url = data.redirectUrl;
      });
    }
}
</script>
<style scoped>
a{
    text-decoration: none !important;
}
</style>
