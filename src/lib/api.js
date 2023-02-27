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
 * Retrieves all notes for a user from a channel.
 * @param {number} channel_id
 * @param {number} user_id
 */
export const getNotes = async (client, channel_id, user_id) => {
	try {
		let { data } = await client
			.from('notes')
			.select(`*`)
			.eq('channel_id', channel_id)
			.eq('user_id', user_id)
			.order('inserted_at', { ascending: false });
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Unable to retrieve notes.');
	}
};

/**
 * Insert a new note into the DB.
 * @param {string} note
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addNote = async (client, note, channel_id, user_id) => {
	try {
		let { data } = await client.from('notes').insert([{ channel_id, user_id, note }]).select();

		return data;
	} catch (error) {
		throw new Error('Failed to create note.');
	}
};

/**
 * Updates a note in the DB.
 * @param {string} note_id
 * @param {string} note
 * @param {number} channel_id
 * @param {number} user_id
 */
export const updateNote = async (client, note_id, note, channel_id, user_id) => {
	try {
		let { data } = await client
			.from('notes')
			.update({ channel_id, user_id, note })
			.eq('id', note_id);

		return data;
	} catch (error) {
		throw new Error('Failed to create note.');
	}
};

/**
 * Retrieves all rolls from a channel.
 * @param {number} channel_id
 */
export const getRolls = async (client, channel_id) => {
	try {
		let { data } = await client
			.from('rolls')
			.select(`*, author:user_id(*)`)
			.eq('channel_id', channel_id)
			.order('inserted_at', { ascending: false });
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Unable to retrieve rolls.');
	}
};

/**
 * Insert a new roll into the DB.
 * @param {array} roll The dice roll object
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addRoll = async (client, roll, channel_id, user_id) => {
	try {
		const notation = roll?.notation;
		const rolls = roll?.rolls?.length > 0 ? roll.rolls[0].rolls.map((r) => r.value) : null;
		const total = roll?.total;
		const result = roll?.output;

		let { data } = await client
			.from('rolls')
			.insert([
				{
					channel_id,
					user_id,
					blob: roll,
					notation,
					rolls,
					total,
					result
				}
			])
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
				nickname,
				color
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
