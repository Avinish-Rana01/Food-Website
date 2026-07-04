import React, { useState, useRef } from "react";
import intrVideo from "url:../assets/intr-video.mp4";
const SplashScreen = ({ onEnter }) => {
    const [isVisible, setIsVisible] = useState(true);
    const touchStartY = useRef(0);

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY.current - touchEndY > 50) { // Swipe up threshold
            handleEnter();
        }
    };

    const handleEnter = () => {
        setIsVisible(false);
        setTimeout(() => {
            onEnter();
        }, 800); // Match transition duration
    };

    return (
        <div
            className={`splash-screen ${!isVisible ? "fade-out" : ""}`}
            onClick={handleEnter}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="splash-video"
            >
                <source src={intrVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="splash-overlay">
                <div className="splash-content">
                    <h1 className="splash-title">Avi Grill</h1>
                    <p className="splash-subtitle">Taste the Extraordinary</p>

                    <div className="swipe-up-container">
                        <div className="arrows-stack">
                            <div className="arrow-item"></div>
                            <div className="arrow-item"></div>
                            <div className="arrow-item"></div>
                        </div>
                        {/* <p className="swipe-text">Swipe Up to Enter</p> */}
                        <h1 className="swipe-text">Swipe Up to Enter</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
