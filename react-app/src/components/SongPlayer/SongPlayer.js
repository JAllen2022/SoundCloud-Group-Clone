import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./SongPlayer.css";

export default function SongPlayer() {
  const playSong = useSelector(state => state.Songs.playSong)
  return (
    <div>
      <h1>Audio Player</h1>
      <div>
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
