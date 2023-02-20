// import { useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getSongThunk } from "../../../store/songs";
// import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Carousel } from 'react-carousel-minimal';
// import '../../assets/splash-header-1.jpeg'
import './SplashPage.css'


export default function SplashPage() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();
    const images = [
        { image: '../../assets/splash-header-1.jpeg' }
    ];

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <div className="splash-page-outer-container">
            <div className="splash-page-container">
                <div className="splash-page-carousel-container">
                    <i className="fa-brands fa-soundcloud fa-3x "></i>
                    <h3> SOUNDCLOUD </h3>
                    <div className="splash-page-nav">
                        <OpenModalButton
                            buttonText="Log In"
                            onItemClick={closeMenu}
                            className="splash-page-login-button"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalButton
                            buttonText="Sign Up"
                            onItemClick={closeMenu}
                            className="splash-page-login-button"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                </div>
                <div className="splash-page-never-stop-listening-container">
                    <div className="splash-page-never-stop-listening-left">
                        <img className="splash-page-never" src="https://a-v2.sndcdn.com/assets/images/never_stop_listening@1x-9c5264ff.jpg" alt="splash-page-phones" />
                    </div>
                    <div className="splash-page-never-stop-listening-right">
                        <div className="splash-page-never-stop-listening-right-inner-container">
                            <div className="splash-page-never-stop-listening-text">Never stop listening</div>
                            <div className="splash-page-never-stop-gradient"></div>
                            <div className="splash-page-never-stop-listening-body-text">SoundCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</div>
                        </div>
                        <div className="app-store-container">
                            <div className="app-store-button"><a href="https://apps.apple.com/us/app/soundcloud/id336353151"><img className="app-store-button-image" src="https://a-v2.sndcdn.com/assets/images/appstore_badge@en-9e7292e6.png" alt="apple store link" /></a></div>
                            <div className="app-store-button"><a href="https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us"><img className="app-store-button-image" src="https://a-v2.sndcdn.com/assets/images/google_play_badge@en-51d52194.png" alt="google store link" /></a></div>
                        </div>
                    </div>
                </div>
                <div className="splash-page-calling-all-creators-container">
                    <div className="splash-page-calling-all-creators-text-container">
                        <div className="splash-page-calling-all-creators-header">Calling all creators </div>
                        <p className="splash-page-calling-all-creators-inner-text">Get on SoundCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>
                        <a href="https://community.soundcloud.com/playbook-articles/introducing-the-new-dashboard-on-soundcloud-for-artists"><div className="splash-page-calling-all-creators-fill-out-more">Find out more</div></a>
                    </div>
                </div>
                <div>
                    <div>
                        <div>Thanks for listening. Now join in. </div>
                        <p>Save tracks, follow artists and build playlists. All for free.</p>
                        <div>Create an account</div>
                        <div> Already have an account? Sign in</div>
                    </div>
                </div>
            </div>

        </div>

    )
}
