import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import { setPlayerReference, isPlaying } from "../../store/songs"
import { setCurrentTime } from "../../store/songs";
import "./SongPlayer.css";
// import playButton from "../../assets/play-arrow.202x256.png";

export default function SongPlayer() {
  const playSong = useSelector(state => state.Songs.playSong)
  const time = useSelector(state => state.Songs.currentTime)
  // console.log("time", time)

  // const isPlaying = useSelector(state => state.Songs.isPlaying)
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("what is ref", playerRef)
    dispatch(setPlayerReference(playerRef))
  }, [dispatch])
  const buffer = {
    display: 'block',
    // padding: '20px',
    // height: '60px',
    width: '100%',
  }

  const handleListen = () => {
    // console.log("checking this", playerRef.current.audio.current.currentTime)
    dispatch(setCurrentTime(playerRef.current.audio.current.currentTime));
  }

  // console.log("checking state isPlaying ~~~~~~~~~~~~~~~~~~", isPlaying)
  return (
    <div>
      <div style={buffer} />
      <div className="song-player">
        <AudioPlayer
          autoPlay
          showSkipControls={true}
          showJumpControls={false}
          // playing={isPlaying}
          // pause={isPlaying}
          ref={playerRef}
          onListen={handleListen}
          layout='horizontal-reverse'
          showFilledVolume={true}
          customIcons={{
            play:
              <div className="rhap_play-pause-button" style={{'background': "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTggNXYxNGwxMS03eiIvPjwvc3ZnPgo=) no-repeat 55%"}}>
              </div>
            ,
            pause: isPlaying && <div className="rhap_play-pause-button" style={{'background': "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPjwvc3ZnPgo=)", "background-position": "50%"}}>
              </div>
          }}
          src={playSong?.song_url || ''}
          onPlay={(e) => dispatch(isPlaying(true))}
          onPause={(e) => dispatch(isPlaying(false))}
        // other props here
        />
      </div>
    </div>
  );
}
// export default function Untitled() {
//   const playerRef = useRef(null);
//   const [playing, setPlaying] = useState(true)
//   return (
//   <div>
//       <ReactPlayer
//           style={{display:"none"}}
//           controls={false}
//           playing={playing}
//           wrapper={"audio"}
//           progressInterval={200}
//           config={{
//             file: {
//               attributes: {preload: "auto"},
//               forceAudio:true,
//             },
//           }}
//       />
//       <IconButton size="small">
//           {playerRef && playerRef.current.player.isPlaying ? (
//             <PauseIcon onClick={() => setPlaying(false)}/>
//           ) : (
//             <PlayArrowIcon onClick={() => setPlaying(true)}/>
//           )}
//       </IconButton>

/* <IconButton size="small">
            {playing? (
              <PauseIcon onClick={() => setPlaying(false)}/>
            ) : (
              <PlayArrowIcon onClick={() => setPlaying(true)}/>
            )}
        </IconButton> */
//   </div>
//   )
// }
