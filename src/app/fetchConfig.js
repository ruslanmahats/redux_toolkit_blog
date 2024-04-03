import axios from "axios";

export const FETCH_STATUS = {
	idle: 'idle',
	loading: 'loading',
	succeeded: 'succeeded',
	failed: 'failed',
	pending: 'pending'
};

export const fetchData = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/'
});