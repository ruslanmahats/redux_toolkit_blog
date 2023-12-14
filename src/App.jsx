import AddPostForm from "./features/posts/AddPostForm/AddPostForm";
import PostsList from "./features/posts/PostsList/PostsList";

function App() {
	return (
		<main className="App">
			<h1>RTK Blog</h1>
			<AddPostForm />
			<PostsList />
		</main>
	);
}

export default App;
