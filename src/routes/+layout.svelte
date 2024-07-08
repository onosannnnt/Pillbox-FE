<script lang="ts">
	import '../app.css';
	import type { Cookies } from '@sveltejs/kit';

	export let data: { isLogin: Cookies };
</script>

{#if data.isLogin !== undefined}
	<div>Navbar</div>
	<div>Sidebar</div>
{/if}

<slot />

{#if data.isLogin !== undefined}
	<div>Footer</div>
{/if}
