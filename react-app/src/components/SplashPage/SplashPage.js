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
import splashheader1 from "../../assets/splash-header-1.jpeg";
import splashheader2 from "../../assets/splash-header-2.jpeg";
import SplashSlider from "../SplashSlider/SplashSlider";
import { Carousel } from 'react-carousel-minimal';
// import '../../assets/splash-header-1.jpeg'
import './SplashPage.css'


export default function SplashPage() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const slides = [
        { url: `${splashheader1}`, title: 'splash-1' },
        { url: `${splashheader2}`, title: 'splash-2' }
    ]

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
                <div className="slider-container">
                    <SplashSlider slides={slides} />
                </div>
                <div className="splash-page-never-stop-listening-container">
                    <div className="splash-page-never-stop-listening-left">
                        <img className="splash-page-never" src="https://a-v2.sndcdn.com/assets/images/never_stop_listening@1x-9c5264ff.jpg" alt="splash-page-phones" />
                    </div>
                    <div className="splash-page-never-stop-listening-right">
                        <div className="splash-page-never-stop-listening-right-inner-container">
                            <div className="splash-page-never-stop-listening-text">Never stop listening</div>
                            <div className="splash-page-never-stop-gradient"></div>
                            <div className="splash-page-never-stop-listening-body-text">TuneSpace is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</div>
                        </div>
                        <div className="app-store-container">
                            <div className="app-store-button"><a href="https://apps.apple.com/us/app/soundcloud/id336353151"><img className="app-store-button-image" src="https://a-v2.sndcdn.com/assets/images/appstore_badge@en-9e7292e6.png" alt="apple store link" /></a></div>
                            <div className="app-store-button"><a href="https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us"><img className="app-store-button-image-play" src="https://a-v2.sndcdn.com/assets/images/google_play_badge@en-51d52194.png" alt="google store link" /></a></div>
                        </div>
                    </div>
                </div>
                <div className="splash-page-calling-all-creators-container">
                    <div className="splash-page-calling-all-creators-text-container">
                        <div className="splash-page-calling-all-creators-header">Calling all creators </div>
                        <p className="splash-page-calling-all-creators-inner-text">Get on TuneSpace to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>
                        <a href="https://community.soundcloud.com/playbook-articles/introducing-the-new-dashboard-on-soundcloud-for-artists"><div className="splash-page-calling-all-creators-fill-out-more">Find out more</div></a>
                    </div>
                </div>
                <div className="splash-page-thanks-for-listening-container">
                    <div className="splash-page-thanks-for-listening">Thanks for listening. Now join in. </div>
                    <p className="splash-page-save-tracks">Save tracks, follow artists and build playlists. All for free.</p>
                    <OpenModalButton
                        buttonText="Create an account"
                        onItemClick={closeMenu}
                        className="splash-page-create-account-bottom"
                        modalComponent={<SignupFormModal />}
                    />
                    <div className="splash-page-already-have-account"> Already have an account? <span>  <OpenModalButton
                        buttonText="Sign in"
                        onItemClick={closeMenu}
                        className="splash-page-bottom-sign-in-div"
                        modalComponent={<LoginFormModal />}
                    /></span>
                    </div>
                    <div className="disclaimers-lang-splash">
                        <div className="disclaimers-container">
                            <div className="disclaimers-splash">
                                Directory &#x2022; About us &#x2022; Artist Resources &#x2022; Blog &#x2022; Jobs &#x2022; Developers &#x2022; Help &#x2022; Legal &#x2022; Do Not Sell or Share My Personal Information
                                &#x2022; Privacy &#x2022; Cookie Policy &#x2022; Cookie Manager
                                &#x2022; Imprint &#x2022; Charts &#x2022;
                            </div>
                        </div>
                        <div className="lang-cont-splash">
                            <div className="lang-splash">Language: </div><p> English (US)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
