<script lang="ts">
	import type { UserLogin } from '../../interfaces/userLogin';
	import { axiosLib } from '$lib/axiosLib';
	import Swal from 'sweetalert2';
	import logo from '../../assets/png/Klongyaa-removebg.png';

	let user: UserLogin = {
		emailOrUsername: '',
		password: ''
	};

	const handleSubmitForm = async (e: Event) => {
		e.preventDefault();
		try {
			const response = await axiosLib.post('/user/login', user);
			if (response.status !== 200) {
				throw response.data;
			}
			Swal.fire({
				icon: 'success',
				title: 'เข้าสู่ระบบสำเร็จ',
				text: 'เข้าสู่ระบบสำเร็จ',
				timer: 1000
			}).then(() => {
				window.location.reload();
			});
		} catch (error: any) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'เข้าสู่ระบบไม่สำเร็จ',
				text: `เข้าสู่ระบบไม่สำเร็จเนื่องจาก${error.response.data.message}`,
				timer: 1000
			});
		}
	};
</script>

<main class="w-screen h-screen bg-neutral-50 grid place-items-center">
	<div class=" w-4/5 h-4/5 grid grid-cols-2">
		<div class="bg-slate-400 flex flex-col items-center justify-center">
			<img src={logo} alt="login" class="w-3/5 h-3/5 object-cover" />
			<div class="text-center text-4xl font-bold">ยินดีต้อนรับเข้าสู่กล่องยา</div>
		</div>
		<div class="bg-blue-100 grid place-items-center">
			<form
				class="bg-blue-300 w-3/4 h-fit flex flex-col items-center pb-8 pt-20 text-left rounded-3xl"
				on:submit={handleSubmitForm}
			>
				<div class="text-4xl font-bold">เข้าสู่ระบบเพื่อใช้งาน</div>
				<div class="w-4/5">
					<div class="flex flex-col my-5 mt-10">
						<label for="emailOrUsername" class="text-2xl">ชื่อผู้ใช้ หรือ อีเมลล์</label>
						<input
							type="text"
							id="emailOrUsername"
							name="emailOrUsername"
							placeholder="username or email"
							bind:value={user.emailOrUsername}
							class="w-full px-3 py-2 border border-gray-300 rounded-md text-2xl"
						/>
					</div>
					<div class="flex flex-col my-5">
						<label for="password" class="text-2xl">รหัสผ่าน</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="password"
							bind:value={user.password}
							class="w-full px-3 py-2 border border-gray-300 rounded-md text-2xl"
						/>
					</div>
					<div class="flex justify-center">
						<button class="bg-blue-500 text-white text-2xl px-5 py-2 w-1/2 rounded-md"
							>เข้าสู่ระบบ</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>
