<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	import InfoCard from '$lib/modules/frontend/components/InfoCard/index.svelte';
	import ShorterItem from '$lib/modules/frontend/components/ShorterItem/index.svelte';
	import type { APIResponse, Links } from '$lib/types';

	export let data: APIResponse<Links>;
	export let pageTitle = 'Dashboard';

	let expandMoreOptions = false;

	async function addNewLink(event: any) {
		event.preventDefault();
		const url = event.target[0].value;
		const formData = new FormData(event.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		try {
			new URL(url);

			const response = await fetch('/links', {
				method: 'POST',
				body: JSON.stringify(data)
			});

			if (response.status === 200) {
				invalidateAll();
			} else {
				if (response.status === 400) {
					console.log(response.status);
					const data = await response.json();
					alert(data.message);
				}
			}
		} catch (_) {
			alert('Erro ao adicionar link, verifique a URL');
		} finally {
			event.target[0].value = '';
			event.target[0].focus();
		}
	}

	function toggleMoreOptions() {
		expandMoreOptions = !expandMoreOptions;
	}
</script>

<h2 class="main-title">{pageTitle}</h2>
<div class="row stat-cards">
	<InfoCard />
	<InfoCard color="warning" />
	<InfoCard />
	<InfoCard />

	<div class="mt-4 mb-4">
		<h4>Add new shorted link:</h4>
	</div>

	<form
		on:submit={addNewLink}
		class={`container gx-5 card ${expandMoreOptions ? 'more-options' : 'hide-options'}`}
	>
		<div class="row d-flex align-items-center">
			<div class="col-10">
				<label class="form-label-wrapper">
					<p class="form-label">URL:</p>
					<input name="url" class="form-input" type="text" placeholder="Enter a URL" required />
				</label>
			</div>
			<div class="col">
				<button class="primary-default-btn mt-3">Shorter</button>
			</div>
		</div>

		<div class="row">
			<div class="col-10 d-flex justify-content-center">
				<button class="small form-input" type="button" on:click={toggleMoreOptions}>+</button>
			</div>
		</div>

		<div class="row">
			<div class="col-5">
				<label class="form-label-wrapper">
					<p class="form-label">Name:</p>
					<input name="name" class="form-input" type="text" placeholder="Enter a name" />
				</label>
			</div>
			<div class="col-5">
				<label class="form-label-wrapper">
					<p class="form-label">Custom hash:</p>
					<input name="hash" class="form-input" type="text" placeholder="Enter a custom hash" />
				</label>
			</div>
		</div>
	</form>

	<div class="mt-4">
		<h4>Shorted Links:</h4>
	</div>

	{#each data?.data as link}
		<ShorterItem {...link} />
	{/each}
</div>
