// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load = ({ cookies }: { cookies: any }) => {
	const isLogin = cookies.get('token');
	return {isLogin}
};
