import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UploadPageForm from "../UploadPageForm/UploadPageForm.js";

import { createSongThunk } from "../../../../store/songs";

const UploadPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    //     const [previewImage, setPreviewImage] = useState("");

    //     const [audioSource, setAudioSource] = useState("");
    //     const [length, setLength] = useState(0);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("None");
    const [artist, setArtist] = useState("");
    const [description, setDescription] = useState("");
    const [song, setSong] = useState("");
    const [songImage, setSongImage] = useState("");
    const [length, setLength] = useState("");
    const [songLoading, setSongLoading] = useState(false);
    const [uploadedSong, setUploadedSong] = useState(false);
    const [errors, setErrors] = useState([]);
    //     const [submitted, setSubmitted] = useState(false);

    const currentUser = useSelector((state) => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const newSongData = {
            // Need these fields:
            user_id: currentUser.id,
            length,
            title,
            artist,
            genre,
            description,
            song_url: song,
            song_image_url: songImage,
            song,
        };
        // ********* Set song loading in here somewhere ************
        dispatch(createSongThunk(newSongData /*previewImage*/))
            .then((res) => history.push(`/songs/${res.id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };


    return (
        <div className="upload-page-container">
            <div className="upload-form-container">
                <form action="/songs" method="post" onSubmit={handleSubmit}>
                    {uploadedSong ? (
                        <>
                            <UploadPageForm
                                title={title}
                                setTitle={setTitle}
                                genre={genre}
                                setGenre={setGenre}
                                artist={artist}
                                setArtist={setArtist}
                                description={description}
                                setDescription={setDescription}
                                setSongImage={setSongImage}
                            />
                        </>
                    ) : (
                        <UploadSong
                            setSong={setSong}
                            setUploadedSong={setUploadedSong}
                            setLength={setLength}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

function UploadSong({ setSong, setUploadedSong, setLength }) {
    const toMinutes = (length) => {
        const minutes = length / 60;
        return `${Math.floor(minutes.toFixed(2))}:${Math.ceil((minutes.toFixed(2)%1)*60)}`;
    };

    const updateSong = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const audio = document.createElement("audio");
        if (e.target.files && file) {
            console.log("we here");
            reader.onload = function (e) {
                audio.src = e.target.result;
                audio.addEventListener(
                    "loadedmetadata",
                    function () {
                        const duration = toMinutes(audio.duration);
                        console.log(
                            "The duration of the song is of: " +
                                duration +
                                " seconds"
                        );
                        setLength(duration);
                    },
                    false
                );
            };
            reader.readAsDataURL(file);
        }
        setSong(file);
        setUploadedSong(true);
    };

    return (
        <>
            <p>Upload Your Song Here</p>
            <label for="upload-song-file">Click Here To Choose A File</label>
            <input
                required
                id="upload-song-file"
                name="upload-song-file"
                type="file"
                accept="audio/*"
                onChange={updateSong}
            />
        </>
    );
}

export default UploadPage;
