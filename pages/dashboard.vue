<template>
    <main>
        <v-item-group active-class="primary">
            <v-container>
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
import { mapGetters, mapActions } from "vuex"
export default {
    middleware: ['auth', 'isUser'],
    data(){
        return {

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
        this.getMyBorrowedBooks()
    }
}
</script>
<style scoped>
a{
    text-decoration: none !important;
}
</style>
