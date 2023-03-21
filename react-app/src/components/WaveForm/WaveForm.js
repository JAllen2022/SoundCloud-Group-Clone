import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import "./WaveForm.css";



const Waveform = ({ song, audioFile }) => {
    const [isLoading, setIsLoading] = useState(true);
    // const currentSong = useSelector(state => state.songs.playSong)
    const [wave, setWave] = useState()
    const waveformRef = useRef(null);
    console.log("audioFile: ", audioFile);
    // audioFile ='../..'
    // const currentWaveformRef = waveformRef.current;

    // const returnDiv = <>
    //     <div ref={waveformRef} className="waveform" />
    //     <div id="wave-timeline" />
    // </>

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
        console.log("wavesurfer: ", wavesurfer)

        wavesurfer.load(audioFile);

        wavesurfer.on('ready', () => {
            setIsLoading(false);
        });

        setWave(wavesurfer)


        return () => {
            wavesurfer.destroy();
        };
    }, [audioFile, waveformRef.current, isLoading]);

    // useEffect(() => {
    //     // if(currentSong.id === song.id) setTime ( )
    // }, [time])

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
            {/* {isLoading ? (
                <p>Loading...</p>
            ) : (
                { returnDiv }
            )} */}
        </div>
    );
};

export default Waveform;
