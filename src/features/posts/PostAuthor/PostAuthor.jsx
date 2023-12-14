import { useSelector } from 'react-redux';
import styles from './PostAuthor.module.scss';
import { selectAllUsers } from '../../users/usersSlice';

const PostAuthor = ({ userId }) => {
	const users = useSelector(selectAllUsers);

	const author = users.find((user) => user.id === userId);

	return (
		<span className={styles.postauthor}>by {author ? author.name : 'Unknown author'}</span>
	);
};

export default PostAuthor;