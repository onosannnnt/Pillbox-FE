<script lang="ts">
	import { fly } from 'svelte/transition';
	import imgUrl from '../../assets/png/background_dashboard.png';
	import closeIcon from '../../assets/svg/close-icon.png';
	let visibleLogin = true;
	let onLogin = false;
	let userData = {
		emailOrUsername: '',
		password: ''
	};

	const handleOnSubmit = (e: any) => {
		e.preventDefault();
		onLogin = true;
	};
</script>

<main class="w-screen h-screen static text-xl flex items-center">
	<img
		class="w-screen h-screen -z-10 absolute object-cover {!visibleLogin ? 'transition blur' : ''}"
		src={imgUrl}
		alt="Background"
	/>
	<div class="wrap| px-20 {!visibleLogin ? 'transition blur' : ''}">
		<h1 class="text-2xl">กล่องยายินดีต้อนรับ</h1>
		<h2 class="text-5xl font-bold">กรุณาเข้าสู่ระบบเพื่อใช้งาน</h2>
		<div class="wrap| flex justify-center">
			<button
				on:click={() => {
					visibleLogin = false;
				}}
				class="text-2xl font-bold bg-yellow-200 px-20 py-4 my-6 rounded-3xl hover:transform hover:scale-110 transition duration-500 ease-in-out"
				>เข้าสู่ระบบ</button
			>
		</div>
	</div>
	{#if visibleLogin}
		<div></div>
	{:else}
		<div class="bg-black">
			<div
				transition:fly={{ y: 200, duration: 1000 * 1 }}
				class="wrap| absolute w-1/4 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl opacity-95"
			>
				<div class="grid justify-items-end p-5 absolute right-0">
					<button
						on:click={() => {
							visibleLogin = true;
						}}
					>
						<img
							class="w-10 h-10 hover:scale-110 transition duration-500 ease-in-out cursor-pointer"
							src={closeIcon}
							alt="Close Icon"
						/></button
					>
				</div>
				<form class="grid place-items-center p-10">
					<h1 class="text-5xl p-10">เข้าสู่ระบบ</h1>
					<div class="grid">
						<label for="emailOrUsername">ชื่อผู้ใช้</label>
						<input
							class="w-full p-2 border border-neutral-300 rounded-xl"
							type="text"
							id="username"
							name="emailOrUsername"
							bind:value={userData.emailOrUsername}
						/>
					</div>
					<div class="grid">
						<label for="password">รหัสผ่าน</label>
						<input
							class="w-full p-2 border border-neutral-300 rounded-xl"
							type="password"
							id="password"
							name="password"
							bind:value={userData.password}
						/>
					</div>
					{#if !onLogin}
						<button
							type="submit"
							class="text-2xl bg-neutral-300 w-52 h-12 my-6 rounded"
							on:click={handleOnSubmit}>เข้าสู่ระบบ</button
						>
					{:else}
						<button type="submit" class="text-2xl bg-neutral-300 w-52 h-12 my-6 rounded" disabled
							>กำลังเข้าสู่ระบบ...</button
						>
					{/if}
				</form>
			</div>
		</div>
	{/if}
</main>
