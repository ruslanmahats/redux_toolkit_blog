import styles from './PostsExcerpt.module.scss';
import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo/TimeAgo';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post, imageUrl }) => {
	return (
		<article className={styles.excerpt}>
			<img alt={post.title} className={styles.image} src={imageUrl}></img>
			<h3 className={styles.title}>{post.title}</h3>
			<p className="excerpt">{post.body.substring(0, 75)}...</p>
			<p className={styles.postCredit}>
				<Link to={`post/${post.id}`}>View Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};

export default PostsExcerpt;