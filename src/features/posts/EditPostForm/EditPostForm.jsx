import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditPostForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts, updatePost } from '../postsSlice';
import { usersSelector } from '../../users/usersSlice';
import { useState } from 'react';
import { FETCH_STATUS } from '../../../app/fetchConfig';

const EditPostForm = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const post = useSelector((state) => getPosts.postById(state, Number(postId)));
	const users = useSelector(usersSelector.users);

	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.body);
	const [userId, setUserId] = useState(post?.userId);
	const [requestStatus, setRequestStatus] = useState(FETCH_STATUS.idle);

	const dispatch = useDispatch();

	if (!post) {
		return (
			<div className={styles.editpostform}>
				Post does not exist.
			</div>
		)
	}

	const notFake = +postId < 100;
	const canSave = [title, content, userId].every(Boolean) && requestStatus === FETCH_STATUS.idle && notFake;

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onAuthorChanged = (e) => setUserId(e.target.value);

	const onSavePostClicked = () => {
		if (canSave && notFake) {
			try {
				setRequestStatus(FETCH_STATUS.pending);
				dispatch(updatePost(
					{ id: post.id, title, body: content, userId, reactions: post.reactions }
				)).unwrap()

				setTitle('');
				setContent('');
				setUserId('');
				navigate(`/post/${postId}`);
			}
			catch (error) {
				console.error('Failed to save post', error);
			}
			finally {
				setRequestStatus(FETCH_STATUS.idle);
			}
		}
	}

	const usersOptions = users.map(user => (
		<option key={user.id} value={user.id}>{user.name}</option>
	));

	const onDeletePostClicked = () => {
		try {
			setRequestStatus(FETCH_STATUS.pending);
			dispatch(deletePost({ id: post.id })).unwrap();

			setTitle('');
			setContent('');
			setUserId('');
			navigate('/');
		}
		catch (error) {
			console.error('Failed to delete the post', error);
		}
		finally {
			setRequestStatus(FETCH_STATUS.idle);
		}
	}

	return (
		<section>
			<h2>Edit Post</h2>
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

				{!notFake && <p className={styles.warning}>Sorry, this post does not exist on jsonplaceholder.typicode.com server, you can't update it.</p>}

				<button type='button' onClick={onSavePostClicked} disabled={!canSave} className={styles.button}>Save Post</button>
				<button type='button' onClick={onDeletePostClicked} className={styles.deleteButton}>Delete Post</button>
			</form>
		</section>
	)
};

export default EditPostForm;