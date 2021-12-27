<template>
    <main>
        <v-item-group active-class="primary">
                <v-row>
                    <v-col  cols="12" >
                        <div class="text-subtitle-1 text-left font-weight-normal grey--text mb-2" v-if="!allUsers">
                            No user has been registered yet, please check back !
                        </div>
                        <template else>
                            <v-data-table
                                :headers="headers"
                                :items="allUsers"
                                :items-per-page="10"
                                class="elevation-0"
                            >
                            </v-data-table>
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
            headers: [
            { text: 'All Users', value: 'firstName' },
            { text: 'Date of Registration', value: 'updatedAt', align: 'right' },
            ],
        }
    },
    computed: {
        ...mapGetters({
            'allUsers': 'administration/allUsers'
        })
    },
    methods: {
        ...mapActions({
            'getAllUsers': 'administration/getAllUsers'
        })
    },
    mounted(){
        this.getAllUsers()
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