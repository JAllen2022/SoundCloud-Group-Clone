import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk } from "../../../store/comments";
import "./CreateComment.css";

const CreateComment = () => {
    const dispatch = useDispatch();

    const [body, setBody] = useState('')
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

        dispatch(createCommentThunk(songId, newComment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors))
            });

        setBody("")
    }


    return (
        <>
            <div className="create-comment-user-container">
                <img className="create-comment-user-image" src={currentUser.profile_image_url} alt={currentUser.display_name} />
            </div>
            <form className="comment-form" onSubmit={handleSubmit} type='submit'>
                <ul className="errors-comment">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="create-comment-container">
                    <div className="create-comment-input-container">
                        <input
                            className="create-comment-input-field"
                            placeholder="Write a comment"
                            type="text"
                            value={body}
                            onChange={(e)=> setBody(e.target.value)}
                        />
                        <input type="submit" style={{ display: 'none' }}  />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateComment;
