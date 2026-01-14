<template>
	<div class="content">

			<form>

				<div class="loader">
	
				</div>
			</form>
	</div>
	</template>
	<script setup>
	import "/src/assets/css/style.css"
	import { onMounted, ref } from "vue";
	import toastr from "toastr";
	import router from "@/router";
	import 'toastr/build/toastr.min.css'
	import { useHead } from "@vueuse/head";
	import { auth } from "@/assets/js/app";
	const username = ref("")
	const password = ref("")
	const authed = ref(null)
	import { api } from "@/assets/js/app";
	onMounted(() => {
		useHead({
			title: "Вихід | Lazni Kyiv"
		})
		api.logout().then(() => {sessionStorage.clear()
			window.location.href = "/"
		}).catch(e => {
			window.location.href = "/"
		})
	})
	
	</script>
	<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--bg);
		padding: 1rem;
		box-sizing: border-box;
	}
	form {
		width: 100%;
		max-width: 15rem;
	}
	.modal-box {
		z-index: 1000000;
		max-width: 14rem;
	}
	.modal-action {
		margin-top: 0.5rem;
		width: 100%;
	}
	
	
	button {
		margin: auto;
		width: 100%;
	}
	h3 {
		text-align: center;
		margin-bottom: 0.5rem;
		font-weight: 600;
		opacity: 0.5;
	}
	
	h2 {
		margin: 0px;
		width: 100%;
		text-align: center;
		font-family: "Lazni";
	
	}
	
	input[type="mail"] {
		margin-bottom: 0.5rem;
	}
	
	label {
		opacity: 0.6 !important;
		display: block;
		margin-bottom: 0.25rem !important;
	}
	
	button.auth-button {
		padding-top: 0.5rem !important;
		padding-bottom: 0.5rem !important;
	}
	/* HTML: <div class="loader"></div> */
	.loader {
		justify-self: center;
		margin-top: 2rem;
	  width: 50px;
	  aspect-ratio: 1;
	  display: grid;
	  border: 4px solid #0000;
	  border-radius: 50%;
	  border-right-color: var(--primary);
	  animation: l15 1s infinite linear;
	}
	.loader::before,
	.loader::after {    
	  content: "";
	  grid-area: 1/1;
	  margin: 2px;
	  border: inherit;
	  border-radius: 50%;
	  animation: l15 2s infinite;
	}
	.loader::after {
	  margin: 8px;
	  animation-duration: 3s;
	}
	@keyframes l15{ 
	  100%{transform: rotate(1turn)}
	}
	</style>