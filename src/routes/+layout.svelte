<script>
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	import Sidebar from '$lib/modules/frontend/components/Sidebar/index.svelte';
	import Navbar from '$lib/modules/frontend/components/Navbar/index.svelte';
	import Footer from '$lib/modules/frontend/components/Footer/index.svelte';
	import Header from '$lib/modules/frontend/components/Header/index.svelte';

	onMount(async () => {
		if (browser) {
			feather.replace();
		}
	});
</script>

<Header />

<div class="layer" />

<a class="skip-link sr-only" href="#skip-target">Skip to content</a>
<div class="page-flex">
	<Sidebar />
	<div class="main-wrapper">
		<Navbar />
		<!-- ! Main -->
		<main class="main users chart-page" id="skip-target">
			<div class="container">
				<slot />
			</div>
		</main>
		<Footer />
	</div>
</div>
