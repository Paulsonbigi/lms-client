<template>
    <div>
        <v-container fluid>
            <div class="text-h6 text-left font-weight-medium grey--text mb-10 text-capitalize">Add New Book</span></div>
                <v-form ref="forma" v-model="valid" lazy-validation v-on:keyup.native.enter="addNewBook">
                    <v-row>
            <v-col cols="12" md="4" class="pa-2">
                <div>
                    <v-text-field
                        v-model="title"
                        placeholder="Book Title"
                        required
                        label="Book Title"
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="isbnNumber"
                        placeholder="ISBN number"
                        label="ISBN number"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="price"
                        placeholder="Price"
                        label="Price"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="noOfCopies"
                        placeholder="Number of copies"
                        label="Number of copies"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="description"
                        placeholder="Description"
                        label="Description"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
            </v-col>
            <v-col cols="12" md="4" class="pa-2">
                <div>
                    <v-text-field
                        v-model="authorName"
                        placeholder="Author name"
                        label="Author name"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                                <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="datePublished"
                                    label="Publish Date"
                                    prepend-icon=""
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    block
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                    class="ma-0 p-0 mb-3"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="datePublished"
                                    @input="menu2 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                   <v-file-input
                        v-model="bookCover"
                        placeholder="Upload book cover"
                        label="Upload book cover"
                        required
                        dense
                        outlined
                        prepend-icon=""
                        accept="image/png, image/jpeg, image/jpg"
                        prepend-inner-icon="mdi-camera"
                        hide-details
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
            </v-col>
        </v-row>
                    <v-row>
                        <v-col cols="12" md="4" class="pa-0">
                            <v-btn  color="primary" block class="px-12 bg-primary" @click="addNewBook()">{{ loading ? 'Adding new book...' : 'Add Book'}}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
        </v-container>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
    middleware: ['auth', 'isAdmin'],
    data(){
        return {
            valid: false,
            title: null,
            isbnNumber: null,
            price: null,
            noOfCopies: null,
            description: null,
            authorName: null,
            datePublished: null,
            bookCover: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }
    },
    computed: {
        ...mapGetters({
            'loading': 'administration/loading'
        })
    },
    methods:{
        ...mapActions({
            'createNewBook': 'administration/createNewBook'
        }),
        clearForm(){
            this.$ref.forma.reset()
        },

        async addNewBook() {
            try{
                let blob = this.bookCover
                let formData = new FormData()

                formData.append('bookTitle', this.title)
                formData.append('authorName', this.authorName)
                formData.append('isbnNumber', this.isbnNumber)
                formData.append('noOfCopies', this.noOfCopies)
                formData.append('publishDate', this.date)
                formData.append('description', this.description)
                formData.append('price', this.price)
                formData.append('bookCover', blob)
                await this.createNewBook(formData)
                this.$router.push("/admins/all-books/")
            } catch(err){

            }
        },
    }
}
</script>