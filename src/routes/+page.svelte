<script lang="ts">
	import LandingPage from './components/landingPage.svelte';
	export let data: { token: any };
</script>

{#if !data.token}
	<LandingPage />
{:else}
	<main>Hello</main>
{/if}
