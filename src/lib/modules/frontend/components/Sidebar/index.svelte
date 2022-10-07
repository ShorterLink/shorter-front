<script lang="ts">
	import type { User } from '$lib/types';

	export let menus = [];
	export let user: User;
</script>

<aside class="sidebar">
	<div class="sidebar-start">
		<div class="sidebar-head">
			<a href="/" class="logo-wrapper" title="Home">
				<span class="sr-only">Home</span>
				<span class="icon logo" aria-hidden="true" />
				<div class="logo-text">
					<span class="logo-title">Shorter</span>
					<span class="logo-subtitle">Dashboard</span>
				</div>
			</a>
			<button class="sidebar-toggle transparent-btn" title="Menu" type="button">
				<span class="sr-only">Toggle menu</span>
				<span class="icon menu-toggle" aria-hidden="true" />
			</button>
		</div>
		<div class="sidebar-body">
			<ul class="sidebar-body-menu">
				<li>
					<a class="active" href="/"><span class="icon home" aria-hidden="true" />Dashboard</a>
				</li>
				<li>
					<a class="show-cat-btn" href="##">
						<span class="icon document" aria-hidden="true" />Links
						<span class="category__btn transparent-btn" title="Open list">
							<span class="sr-only">Open list</span>
							<span class="icon arrow-down" aria-hidden="true" />
						</span>
					</a>
					<ul class="cat-sub-menu">
						<li>
							<a href="posts.html">All Links</a>
						</li>
						<li>
							<a href="new-post.html">Reports</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="show-cat-btn" href="##">
						<span class="icon folder" aria-hidden="true" />Social Page
						<span class="category__btn transparent-btn" title="Open list">
							<span class="sr-only">Open list</span>
							<span class="icon arrow-down" aria-hidden="true" />
						</span>
					</a>
					<ul class="cat-sub-menu">
						<li>
							<a href="categories.html">List Social Pages</a>
						</li>

						<li>
							<a href="categories.html">New Social Pages</a>
						</li>
					</ul>
				</li>
			</ul>
			<span class="system-menu__title">system</span>
			<ul class="sidebar-body-menu">
				<li>
					<a href="appearance.html"><span class="icon edit" aria-hidden="true" />Release notes</a>
				</li>

				<li>
					<a href="appearance.html"><span class="icon github" aria-hidden="true" />Github</a>
				</li>

				<li>
					<a class="show-cat-btn" href="##">
						<span class="icon user-3" aria-hidden="true" />Community
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="sidebar-footer">
		<a href="##" class="sidebar-user">
			<span class="sidebar-user-img">
				<picture
					><source srcset="./img/avatar/avatar-illustrated-01.webp" type="image/webp" /><img
						src="./img/avatar/avatar-illustrated-01.png"
						alt="User name"
					/></picture
				>
			</span>
			<div class="sidebar-user-info">
				<span class="sidebar-user__title">{user?.name}</span>
				<span class="sidebar-user__subtitle">ShorterLink</span>
			</div>
		</a>
	</div>
</aside>
