<script lang="ts">
	import type { Cookies } from '@sveltejs/kit';
	export let data: { isLogin: Cookies };
</script>

{#if data.isLogin === undefined}
	<div>not login</div>
{:else}
	<div>Login</div>
{/if}
