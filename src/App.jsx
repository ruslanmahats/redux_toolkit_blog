import { Route, Routes } from "react-router-dom";
import AddPostForm from "./features/posts/AddPostForm/AddPostForm";
import PostsList from "./features/posts/PostsList/PostsList";
import Layout from "./components/Layout/Layout";
import SinglePostPage from "./features/posts/SinglePostPage/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm/EditPostForm";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>

				<Route index element={<PostsList />} />

				<Route path="post">
					<Route index element={<AddPostForm />} />
					<Route path=":postId" element={<SinglePostPage />} />
					<Route path="edit/:postId" element={<EditPostForm />} />
				</Route>

			</Route>
		</Routes>
	);
}

export default App;
