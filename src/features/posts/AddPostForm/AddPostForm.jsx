import styles from './AddPostForm.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from '../postsSlice';
import { selectAllUsers } from '../../users/usersSlice';

const AddPostForm = () => {
	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onAuthorChanged = (e) => setUserId(e.target.value);

	const onSavePostClicked = () => {
		if (canSave) {
			dispatch(postAdded(title, content, userId));
			setTitle('');
			setUserId('');
			setContent('');
		}
	}

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	return (
		<section className={styles.addpostform}>
			<h2>Add a New Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input type="text" id='postTitle' name='postTitle' value={title} onChange={onTitleChanged} />

				<label htmlFor="postAuthor">Post Author:</label>
				<select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>

				<label htmlFor="postContent">Post Content:</label>
				<textarea type="text" id='postContent' name='postContent' value={content} onChange={onContentChanged} />

				<button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
			</form>
		</section>
	)
};

export default AddPostForm;