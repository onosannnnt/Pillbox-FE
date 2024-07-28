<script lang="ts">
	import type { Cookies } from '@sveltejs/kit';
	import Login from './components/login.svelte';
	export let data: { isLogin: Cookies };
</script>

{#if data.isLogin === undefined}
	<Login></Login>
{:else}
	<div>{data.isLogin}</div>
{/if}
