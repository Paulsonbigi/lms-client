<template>
    <main>
        <v-item-group active-class="primary">
        <v-container fluid>
                <div>
                    <v-row>
                        <v-col cols="12" md="4">
                            <div class="d-flex items-center">
                                <v-form class="d-flex items-center">
                                    <v-text-field
                                        v-model="search"
                                        placeholder="Search books"
                                        append-icon="mdi-magnify"
                                        dense
                                        outlined
                                        block
                                        height="40"
                                        :required="true"
                                        class="ma-0 p-0 mb-3"
                                    />
                                    <v-btn
                                        class="ml-1"
                                        depressed
                                        height="40"
                                        width="40"
                                        :loading="loading"
                                        :disabled="loading"
                                        color="primary"
                                        @click="searchResult"
                                        >
                                        <v-icon>
                                            mdi-filter
                                        </v-icon>
                                    </v-btn>
                                </v-form>
                            </div>
                        </v-col>
                        <div>
                        </div>
                    </v-row>
                </div>

                <v-row>
                    <v-col  cols="12" >
                        <div class="text-subtitle-1 text-center font-weight-normal mt-8 grey--text mb-2" v-if="bookRequests.length < 1">
                            No book matches your search input!
                        </div>
                        <template v-else>
                            <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">
                                        <div class="text-subtitle-1 text-left font-weight-medium grey--text mb-2">Book <span class="primary--text">Title</span></div>
                                    </th>
                                    <th class="text-center">
                                        Number of requests
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in allBooks"
                                        :key="item.id"
                                        class="grey--text"
                                    >
                                        <td>
                                            <nuxt-link :to="'/admins/book-requests/' + item._id" class="grey--text" >{{ item.bookTitle }}</nuxt-link>
                                        </td>
                                        <td class="text-center" v-if="item.requestUsers">{{ item.numberOfRequest }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                            </template>
                    </v-col>
                </v-row>
                </v-container>
        </v-item-group>
    </main>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
export default {
    middleware: ['auth', 'isAdmin'],
    components: {},
    data(){
        return {
            loading: false,
            search: null,
        }
    },
    computed: {
        ...mapGetters({
            'bookRequests': 'administration/bookRequests',
            'allBooks': 'transactions/allBooks',
            'pendingRequests': 'administration/pendingRequests'
        }),
    },
    methods:{
        ...mapActions({
            'getAllBookRequests': 'administration/getAllBookRequests',
            'getAllPendingRequests': 'administration/getAllPendingRequests',
            'getAllBooks': 'transactions/getAllBooks',
        }),

        searchResult(){
            const data = {
                book: this.search ? this.search : ""
            }
            this.getAllBooks(data)
        }
    },

    mounted(){
        this.getAllBookRequests()
        const data = {
            book: this.search ? this.search : ""
        }
        this.getAllBooks(data)
    }
}
</script>
<style scoped>
a{
    text-decoration: none !important;
}
.table-width{
    width: 100% !important;
    background: red !important;
}
</style>