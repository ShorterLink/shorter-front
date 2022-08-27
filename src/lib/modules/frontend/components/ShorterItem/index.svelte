<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let url: string;
	export let createdAt: string;
	export let shorterUrl: string;
	export let ID: string;
	export let clicksCount: number;

	const dispatch = createEventDispatcher();

	const onEdit = () => dispatch('onEdit', ID);
	const onDelete = () => dispatch('onDelete', ID);
	const onDisable = () => dispatch('onDisable', ID);
	const onViewClick = () => dispatch('onViewClick', ID);
</script>

<div class="col-12 stat-cards-item mt-4">
	<div class="col-12">
		<p>{url}</p>
		<small>{createdAt}</small>
	</div>

	<div class="col-12">
		<hr />
	</div>

	<div class="col-10">
		<a href={shorterUrl}>{shorterUrl}</a>
	</div>

	<div class="col-2">
		<button class="btn secondary-default-btn" on:click={onViewClick}>Cliques: {clicksCount}</button>
	</div>

	<div class="col-12 mt-4">
		<button on:click={onEdit}>Editar</button>
		<button on:click={onDisable}>Desativar</button>
		<button on:click={onDelete}>Deletar</button>
	</div>
</div>
