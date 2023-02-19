import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, editCommentThunk } from "../../../store/comments";
// import profPic from "../../../assets/profPic.jpeg";
import "./CreateComment.css";

const CreateComment = ({ currentComment, setEditing }) => {
    const dispatch = useDispatch();

    const [body, setBody] = useState(currentComment?.body || '')
    const [errors, setErrors] = useState([]);
    const currentUser = useSelector(state => state.session.user);
    const song = useSelector(state => state.Songs.singleSong);
    const songId = song.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const errors = [];
        if (body.length > 255) errors.push("Please try again, Comment is too long")

        if (errors.length > 0) {
            setErrors(errors);
            return
        }

        const newComment = {
            body
        };

        if (body.length) {
            // console.log("what is the comment", body)
            if (currentComment) {
                // dispatch update thunk
                currentComment.body = body;
                dispatch(editCommentThunk(currentComment))
                setEditing(false)
                // console.log("we dispatched the comment")

            } else {
                dispatch(createCommentThunk(songId, newComment))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(Object.values(data.errors))
                    });
                // console.log("we dispatched the comment")
            }
            setBody("")
        }

    }

    let defaultCommentPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    return (
        <div className="create-comment-container">
            {!currentComment && <div className="create-comment-user-container">
                <img
                    className="create-comment-user-image"
                    src={
                        currentUser.profile_image_url
                            ? currentUser.profile_image_url
                            : defaultCommentPic
                    }
                    alt={currentUser.display_name}
                />
                {/* <img className="create-comment-user-image" src={currentUser.profile_image_url} alt={currentUser.display_name} /> */}
            </div>}
            <div className="comment-form-outer-container">
            <form className="comment-form" onSubmit={handleSubmit} type='submit'>
                <input
                    className="create-comment-input-field"
                    placeholder="Write a comment"
                    type="text"
                    maxlength="100"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <input type="submit" style={{ position:"absolute", display: 'none' }} />
                </form>
            </div>
        </div>
    )
}

export default CreateComment;
