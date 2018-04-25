<template>
	<div class="products">
		<v-card>
			<v-card-title>
				Products 
				<v-spacer></v-spacer>
				<v-text-field
					prepend-icon="search"
					label="Search"></v-text-field>
			</v-card-title>
		</v-card>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		data() {
			return {

			}
		},

		created() {
			axios.get('http://system.test/products/')
			.then((response) => {
				console.log(response);
			});
		},

		methods: {

		}
	}
</script>