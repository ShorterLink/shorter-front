<script lang="ts">
	import InfoCard from '$lib/modules/frontend/components/InfoCard/index.svelte';
	import ShorterItem from '$lib/modules/frontend/components/ShorterItem/index.svelte';

	export let data;
	export let pageTitle = 'Dashboard';

	let shortedLinks = [
		{
			id: '12asd',
			url: 'www.google.com',
			shorterUrl: 'shoter.com/asd12',
			clicksCount: 33,
			createdAt: '2 dias atras'
		},
		{
			id: 'sdwe',
			url: 'www.facebook.com',
			shorterUrl: 'shoter.com/asd12',
			clicksCount: 13,
			createdAt: '2 dias atras'
		},
		{
			id: '12asd',
			url: 'www.instagram.com',
			shorterUrl: 'shoter.com/asd12',
			clicksCount: 3,
			createdAt: '2 dias atras'
		}
	];

	function addNewLink(event: any) {
		event.preventDefault();
		const url = event.target[0].value;
		try {
			new URL(url);
			shortedLinks.push({
				id: '12aaa',
				url: url,
				clicksCount: 0,
				createdAt: new Date().toDateString(),
				shorterUrl: 'shorter.com/adv'
			});
			shortedLinks = shortedLinks;
		} catch (_) {
			alert('Erro ao adicionar link, verifique a URL');
		} finally {
			event.target[0].value = '';
			event.target[0].focus();
		}
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

	<form on:submit={addNewLink} class="col-12 stat-cards-item">
		<div class="col-10">
			<label class="form-label-wrapper">
				<p class="form-label">URL:</p>
				<input class="form-input" type="text" placeholder="Enter a URL" required />
			</label>
		</div>
		<div class="col-2 pt-1">
			<button class="primary-default-btn mt-3">Shorter</button>
		</div>
	</form>

	<div class="mt-4">
		<h4>Shorted Links:</h4>
	</div>

	{#each shortedLinks as link}
		<ShorterItem ID={link.id} {...link} />
	{/each}
</div>
