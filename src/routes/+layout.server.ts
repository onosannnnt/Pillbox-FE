import type { Cookies } from "@sveltejs/kit";

export const load = ({ cookies }: { cookies: Cookies }) => {
	const isLogin = cookies.get('token');
	return { isLogin };
};
