import { createSlice } from "@reduxjs/toolkit"

const initialState = [
	{ id: '0', name: 'Patrick Star' },
	{ id: '1', name: 'Chack Norris' },
	{ id: '2', name: 'Sylvester Stalone' },
	{ id: '3', name: 'Sponge Bob' }
]

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		action: (state) => {

		},
	},
});

export const selectAllUsers = (state) => state.users;

export const { action } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;