<script lang="ts">
	import '../app.css';
	import type { Cookies } from '@sveltejs/kit';
	import { axiosLib } from '$lib/axiosLib.js';

	export let data: { isLogin: Cookies };

	const onLogout = async () => {
		try {
			await axiosLib
				.post(`/user/logout`)
				.then(() => {
					window.location.reload();
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
		}
	};
</script>

{#if data.isLogin !== undefined}
	<button on:click={onLogout}>Logout</button>
	<div>Sidebar</div>
{/if}

<slot />

{#if data.isLogin !== undefined}
	<div>Footer</div>
{/if}
