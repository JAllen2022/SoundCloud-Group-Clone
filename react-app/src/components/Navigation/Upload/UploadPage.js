// import { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { createSongThunk } from '../../../store/songs';


const UploadPage = () => {
//     const history = useHistory();
//     const dispatch = useDispatch();

//     const sessionUser = useSelector(state => state.session.user)
//     const songFile = useRef();
//     const imageFile = useRef();
//     const imagePreview = useRef();

//     const [previewImage, setPreviewImage] = useState("");

//     const [audioSource, setAudioSource] = useState("");
//     const [length, setLength] = useState(0);

//     const [title, setTitle] = useState("");
//     const [genre, setGenre] = useState("None");
//     const [artist, setArtist] = useState("");
//     const [description, setDescription] = useState("");


//     const [songLoading, setSongLoading] = useState(false);
//     const [errors, setErrors] = useState([]);
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setErrors([]);

//         const newSongData = {
//             title,
//             genre,
//             description,
//         }

//         dispatch(createSongThunk(newSongData, previewImage))
//             .then((res) => history.push(`/songs/${res.id}`))
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if (data && data.errors) setErrors(data.errors)
//             });
//     }

//     const popPreviewImage = (e) => {
//         const file = e.target.files[0]

//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 imagePreview.current.src = e.target.result;
//             }
//             reader.readAsDataURL(file);
//         }
//     }

//     const toMinutes = (length) => {
//         const minutes = Math.floor(length / 60);
//         let seconds = Math.floor(length % 60);
//         if (seconds < 10) {
//             seconds = "0" + seconds;
//         }
//         return minutes + ":" + seconds
//     }

//     const chooseFile = (e) => {
//         const file = songFile.current.files[0]
//     }


    return (
        <>
            <h1>hi world!</h1>
            <label for='upload-file'>Upload here</label>
            <input id='upload-file' name='upload-file' type='file' />
        </>
    )
}


export default UploadPage;
