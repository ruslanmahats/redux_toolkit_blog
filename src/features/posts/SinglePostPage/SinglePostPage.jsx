import { useSelector } from 'react-redux';
import PostAuthor from '../PostAuthor/PostAuthor';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import TimeAgo from '../TimeAgo/TimeAgo';
import { getPosts } from '../postsSlice';
import { Link, useParams } from 'react-router-dom';
import styles from './SinglePostPage.module.scss';

const SinglePostPage = () => {
	const { postId } = useParams();

	const post = useSelector((state) => getPosts.postById(state, Number(postId)));

	if (!post) {
		return <section>
			<h2>Post not found!</h2>
		</section>
	}

	return (
		<article>
			<img alt={post.title} className={styles.image} src={`https://picsum.photos/id/${+postId + 10}/300/150`}></img>
			<h1 className={styles.title}>{post.title}</h1>
			<p>{post.body}</p>
			<p className='postcredit'>
				<Link to={`/post/edit/${post.id}`}>Edit Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};

export default SinglePostPage;