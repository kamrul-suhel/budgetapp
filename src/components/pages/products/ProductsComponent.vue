<template>
	<div class="products">
		<h2 class="pb-3">Products</h2>
		<v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Title" v-model="editedItem.name"></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field 
                                    label="Description" 
                                    v-model="editedItem.description"
                                    multi-line
                                    ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>

                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

		<v-card>
			<v-card-title class="pb-0 pt-0">
				<v-btn color="light" slot="activator" raised class="mb-2">Add Product</v-btn>

				<v-spacer></v-spacer>
				<v-text-field
					prepend-icon="search"
					label="Search"
					v-model="search"></v-text-field>
			</v-card-title>

			<v-card-text>
				<v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"
                    :rows-per-page-items="row_per_page"
                    >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
                        <td class="text-xs-left">{{ props.item.quantity }}</td>
                        <td class="text-xs-left">TK. {{ props.item.sale_price }}</td>
                        <td class="text-xs-left">TK. {{ props.item.purchase_price }}</td>
                        <td class="text-xs-left">{{ props.item.status }}</td>
                        <td class="justify-start layout px-0">
                            <v-btn icon class="mx-0" @click="editItem(props.item)">
                                <v-icon color="primary">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </template>

                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>    

                    <template slot="no-data">
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
        data: () => ({
            dialog: false,
            search:'',
            headers: [
                {
                    text: 'Identifier',
                    align: 'left',
                    sortable: true,
                    value: 'id'
                },
                { 
                    text: 'Title', 
                    value: 'name',
                    sortable: true
                },
                { 
                    text: 'Description', 
                    value: 'description',
                },
                {
                    text: 'Quantity',
                    value: 'quantity',
                    sortable:true
                },
                {
                    text: 'Sale price',
                    value: 'sale_price',
                    sortable: true
                },
                {
                    text: 'Purchase price',
                    value: 'purchase_price',
                    sortable: true
                },
                {
                    text: 'Status',
                    value: 'status',
                    sortable: true
                },
                {
                    text: 'Action',
                    value: 'action'
                }
            ],
            items: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                name: '',
                description: '',
            },
            defaultItem: {
                name: '',
                descriptin: '',
            },
            row_per_page: [20,30,50,{"text":"All","value":-1}],
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                axios.get('http://system.test/products/')
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            },

            editItem (item) {
                this.editedIndex = this.items.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.items.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                let form = new FormData();
                let url = 'http://system.test/products/';

                form.append('name', this.editedItem.name);
                form.append('description', this.editedItem.description);
                    
                if (this.editedIndex > -1) {
                    axios.post(url, form)
                        .then((response) => {
                            Object.assign(this.items[this.editedIndex], this.editedItem)
                            })
                    .catch((error)=> {

                    });
                } else {
                    let url = url + this.editedItem.id;

                    axios.post(url, form)
                    .then((response) => {
                        this.items.push(response.data);
                    });
                }
                this.close()
            
            }
        }
    }
</script>