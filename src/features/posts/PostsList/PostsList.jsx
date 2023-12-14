import { useSelector } from 'react-redux';
import styles from './PostsList.module.scss';
import { selectAllPosts } from '../postsSlice';
import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo/TimeAgo';
import ReactionButtons from '../ReactionButtons/ReactionButtons';

const PostsList = () => {
	const posts = useSelector(selectAllPosts);

	const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

	const renderedPosts = orderedPosts.map(post => {
		return (
			<article key={post.id}>
				<h3>{post.title}</h3>
				<p>{post.content.substring(0, 100)}</p>
				<p className='postcredit'>
					<PostAuthor userId={post.userId} />
					<TimeAgo timestamp={post.date} />
				</p>
				<ReactionButtons post={post} />
			</article>
		)
	});

	return (
		<section className={styles.postslist}>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	);
};

export default PostsList;