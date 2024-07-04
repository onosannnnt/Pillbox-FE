<script lang="ts">
	import type { Cookies } from '@sveltejs/kit';
	import LandingPage from './components/landingPage.svelte';
	export let data: { isLogin: Cookies };
	$: {
		console.log(data.isLogin);
	}
</script>

{#if data.isLogin === undefined}
	<LandingPage />
{:else}
	<div>Token: {data.isLogin}</div>
{/if}
