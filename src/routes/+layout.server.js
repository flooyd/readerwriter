export const load = async ({ locals }) => {
	return {
		username: locals.user?.username || null,
		auth: locals.user?.auth || null
	};
};
