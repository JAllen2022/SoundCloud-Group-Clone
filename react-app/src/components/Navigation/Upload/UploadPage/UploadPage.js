import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UploadPageForm from "../UploadPageForm/UploadPageForm.js";
import { editSongThunk } from "../../../../store/songs";
import { useModal } from "../../../../context/Modal.js";
// let jsmediatags = require("jsmediatags");
import "./UploadPage.css";
import { createSongThunk } from "../../../../store/songs";

const UploadPage = ({ editSong = false, songEdit }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let currentSong = useSelector((state) => state.Songs.singleSong);
  if (songEdit) currentSong = songEdit;
  // console.log("currentSong :", currentSong)
  const { closeModal } = useModal();

  //     const [previewImage, setPreviewImage] = useState("");

  //     const [audioSource, setAudioSource] = useState("");
  //     const [length, setLength] = useState(0);

  const [title, setTitle] = useState(currentSong?.title || "");
  const [genre, setGenre] = useState(currentSong?.genre || "");
  const [artist, setArtist] = useState(currentSong?.artist || "");
  const [description, setDescription] = useState(
    currentSong?.description || ""
  );
  const [song, setSong] = useState("");
  const [songImage, setSongImage] = useState(currentSong?.song_url_image || "");

  const [length, setLength] = useState(currentSong?.length || "");
  const [songLoading, setSongLoading] = useState(false);
  const [uploadedSong, setUploadedSong] = useState(editSong ? true : false);
  const [errors, setErrors] = useState({});
  const imageRef = useRef(null);

  // const currentUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const data = new FormData();

    // If we are creating a new song, add the song file to the FormData object
    if (!editSong) data.append("song", song);
    // If the user uploaded a new image file, add the image file to the FormData object
    if (typeof songImage === "object") data.append("picture", songImage);
    data.append("title", title);
    data.append("artist", artist);
    data.append("genre", genre);
    data.append("length", length);
    data.append("description", description);

    // console.log("checking song image", songImage);
    // console.log("checking our package", data);

    setSongLoading(true);

    let res;
    if (editSong) {
      // If we are editing an existing song, dispatch the EDIT song thunk
      res = await dispatch(editSongThunk(data, currentSong.id));
      if (res.errors) {
        setSongLoading(false);
        setErrors(res);
      } else {
        closeModal();
        setSongLoading(false);
        history.push(`/songs/${res.id}`);
      }
    } else {
      // If we are creating a new song, dispatch the CREATE song thunk
      res = await dispatch(createSongThunk(data));
      if (res.errors) {
        setSongLoading(false);
        setErrors(res);
      } else {
        setSongLoading(false);
        history.push(`/songs/${res.id}`);
      }
    }
  };

  return (
    <div className="page-outer-container">
      <div className="page-container">
        <div className="upload-form-container">
          <ul>
            {Object.keys(errors).map((error) => (
              <li
                style={{ color: "red" }}
                key={error}
                className="upload-page-errors"
              >
                {errors[error]}
              </li>
            ))}
          </ul>
          {songLoading ? (
            <h1 className="loading-text">Song Loading...</h1>
          ) : (
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
                    errors={errors}
                    setErrors={setErrors}
                    imageRef={imageRef}
                    currentSongImage={currentSong?.song_image_url}
                  />
                </>
              ) : (
                <UploadSong
                  setSong={setSong}
                  setUploadedSong={setUploadedSong}
                  setLength={setLength}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

function UploadSong({
  setSong,
  setUploadedSong,
  setLength,
  errors,
  setErrors,
}) {
  const toMinutes = (length) => {
    const minutes = length / 60;
    return minutes.toFixed(2);
    // return +`${Math.floor(minutes.toFixed(2))}:${Math.ceil((minutes.toFixed(2)%1)*60)}`;
  };

  // const populateImagePreview = (e) => {
  //   const file = e.target.files[0]

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       imagePreview.current.src = e.target.result;
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // };

  // npm install jsmediatags --save

  const updateSong = (e) => {
    const file = e.target.files[0];
    // console.log("checking file size", file.size);

    // File size validation. Add error if bytes is bigger than 10mb
    if (file.size > 10000000) {
      setErrors({ FileSize: "File size too large. Maximum file size: 8MB." });
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    const audio = document.createElement("audio");
    if (e.target.files && file) {
      // console.log("checking our file", file);
      reader.onload = function (e) {
        audio.src = e.target.result;
        audio.addEventListener(
          "loadedmetadata",
          function () {
            const duration = toMinutes(audio.duration);
            // console.log(
            //   "The duration of the song is of: " + duration + " seconds"
            // );
            setLength(duration);
          },
          false
        );
        // Remove event listener
        audio.removeEventListener(
          "loadedmetadata",
          function () {
            const duration = toMinutes(audio.duration);
            // console.log(
            //   "The duration of the song is of: " + duration + " seconds"
            // );
            setLength(duration);
          },
          false
        );


      };
      reader.readAsDataURL(file);
    }

    // If we have a file size error, remove it when a appropriate file is added
    if (errors.FileSize) {
      const newErrors = { ...errors };
      delete newErrors.FileSize;
      setErrors(newErrors);
    }
    setSong(file);
    setUploadedSong(true);
  };
  // const updateSong = (e) => {
  //   const file = e.target.files[0];

  //   if (file.size > 10000000) {
  //     setErrors({
  //       FileSize: "File size too large. Maximum file size: 8MB.",
  //     });
  //     e.target.value = "";
  //     return;
  //   }

  //   const reader = new FileReader();
  //   const audio = document.createElement("audio");

  //   if (e.target.files && file) {
  //     reader.onload = function (e) {
  //       audio.src = e.target.result;

  //       audio.addEventListener(
  //         "loadedmetadata",
  //         function () {
  //           const duration = toMinutes(audio.duration);

  //           setLength(duration);

  //           jsmediatags.read(file, {
  //             onSuccess: function (tag) {
  //               // Access the image data in the tag object
  //               const imageData = tag.tags.picture.data;
  //               const base64String = imageData.reduce(
  //                 (data, byte) => data + String.fromCharCode(byte),
  //                 ""
  //               );
  //               const imageUrl = `data:${
  //                 tag.tags.picture.format
  //               };base64,${window.btoa(base64String)}`;
  //               setSongImage(imageUrl);
  //             },
  //             onError: function (error) {
  //               console.log("Error reading tags:", error);
  //             },
  //           });
  //         },
  //         false
  //       );

  //       audio.removeEventListener(
  //         "loadedmetadata",
  //         function () {
  //           const duration = toMinutes(audio.duration);
  //           setLength(duration);
  //         },
  //         false
  //       );
  //     };

  //     reader.readAsDataURL(file);
  //   }

  //   if (errors.FileSize) {
  //     const newErrors = { ...errors };
  //     delete newErrors.FileSize;
  //     setErrors(newErrors);
  //   }

  //   setSong(file);
  //   setUploadedSong(true);
  // };

  return (
    <div className="up-box-outer-contianer">
      <div className="up-tab-container">
        <p className="up-tab-name">Upload</p>
      </div>
      <div className="up-box-contianer">
        <div className="up-field-contianer">
          <h1>Upload Your Song Here</h1>
          <div className="up-upload-container">
            <label className="up-upload-label" htmlFor="upload-song-file">
              Click Here To Choose A File
            </label>
            <input
              required
              className="input-item file-input"
              id="upload-song-file"
              name="upload-song-file"
              type="file"
              accept="audio/*"
              onChange={updateSong}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
