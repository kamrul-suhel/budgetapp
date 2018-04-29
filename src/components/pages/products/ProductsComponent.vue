<template>
	<div class="products">
		<v-container grid-list-lg>
			<v-layout row wrap>
				<v-flex xs12>
					<h2>Products</h2>
				</v-flex>
			</v-layout>

			<v-layout row wrap>
				<v-flex xs3>
					<v-card class="color-primary">
						<v-card-title>Total product</v-card-title>
					</v-card>
				</v-flex>

				<v-flex xs3>
					<v-card class="color-primary">
						<v-card-title>Total product</v-card-title>
					</v-card>
				</v-flex>

				<v-flex xs3>
					<v-card class="color-primary">
						<v-card-title>Total product</v-card-title>
					</v-card>
				</v-flex>

				<v-flex xs3>
					<v-card class="color-primary">
						<v-card-title>Total product</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<v-dialog 
			v-model="dialog" 
			max-width="800px" 
			height="1000px"
			persistent>
            <v-card class="px-2 py-2">
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

                            <v-flex xs6>
                            	<v-text-field
                            		label="Quantity"
                            		type="number"
                            		placeholder="00.00"
                            		v-model="editedItem.quantity"
                            		></v-text-field>
                            </v-flex>

                            <v-flex xs6>
                            	<v-select
                            		label="Quantity type"
                            		:items="quantity_type"
                            		v-model="editedItem.quantity_type"
                            		auto
                            		></v-select>
                            </v-flex>

                            <v-flex xs6>
                            	<v-select
	                            	:items="status"
	                            	v-model="editedItem.status"
	                            	label="Status"
	                            	auto
	                            ></v-select>
                            </v-flex>

                            <v-flex xs6>
                            	<v-text-field
                            		label="Sale Price"
                            		type="number"
                            		placeholder="00.00"
                            		prefix="TK"
                            		v-model="editedItem.sale_price"
                            		></v-text-field>
                            </v-flex>

                            <v-flex xs6>
                            	<v-text-field
                            		label="Purchase price"
                            		type="number"
                            		placeholder="00.00"
                            		prefix="TK"
                            		v-model="editedItem.purchase_price">
                            	</v-text-field>
                            </v-flex>

                            <v-flex xs6>
                            	<v-select
                            		label="Categories"
                            		:items="categories"
                            		v-model="selectedCategories"
                            		multiple
                            		chips
                            		persistent-hint
                            		>
                            	</v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn dark color="dark" raised @click.native="close">Cancel</v-btn>

                    <v-btn dark color="dark" raised @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-container grid-list-lg>
        	<v-layout row wrap>
        		<v-card 
        			raised
        			width="100%">
					<v-card-title class="pb-0 pt-0">
						<v-btn dark fab small color="indigo" @click="dialog = true">
							<v-icon>add</v-icon>
						</v-btn>

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
		                    :pagination.sync="pagination" 
		                    :rows-per-page-items="row_per_page"
		                    item-key="name"
		                    >

		                    <template slot="headers" slot-scope="props">
		                    	<tr>
		                    		<th 
		                    			v-for="header in props.headers"
		                    			:key="header.value"
		                    			:class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
		                    			@click="changeSort(header.value)"
								        >
								        <v-icon small>arrow_upward</v-icon>
		                    			{{ header.text}}
		                    		</th>
		                    	</tr>
		                    </template>

		                    <template slot="items" slot-scope="props">
		                        <td>{{ props.index +=1 }}</td>
		                        <td class="text-xs-center">{{ props.item.name }}</td>
		                        <td class="text-xs-center">{{ props.item.quantity }}</td>
		                        <td class="text-xs-center">{{ props.item.quantity_type }}</td>
		                        <td class="text-xs-center">TK. {{ props.item.sale_price }}</td>
		                        <td class="text-xs-center">TK. {{ props.item.purchase_price }}</td>
		                        <td class="text-xs-center">{{ props.item.status }}</td>
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
        	</v-layout>
        </v-container>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
        data: () => ({
            dialog: false,
            search:'',
            pagination: {
		        sortBy: 'name',
	      	},

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
                    text: 'Quantity',
                    value: 'quantity',
                    sortable:true
                },
                {
                	text: 'Quantity type',
                	value: 'quantity_types',
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
            total_product:'',
            items: [],
            status: [
            		{ 
            			text: 'Avaliable',
            			value: 'available'
            		}, 
            		{ 
            			text: 'Unavaliable',
            			value: 'unavailable'
            		}
            	],
            editedIndex: -1,
            editedItem: {
                id:'',
                name: '',
                description: '',
                quantity:'',
                status:'avaliable',
                sale_price: '',
                purchase_price: '',
                quantity_type:'',
            },
            selectedCategories:[],

            quantity_type: [],

            categories:[],
            defaultItem: {
                name: '',
                descriptin: '',
            },
            row_per_page: [20,30,50,{"text":"All","value":-1}],

            purchase_price_field: false,
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
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
            	// get all product
                axios.get('http://system.test/products/')
                .then((response) => {
                    this.items = response.data.products;
                    this.quantity_type = response.data.quantity_types;
                    this.total_product = response.data.total_product;
                    
                })
                .catch((error) => {
                    console.log(error);
                });

                // get all categories
                axios .get('http://system.test/categories')
                	.then((response) => {
                		let categories = response.data;
                		categories.forEach((value) => {
                			let category = new Object();
                			category.value = value.id;
                			category.text = value.name;

                			this.categories.push(category);
                		});
                	})
                	.catch((error) => {
                		console.log('categories error');
                		console.log(error);
                	});
            },

            editItem (item) {
            	// get selected categories & all categories
            	let url = 'http://system.test/products/'+item.id+'/categories';

            	axios.get(url)
            		.then((response) => {
            			let selectedCategories = response.data;
            			selectedCategories.forEach((value) => {
            				let categories = new Object();
            				categories.value = value.id;
            				categories.text = value.name;
            				this.selectedCategories.push(categories);
            			});
            		});
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
                this.selectedCategories = [];
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
                    
                console.log(this.selectedCategories);
                return;
                this.close()
            
            },

            changeSort (column) {
		        if (this.pagination.sortBy === column) {
		          this.pagination.descending = !this.pagination.descending
		        } else {
		          this.pagination.sortBy = column
		          this.pagination.descending = false
		        }
		      }
        }
    }
</script>