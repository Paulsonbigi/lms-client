<template>
    <main>
        <v-item-group active-class="primary">
                <v-row>
                        <v-col cols="12" md="4">
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
                                        @click="searchAUser"
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
                <v-row>
                    <v-col  cols="12" >
                        <div class="text-subtitle-1 text-left font-weight-normal grey--text mb-2" v-if="!allUsers">
                            No user has been registered yet, please check back !
                        </div>
                        <template v-else>
                         <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">
                                        <div class="text-subtitle-1 text-left font-weight-medium grey--text mb-2">All  <span class="primary--text">Users</span></div>
                                    </th>
                                    <th class="text-center">
                                        Date of Registration
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in allUsers"
                                        :key="item.id"
                                        class="grey--text"
                                    >
                                        <td>
                                            {{ item.username }}
                                        </td>
                                        <td class="text-center">{{ item.createdAt }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                        </template>
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
            search: null,
        }
    },
    computed: {
        ...mapGetters({
            'allUsers': 'administration/allUsers',
            'loading': 'administration/loading'
        })
    },
    methods: {
        ...mapActions({
            'getAllUsers': 'administration/getAllUsers'
        }),

        async searchAUser(e){
            e.preventDefault();
            
            await this.getAllUsers(this.search ? this.search : "")
        }
    },
    mounted(){
        this.getAllUsers(this.search ? this.search : "")
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