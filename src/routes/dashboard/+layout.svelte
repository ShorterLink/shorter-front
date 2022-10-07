<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import Sidebar from '$lib/modules/frontend/components/Sidebar/index.svelte';
	import Navbar from '$lib/modules/frontend/components/Navbar/index.svelte';
	import Footer from '$lib/modules/frontend/components/Footer/index.svelte';
	import Header from '$lib/modules/frontend/components/Header/index.svelte';
	import type { User } from '$lib/types';

	type Data = {
		user: User;
	};

	export let data: Data;

	onMount(async () => {
		if (browser) {
			//@ts-ignore
			feather.replace();
			//@ts-ignore
			init();
		}
	});
</script>

<Header />

<div class="layer" />

<a class="skip-link sr-only" href="#skip-target">Skip to content</a>
<div class="page-flex">
	<Sidebar user={data?.user} />
	<div class="main-wrapper">
		<Navbar />
		<!-- ! Main -->
		<main class="main users chart-page container-fluid" id="skip-target">
			<div class="container">
				<slot />
			</div>
		</main>
		<Footer />
	</div>
</div>
