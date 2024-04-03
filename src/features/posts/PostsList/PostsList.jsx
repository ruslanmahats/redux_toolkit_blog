import { useSelector } from 'react-redux';
import styles from './PostsList.module.scss';
import { getPosts } from '../postsSlice';

import PostsExcerpt from '../PostsExcerpt/PostsExcerpt';

const PostsList = () => {

	const posts = useSelector(getPosts.posts);
	const error = useSelector(getPosts.error);
	const status = useSelector(getPosts.status);

	let content;
	if (status === 'loading') {
		content = <p>Loading...</p>;
	} else if (status === 'succeeded') {
		const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((post, index) => (
			<PostsExcerpt key={post.id} post={post}
				imageUrl={`https://picsum.photos/id/${post.id + 10}/300/150`} />
		));

	} else if (status === 'failed') {
		content = <p>{error}</p>;
	}

	return (
		<section className={styles.postslist}>
			{content}
		</section>
	);
};

export default PostsList;