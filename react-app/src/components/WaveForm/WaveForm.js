import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import "./WaveForm.css";

const Waveform = ({ song, audioFile }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [wave, setWave] = useState();
    const waveformRef = useRef(null);
    const currentSong = useSelector((state) => state.Songs.playSong);
    const currentTime = useSelector((state) => state.Songs.currentTime);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            height: 90,
            waveColor: 'white',
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

    let prevTime = 1 / 360;

    const updateWaveform = (time) => {
        if (wave && currentSong.id === song.id) {
            const deltaTime = (time + prevTime )/1000;
            console.log("checking delta time", deltaTime)
            wave.setCurrentTime(deltaTime);

            animationFrameId.current = requestAnimationFrame(updateWaveform);
        }
    };

    useEffect(() => {
        updateWaveform(currentTime);

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [wave, currentSong.id, currentTime]);

    return (
        <div className="waveform-container" >
            <>
                <div ref={waveformRef} className="waveform" />
                <div id="wave-timeline" />
                <div className='wave-bottom'>
                    <div className='wave-bottom-overlay-bar'></div>
                    <div className='wave-bottom-overlay'></div>
                </div>
            </>
        </div>
    );
};

export default Waveform;
