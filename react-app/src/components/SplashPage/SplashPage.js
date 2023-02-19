// import { useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getSongThunk } from "../../../store/songs";
// import { Link } from "react-router-dom";
import header1 from '../../assets/splash-header-1.jpeg'
// import Carousel from 'flat-carousel';

export default function SplashPage() {
    const images = [
        { src: header1 }
    ];

    return (
        <div className="page-outer-container">
            <div className="page-container">
                <div className="splash-page-container">
                    <h1>Welcome to Tune Space </h1>


        {images.map((image, index) => (
            <div key={index}
                className="demo-item"

            />
        ))}

                </div>
            </div>
        </div>
    )
}
