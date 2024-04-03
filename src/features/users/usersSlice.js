import { FETCH_STATUS, fetchData } from "../../app/fetchConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'users';

const initialState = {
	users: [],
	status: FETCH_STATUS.idle,
	error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetchData.get(url);
	return response.data;
});

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		action: (state) => {

		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = FETCH_STATUS.loading;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = FETCH_STATUS.succeeded;
				state.error = null;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = FETCH_STATUS.failed;
				state.error = action.error.message;
			})
	}

});

export const usersSelector = {
	users: (state) => state.users.users,
	status: (state) => state.users.status,
	error: (state) => state.users.error
};

export const { action } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;