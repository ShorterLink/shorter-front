<script lang="ts">
	import './custom.css';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	type FormState = 'login' | 'register';

	let formState: FormState = 'login';
	let formLoading = false;
	let formErrorMessage = '';

	const toggleLoginForm = () => {
		formState = 'login';
	};

	const toggleRegisterForm = () => {
		formState = 'register';
	};

	const handleSubimitForm = () => {
		formLoading = true;
		formErrorMessage = '';

		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'invalid') {
				formErrorMessage = result?.data?.message;
			}

			if (result.type === 'redirect') {
				goto(result.location);
			}
			formLoading = false;
		};
	};
</script>

<div class="wrapper fadeInDown">
	<div id="formContent">
		<!-- Tabs Titles -->
		<h2
			class={formState === `login` ? 'active' : 'inactive underlineHover'}
			on:click={toggleLoginForm}
		>
			Sign In
		</h2>
		<h2
			class={formState === `register` ? 'active' : 'inactive underlineHover'}
			on:click={toggleRegisterForm}
		>
			Sign Up
		</h2>

		<!-- Icon -->
		<div class="fadeIn first">
			<img src="img/avatar/avatar-illustrated-02.png" id="icon" alt="User Icon" />
		</div>

		<!-- Login Form -->
		{#if formState === 'login'}
			<form method="POST" action="?/login" use:enhance={handleSubimitForm}>
				<input type="text" id="email" name="email" placeholder="E-mail" required />
				<input type="password" id="password" name="password" placeholder="Password" required />
				{#if formErrorMessage}
					<br />
					<br />
					<p>{formErrorMessage}</p>
					<br />
				{/if}

				<input
					type="submit"
					class={formLoading ? 'pulse' : ''}
					value="Log In"
					disabled={formLoading}
				/>
			</form>

			<!-- Remind Passowrd -->
			<div id="formFooter">
				<a class="underlineHover" href="/forgot-password">Forgot Password?</a>
			</div>
		{/if}

		<!-- Register Form -->
		{#if formState === 'register'}
			<form method="POST" action="?/register" use:enhance>
				<input type="text" id="name" name="name" placeholder="Name" />
				<input type="email" id="email" name="email" placeholder="E-mail" />
				<input type="password" id="password" name="password" placeholder="Password" />

				{#if formErrorMessage}
					<br />
					<br />
					<p>{formErrorMessage}</p>
					<br />
				{/if}

				<input
					type="submit"
					class={formLoading ? 'pulse' : ''}
					value="Register"
					disabled={formLoading}
				/>
			</form>
		{/if}
	</div>
</div>
