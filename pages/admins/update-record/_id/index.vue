<template>
    <main>
    <v-container>
        <v-item-group active-class="primary">
                <div class="text-h6 text-left font-weight-medium grey--text mb-10 text-capitalize">{{singleBook.bookTitle}}</span></div>
                <div>
                    <v-row>
                        <v-col cols="12" md="4" class="pa-0">
                            <div class="d-flex items-center">
                                <v-form class="d-flex items-center">
                                    <v-text-field
                                        v-model="search"
                                        placeholder="Search User"
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
                                        @click="searchUser"
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
                        <v-col cols="12" md="8" class="pa-0">
                            <v-btn class="ml-auto d-flex" color="primary" depressed @click="approveReq">Update Record</v-btn>
                        </v-col>
                    </v-row>
                </div>
                <v-row>
                    <v-col  cols="12" class="pa-0">
                        <div class="text-subtitle-1 d-flex justify-center mx-auto text-center mt-8 font-weight-normal grey--text mb-2" v-if="sameApprovedBooks.length < 1">
                            No pending request requests for {{singleBook.bookTitle}} awaiting return
                        </div>
                        <template v-else>
                            <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">
                                        Users
                                    </th>
                                    <th class="text-right">
                                        Update User
                                    </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr
                                        v-for="item in sameApprovedBooks"
                                        :key="item._id"
                                        >
                                        <td >{{ item.username }}</td>
                                        <td class="text-right d-flex ml-auto my-auto" v-if="item">                                        
                                            <v-checkbox v-model="selected" color="primary" class="d-flex justify-content-end ml-auto align-right" :value="item._id" :multiple="true"></v-checkbox>
                                        </td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
        </v-item-group>
        </v-container>
        <v-dialog
            v-model="dialog"
            max-width="290"
            >
            <v-card>
                <v-card-title class="text-h5 d-flex justify-center mx-auto text-center primary--text">
                    Update Record
                </v-card-title>

                <v-card-text class="text-center">
                    Are you sure you have received {{singleBook.bookTitle}} from the selected persons?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn @click="confirmApproval()" color="primary" depressed block class="px-12 w-full bg-primary ">{{loading ? "A moment.." : "Confirm"}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
            
    </main>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
export default {
    middleware: ['auth', 'isAdmin'],
  components: {},
  data(){
      return {
        dialog: false,
        search: null,
        bookTitle: 'Purpose driven life',
        checkbox: false,
        approvals: null,
        selected: null,
        headers: [
            { text: 'Users', value: 'user.username' },
            { text: '', value: 'actions', sortable: false, align: 'right' }
        ],
      }
    },
    computed: {
            ...mapGetters({
                'bookRequests': 'administration/bookRequests',
                'loading': 'administration/loading',
                'sameApprovedBooks': 'administration/sameApprovedBooks',
                'singleBook': 'transactions/singleBook'
            }),
        },
    methods:{
        ...mapMutations({
            'SET_MESSAGE': 'transactions/SET_MESSAGE',
        }),
            ...mapActions({
                'getSingleBook': 'transactions/getSingleBook',
                'updateRequests': 'administration/updateRequests',
                'getSameBookRequestsApproved': 'administration/getSameBookRequestsApproved',
            }),

            clickToApprove(val){
                this.approvals = val
            },

            async approveReq(){
                if(!this.selected ){
                    this.$notify({
                        group: 'auth',
                        text: 'You need to select at least a book to continue.',
                        duration: 2000,
                    });
                    this.dialog = false;
                }    else{
                    this.dialog = true;
                }
                
            },

            async confirmApproval(){
                try{
                    const data = {
                        requestId: this.selected,
                        bookId: this.bookRequestsId
                    }
                    await this.updateRequests(data)
                    this.dialog = true;
                } catch(err){

                }
            },

            async searchUser(e) {
                try{
                    e.preventDefault();
                    
                    const data = {
                        requestId: this.$route.params.id,
                        username: this.search ? this.search : ""
                    }
                    this.getSameBookRequestsApproved(data)
                } catch (err){

                }
            }
    },
    mounted(){
        this.bookRequestsId = this.$route.params.id
        this.getSingleBook(this.bookRequestsId)
        const data = {
            requestId: this.$route.params.id,
            username: this.search ? this.search : ""
        }
        this.getSameBookRequestsApproved(data)
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