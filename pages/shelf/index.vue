<template>
    <main>
    <v-container>
        <v-item-group active-class="primary">
                <div>
                    <v-row>
                        <v-col cols="12" md="4" pa-0 class="pa-0">
                            <div class="d-flex items-center">
                                <v-form class="d-flex items-center">
                                    <v-text-field
                                        v-model="search"
                                        placeholder="Search book"
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
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <th class="text-left">
                                            <div class="text-subtitle-1 text-left font-weight-medium grey--text mb-2">Book  <span class="primary--text">Title</span></div>
                                        </th>
                                        <th class="text-center">
                                        Author
                                        </th>
                                        <th class="text-center">
                                        My request ID
                                        </th>
                                        <th class="text-center">
                                        Return Date
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="item in myApprovedBooks"
                                            :key="item.id"
                                            class="grey--text"
                                        >
                                            <td>
                                                {{ item.appliedBooks.bookTitle }}
                                            </td>
                                            <td class="text-center">{{ item.appliedBooks.authorName }}</td>
                                            <td class="text-center">{{ item.appliedBooks._id }}</td>
                                            <td class="text-right">{{ item.returnDate }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
        </v-item-group>
        </v-container>
    </main>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
export default {
    middleware: ['auth', 'isUser'],
    components: {},
    data(){
        return {
            search: null,
            loading: false,
            headers: [
            {
                text: 'Book Title',
                align: 'start',
                sortable: false,
                value: 'appliedBooks.bookTitle',
            },
            { text: 'Author', value: 'appliedBooks.authorName' },
            { text: 'My request ID', value: 'appliedBooks._id' },
            { text: 'Return Date', value: 'appliedBooks._id' },
            ],
        }
    },
    watch: {
        
    },
    computed: {
        ...mapGetters({
            'myApprovedBooks': 'transactions/myApprovedBooks'
        }),
        books: function(){
            if(this.search) {
                return this.searchResult()
            }
            return this.allBooks
        }
    },
    methods: {
        ...mapActions({
            'getMyApprovedBooks': 'transactions/getMyApprovedBooks',
        }),
        editItem(val){
            this.$router.push(`/admins/all-books/edit/${val._id}`)
        },
        searchResult(){

        }
    },
    mounted(){
        this.getMyApprovedBooks(this.search)
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