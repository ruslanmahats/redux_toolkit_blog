import { useSelector } from 'react-redux';
import { usersSelector } from '../../users/usersSlice';

const PostAuthor = ({ userId }) => {
	const users = useSelector(usersSelector.users);

	const author = users.find((user) => user.id === userId);

	return (
		<span> by {author ? author.name : 'Unknown author'}</span>
	);
};

export default PostAuthor;