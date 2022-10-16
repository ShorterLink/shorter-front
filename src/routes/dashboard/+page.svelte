<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import InfoCard from '$lib/modules/frontend/components/InfoCard/index.svelte';
	import ShorterItem from '$lib/modules/frontend/components/ShorterItem/index.svelte';
	import Input from '$lib/modules/frontend/components/Input/index.svelte';
	import type { APIResponse, Links } from '$lib/types';

	export let data: APIResponse<Links>;
	export let pageTitle = 'Dashboard';

	let invalidField = {
		url: {
			invalid: false,
			message: ''
		},
		name: {
			invalid: false,
			message: ''
		},
		hash: {
			invalid: false,
			message: ''
		}
	};

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
		} catch (err) {
			invalidField.url.invalid = true;
			invalidField.url.message = 'Invalid URL, type a valid link.';
			return;
		}

		try {
			const response = await fetch('/links', {
				method: 'POST',
				body: JSON.stringify(data)
			});

			if (response.status === 200) {
				invalidateAll();
				event.target.reset();
				event.target[0].focus();
			} else {
				if (response.status === 400) {
					const data = await response.json();
					const { message } = data;

					invalidField.url.invalid = false;
					invalidField.name.invalid = false;
					invalidField.hash.invalid = false;

					if (message.hash) {
						invalidField.hash.invalid = true;
						invalidField.hash.message = message.hash;
					} else if (message.name) {
						invalidField.name.invalid = true;
						invalidField.name.message = message.name;
					} else if (message.url) {
						invalidField.url.invalid = true;
						invalidField.url.message = message.url;
					}
				}
			}
		} catch (_) {
			alert('Error on create link, try again later');
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

	<form on:submit={addNewLink} class={'container gx-5 card'}>
		<div class="row d-flex align-items-center">
			<div class="col-10">
				<div class="form-label-wrapper">
					<p class="form-label">URL:</p>
					<Input
						name="url"
						placeholder="Enter a URL"
						required
						invalid={invalidField.url.invalid}
						invalidMessage={invalidField.url.message}
					/>
				</div>
			</div>
			<div class="col mt-3">
				<button class="primary-default-btn mt-3">Shorter</button>
			</div>
		</div>

		<div class="row">
			<div class="col-10 d-flex justify-content-center mt-3">
				<button class="small form-input" type="button" on:click={toggleMoreOptions}>
					{expandMoreOptions ? '-' : '+'}
				</button>
			</div>
		</div>

		<div class={`${expandMoreOptions ? 'more-options' : 'hide-options'}`}>
			<div class="row">
				<div class="col-5">
					<div class="form-label-wrapper">
						<p class="form-label">Name:</p>
						<Input
							name="name"
							placeholder="Enter a name"
							invalid={invalidField.name.invalid}
							invalidMessage={invalidField.name.message}
						/>
					</div>
				</div>
				<div class="col-5">
					<div class="form-label-wrapper">
						<p class="form-label">Custom hash:</p>
						<Input
							name="hash"
							placeholder="Enter a custom hash"
							invalid={invalidField.hash.invalid}
							invalidMessage={invalidField.hash.message}
						/>
					</div>
				</div>
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
