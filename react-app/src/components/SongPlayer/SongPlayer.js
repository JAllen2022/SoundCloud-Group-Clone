import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import "./SongPlayer.css";

export default function SongPlayer() {
  const playSong = useSelector(state => state.Songs.playSong)
  const buffer = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }
  return (
    <div>
      <div style={buffer} />
      <div className="song-player">
        <AudioPlayer
          autoPlay
          src={playSong?.song_url || ''}
          onPlay={(e) => console.log("onPlay")}
          // other props here
        />
      </div>
    </div>
  );
}
