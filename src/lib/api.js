/**
 * Get a single channel by id.
 * @param {number} channel_id
 */
export const getChannel = async (client, channel_id) => {
	try {
		let { data } = await client.from('channels').select(`*`).eq('id', channel_id).limit(1).single();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to retrieve channel.');
	}
};

/**
 * Gets all channels.
 */
export const getChannels = async (client) => {
	try {
		let { data } = await client.from('channels').select(`*`);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to retrieve channels.');
	}
};

/**
 * Retrieves all messages from a channel.
 * @param {number} channel_id
 */
export const getMessages = async (client, channel_id) => {
	try {
		let { data } = await client
			.from('messages')
			.select(`*, author:user_id(*)`)
			.eq('channel_id', channel_id)
			.order('inserted_at', { ascending: false });
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Unable to retrieve messages.');
	}
};

/**
 * Insert a new message into the DB.
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (client, message, channel_id, user_id) => {
	try {
		let { data } = await client
			.from('messages')
			.insert([{ message, channel_id, user_id }])
			.select();
		return data;
	} catch (error) {
		throw new Error('Failed to send message.');
	}
};

/**
 * Get a single user by id.
 * @param {number} user_id
 */
export const getUser = async (client, user_id) => {
	try {
		let { data } = await client.from('users').select(`*`).eq('id', user_id).limit(1).single();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to retrieve user.');
	}
};

/**
 * Updates a single user by id.
 * @param {number} user_id
 * @param {string} nickname
 */
export const updateUser = async (client, user_id, nickname, color) => {
	try {
		const { error } = await client
			.from('users')
			.update({
				nickname: nickname,
				color: color
			})
			.eq('id', user_id);

		if (error) throw error;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to update user.');
	}
};

/**
 * Get all roles for the current user
 */
export const getUserRoles = async (client) => {
	try {
		let { data } = await client.from('user_roles').select(`*`);
		return data;
	} catch (error) {
		throw new Error('Failed to retrieve user roles.');
	}
};
