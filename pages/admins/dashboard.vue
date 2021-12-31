<template>
    <main>
        <v-item-group active-class="primary">
            <v-row>
                <v-col  cols="12" md="4" >
                    <v-item >
                        <v-card  class="d-flex align-center justify-center flex-column pa-2"  height="150" >
                            <nuxt-link to="/admins/users">
                                <div class="text-subtitle-1 text-center mx-auto font-weight-normal grey--text">Total number of users </div>
                                <div class="text-h3 text-center mx-auto primary--text">{{allUsers.length}}</div>
                            </nuxt-link>
                        </v-card>
                    </v-item>
                </v-col>
                <v-col  cols="12" md="4" >
                    <v-item >
                        <v-card  class="d-flex align-center justify-center flex-column pa-2"  height="150" >
                            <nuxt-link to="/admins/all-books">
                                <div class="text-subtitle-1 text-center mx-auto font-weight-normal grey--text">Number of registered books</div>
                                <div class="text-h3 text-center mx-auto primary--text">{{allBooks.length}}</div>
                            </nuxt-link>
                        </v-card>
                    </v-item >
                </v-col>
                <v-col  cols="12" md="4" >
                    <v-item >
                        <v-card  class="d-flex align-center justify-center flex-column pa-2"  height="150" >
                                <div class="text-subtitle-1 text-center mx-auto font-weight-normal grey--text">Number of books borrowed </div>
                                <div class="text-h3 text-center mx-auto primary--text">{{allApprovedRequests.length}}</div>
                        </v-card>
                    </v-item >
                </v-col>
            </v-row>
        </v-item-group>
    </main>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
    middleware: ['auth', 'isAdmin'],
    components: {},
    data(){
        return {
            search: null
        }
    },
    computed: {
        ...mapGetters({
            'allUsers': 'administration/allUsers',
            'allApprovedRequests': 'administration/allApprovedRequests',
            'allBooks': 'transactions/allBooks'
        })
    },
    methods: {
        ...mapActions({
            'getAllUsers': 'administration/getAllUsers',
            'getAllApprovedRequests': 'administration/getAllApprovedRequests',
            'getAllBooks': 'transactions/getAllBooks',
        })
    },
    mounted(){
        this.getAllUsers(this.search ? this.search : "")
        this.getAllApprovedRequests()
        const data = {
            book: ""
        }
        this.getAllBooks(data)
    }
}
</script>
<style scoped>
a{
    text-decoration: none !important;
}
</style>