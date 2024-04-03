import styles from './AddPostForm.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../postsSlice';
import { usersSelector } from '../../users/usersSlice';
import { FETCH_STATUS } from '../../../app/fetchConfig';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
	const dispatch = useDispatch();
	const users = useSelector(usersSelector.users);
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState(FETCH_STATUS.idle);
	const [requestError, setRequestError] = useState(null);

	const canSave = [title, content, userId].every(Boolean) && addRequestStatus === FETCH_STATUS.idle;

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onAuthorChanged = (e) => setUserId(e.target.value);

	const onSavePostClicked = async () => {
		if (canSave) {
			try {
				setRequestError(null)
				setAddRequestStatus(FETCH_STATUS.pending);
				await dispatch(addNewPost({ title, content, userId })).unwrap();
				setTitle('');
				setUserId('');
				setContent('');
				navigate('/');
			}
			catch (err) {
				setRequestError(err.message)
			}
			finally {
				setAddRequestStatus(FETCH_STATUS.idle);
			}
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

				<button type='button' onClick={onSavePostClicked} disabled={!canSave} className={styles.button}>Save Post</button>
				{<p className={styles.error}>{requestError}</p>}
			</form>
		</section>
	)
};

export default AddPostForm;