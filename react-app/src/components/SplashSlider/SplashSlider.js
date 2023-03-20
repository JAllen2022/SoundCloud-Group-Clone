import './SplashSlider.css'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


const SplashSlider = ({ slides }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [dotOneColor, setDotOneColor] = useState({ backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF" })
    const [dotTwoColor, setDotTwoColor] = useState({ backgroundColor: "transparent", border: "1px solid #FFFFFF" })
    const [showMenu, setShowMenu] = useState(false);

    const changeIndex = () => {
        if (currentIndex === 0) {

            setCurrentIndex(1)
        } else if (currentIndex === 1) {
            setCurrentIndex(0)
        }
    }

    const changeDotColor = () => {
        if (currentIndex === 0) {
            setDotOneColor({ backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF" })
            setDotTwoColor({ backgroundColor: "transparent", border: "1px solid #FFFFFF" })
        } else if (currentIndex === 1) {
            setDotOneColor({ backgroundColor: "transparent", border: "1px solid #FFFFFF" })
            setDotTwoColor({ backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF" })
        }
    }

    useEffect(() => {
        const time = setInterval(() => {
            changeIndex();
        }, 4500);

        changeDotColor();

        return () => {
            clearInterval(time)
            clearInterval(changeDotColor)
        }
    }, [currentIndex])


    const slideStyle = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`,
        transition: "ease-in-out .5s"
    }

    const slideOne = (e) => {
        e.preventDefault();
        setCurrentIndex(0);
    }

    const slideTwo = (e) => {
        e.preventDefault();
        setCurrentIndex(1);
    }

    const closeMenu = () => {
        setShowMenu(false);
    };


    return (

        <>
            <div className="background-image" style={slideStyle}>
                <div className="splash-header">
                    <div className="soundcloud-logo-name">
                        <div className='splash-logo'>
                            <i className="fa-brands fa-soundcloud fa-3x "></i>
                        </div>
                        <div className='tunespace'>
                            <h3> TuneSpace </h3>
                        </div>
                    </div>
                    <div className="splash-page-nav">
                        <OpenModalButton
                            buttonText="Sign in"
                            onItemClick={closeMenu}
                            className="splash-page-bottom-sign-in-butt"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalButton
                            buttonText="Create account"
                            onItemClick={closeMenu}
                            className="splash-page-create-account-div"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                </div>
                <div className='slider-words'>
                    <div className='whatsnext'>
                        What's next in music is first on TuneSpace
                    </div>
                    <div className='upload-your-track'>
                        Upload your first track and begin your journey. TuneSpace gives you space to create, find your fans, and connect with other artists.
                    </div>
                </div>
                <div className='dotOne' onClick={(e) => slideOne(e)} style={dotOneColor}></div>
                <div className='dotTwo' onClick={(e) => slideTwo(e)} style={dotTwoColor}></div>
            </div>

        </>

    )
}

export default SplashSlider;
