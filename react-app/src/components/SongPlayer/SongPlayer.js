import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import { setPlayerReference } from "../../store/songs"
import "./SongPlayer.css";

export default function SongPlayer() {
  const playSong = useSelector(state => state.Songs.playSong)
  // const isPlaying = useSelector(state => state.Songs.isPlaying)
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("what is ref", playerRef)
    dispatch(setPlayerReference(playerRef))
  },[dispatch])
  const buffer = {
    display: 'block',
    // padding: '20px',
    // height: '60px',
    width: '100%',
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
          layout='horizontal-reverse'
          // customIcons={
          //    play?: ReactNode
          //     pause?: ReactNode
          //     rewind?: ReactNode
          //     forward?: ReactNode
          //     previous?: ReactNode
          //     next?: ReactNode
          //     loop?: ReactNode
          //     loopOff?: ReactNode
          //     volume?: ReactNode
          //     volumeMute?: ReactNode
          // }
          src={playSong?.song_url || ''}
          onPlay={(e) => console.log("onPlay")}
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
