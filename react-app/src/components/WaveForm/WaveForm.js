import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import "./WaveForm.css";

const Waveform = ({ song, audioFile, songItem }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [wave, setWave] = useState();
    const waveformRef = useRef(null);
    const currentSong = useSelector((state) => state.Songs.playSong);
    const currentTime = useSelector((state) => state.Songs.currentTime);
    const isPlaying = useSelector((state) => state.Songs.isPlaying);

    const animationFrameId = useRef(null);

    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            height: songItem ? 55: 90,
            waveColor: songItem ? "rgba(130, 130, 130)" : 'white',
            progressColor: '#FF5500',
            barGap: 1,
            barRadius: 0,
            barWidth: 2,
            hideScrollbar: true,
            responsive: true,
            partialRender: true,
            interact: false,
            cursorColor: "transparent"
        });

        wavesurfer.load(audioFile);

        wavesurfer.on('ready', () => {
            setIsLoading(false);
        });

        setWave(wavesurfer);

        return () => {
            wavesurfer.destroy();
        };
    }, [audioFile]);

    useEffect(() => {

        if(wave && currentSong.id === song.id)wave.setCurrentTime(currentTime)

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [currentSong, currentTime, isPlaying]);

    return (
        <div className="waveform-container" >
            <>
                <div ref={waveformRef} className="waveform" />
                <div id="wave-timeline" />
                <div className='wave-bottom'>
                <div className={songItem ? "song-item-overlay-bar" : 'wave-bottom-overlay-bar'}></div>
                <div className={songItem ? "song-item-bottom-overlay" :'wave-bottom-overlay'}></div>
                </div>
            </>
        </div>
    );
};

export default Waveform;
