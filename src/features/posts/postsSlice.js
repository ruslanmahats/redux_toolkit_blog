import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { FETCH_STATUS, fetchData } from "../../app/fetchConfig";

const url = 'posts';

const initialState = {
	posts: [],
	status: FETCH_STATUS.idle,
	error: null
};

export const fetchPosts = createAsyncThunk('posts/fethcPosts', async () => {
	const response = await fetchData.get(url);
	return response.data;
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
	const response = await fetchData.post(url, newPost);
	return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
	const { id } = initialPost;
	const response = await fetchData.put(`${url}/${id}`, initialPost);
	return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
	const { id } = initialPost;
	const response = await fetchData.delete(`${url}/${id}`, initialPost);
	if (response?.status === 200) return initialPost;
	return `${response?.status}: ${response?.statusText}`;
});

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						body: content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0
						}
					}
				}
			}
		},
		reactionAdded: (state, action) => {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find(post => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = FETCH_STATUS.loading;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = FETCH_STATUS.succeeded;

				// Adding a date and reactions
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0
					};
					return post;
				});

				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = FETCH_STATUS.failed;
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.status = FETCH_STATUS.succeeded;
				state.error = null;
				const newPost = {
					...action.payload,
					userId: +action.payload.userId,
					body: action.payload.content,
					date: new Date().toISOString(),
					reactions: {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0
					}
				};

				state.posts.push(newPost);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload) {
					console.log('Update could not complete');
					console.log(action.payload);
					return;
				}

				const { id } = action.payload;
				action.payload.userId = +action.payload.userId;
				action.payload.date = new Date().toISOString();
				const posts = state.posts.filter(post => post.id !== id);
				state.posts = [...posts, action.payload];
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log('Delete could not complete');
					console.log(action.payload);
					return;
				}

				const { id } = action.payload;
				const posts = state.posts.filter(post => post.id !== id);
				state.posts = posts;
			})
	}
});

export const getPosts = {
	posts: (state) => state.posts.posts,
	status: (state) => state.posts.status,
	error: (state) => state.posts.error,
	postById: (state, postId) => state.posts.posts.find(post => post.id === postId)
};

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;