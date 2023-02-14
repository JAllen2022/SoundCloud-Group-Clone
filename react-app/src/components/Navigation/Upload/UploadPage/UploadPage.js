import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UploadPageForm from "../UploadPageForm/UploadPageForm.js";
// let jsmediatags = require("jsmediatags");

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
  const [songImage, setSongImage] = useState('');

  const [length, setLength] = useState("");
  const [songLoading, setSongLoading] = useState(false);
  const [uploadedSong, setUploadedSong] = useState(false);
  const [errors, setErrors] = useState([]);

  const currentUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const data = new FormData();
    data.append("song", song);
    data.append("title", title);
    data.append("artist", artist);
    data.append("genre", genre);
    data.append("length", length);
    data.append("description", description);
    data.append("picture", songImage);

    console.log("checking song image", songImage)
    console.log("checking our package", data)

    setSongLoading(true);

    dispatch(createSongThunk(data))
      .then(async (res) => {
        setSongLoading(false);
        history.push(`/songs/${res.id}`);
      })
      .catch(() => {
        setSongLoading(false);
        console.log("error with uploading song");
      });
  };

  return (
    <div className="upload-page-container">
      <div className="upload-form-container">
        {songLoading ? (
          "Song Loading"
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
        )}
      </div>
    </div>
  );
};

function UploadSong({ setSong, setUploadedSong, setLength}) {
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
    const reader = new FileReader();
    const audio = document.createElement("audio");
    if (e.target.files && file) {
      console.log("checking our file", file);
      reader.onload = function (e) {
        audio.src = e.target.result;
        audio.addEventListener(
          "loadedmetadata",
          function () {
            const duration = toMinutes(audio.duration);
            console.log(
              "The duration of the song is of: " + duration + " seconds"
            );
            setLength(duration);
          },
          false
        );
      };
      reader.readAsDataURL(file);
    }

  // new jsmediatags.Reader(file)
  //       .setTagsToRead(["title", "artist","picture"]).read({
  //         onSuccess: function (tag) {

  //           console.log("this is what tag is", tag)
  //           let tags = tag.tags;

  //           console.log("this is what tag.tags is", tags)

  //         let base64String = "";

  //         for (let i = 0; i < tags.picture.data.length; i++) {
  //           base64String += String.fromCharCode(tags.picture.data[i]);
  //         }

  //         console.log("base64string is", base64String)
  //         let dataUrl = "data:" + tags.picture.format + ";base64," +window.btoa(base64String);

  //         console.log("this is what dataUrl is", dataUrl)

  //       //   document.getElementById('cover').setAttribute('src',dataUrl);
  //       //     },
  //       //     onError: function(error) {
  //       //       console.log(':(', error.type, error.info);
  //       }
  //     });


    setSong(file);
    setUploadedSong(true);
  };

  return (
    <>
      <p>Upload Your Song Here</p>
      <label htmlFor="upload-song-file">Click Here To Choose A File</label>
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
