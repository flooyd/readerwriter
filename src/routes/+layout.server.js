export const load = async ({ locals }) => {
	console.log(locals);
	return {
		username: locals.user?.username || null,
		auth: locals.user?.auth || null
	};
};
