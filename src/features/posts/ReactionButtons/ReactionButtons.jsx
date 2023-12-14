import { useDispatch } from 'react-redux';
import styles from './ReactionButtons.module.scss';
import { reactionAdded } from '../postsSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	wow: '😮',
	heart: '❤️',
	rocket: '🚀',
	coffee: '☕'
}

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
		<button
			key={name}
			type='button'
			className='reactionbutton'
			onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>{emoji} {post.reactions[name]}</button>
	));

	return (
		<div className={styles.reactionbuttons}>
			{reactionButtons}
		</div>
	);
};

export default ReactionButtons;