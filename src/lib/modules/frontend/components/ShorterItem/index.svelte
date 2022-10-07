<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { formatDistance, parseISO } from 'date-fns';
	import './style.css';

	export let url: string;
	export let inserted_at: string;
	export let updated_at: string;
	export let enabled: boolean;
	export let hash_url: string;
	export let id: string;
	export let clicks: number;
	export let name: string;

	const dispatch = createEventDispatcher();

	const onEdit = () => dispatch('onEdit', id);
	const onDelete = () => dispatch('onDelete', id);
	const onDisable = () => dispatch('onDisable', id);
	const onViewClick = () => dispatch('onViewClick', id);

	function formatDate() {
		return formatDistance(parseISO(inserted_at), new Date(), { addSuffix: true });
	}
</script>

<div class="col-12 stat-cards-item mt-4">
	<span class="action-buttons">
		<button class="dropdown-btn transparent-btn" type="button" title="More info">
		  <div class="sr-only">More info</div>
		  <i data-feather="more-horizontal" aria-hidden="true"></i>
		</button>
		<ul class="users-item-dropdown dropdown">
		  <li><a href="##" on:click={onEdit}>Edit</a></li>
		  <li><a href="##" on:click={onDisable}>Disable</a></li>
		  <li><a href="##" on:click={onDelete}>Delete</a></li>
		
		</ul>
	  </span>
	<div class="col-12 mb-2">
		<h3>{name}</h3>
		<small>{formatDate()}</small>
	</div>

	<div class="col-5">
		<small class="label">Shorted:</small>
		<div class="row">
			<a class="link" href={hash_url}>{hash_url}</a>
		</div>
	</div>

	<div class="col-5">
		<div class="row">
			<small class="label">Original:</small>
		</div>
		<a class="link" href={url}>{url}</a>
	</div>

	<div class="col-2 click-container">
		<button class="btn secondary-default-btn" on:click={onViewClick}>Clicks: {clicks}</button>
	</div>

	
</div>
