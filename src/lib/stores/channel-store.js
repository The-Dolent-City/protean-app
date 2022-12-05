import { writable } from 'svelte/store';

export const channel = writable(null);
export const channelMessages = writable(null);
export const channelRolls = writable(null);
export const channelUsers = writable(null);

export const presence = writable(null);
