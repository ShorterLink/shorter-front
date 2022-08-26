<script>
	export let color = 'primary';
	export let number = 123;
	export let title = 'Total Visits';
	export let percent = 3;
	export let percentColor = 'success';
	export let percentTrending = 'up';
</script>

<div class="col-md-6 col-xl-3">
	<article class="stat-cards-item">
		<div class="stat-cards-icon {color}">
			<i data-feather="bar-chart-2" aria-hidden="true" />
		</div>
		<div class="stat-cards-info">
			<p class="stat-cards-info__num">{number}</p>
			<p class="stat-cards-info__title">{title}</p>
			<p class="stat-cards-info__progress">
				<span class="stat-cards-info__profit {percentColor}">
					<i data-feather="trending-{percentTrending}" aria-hidden="true" />{percent}%
				</span>
				Last month
			</p>
		</div>
	</article>
</div>
