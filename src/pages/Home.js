import React, { useEffect, useRef, useState } from "react";
// import WebApp from 'some-library';

import { Outlet, useLocation } from "react-router-dom";
// import "../tailwind.css";
// import "../AdminMain.css";
// import "../mainApp.css";
import "../index.css";

import { AnimatePresence } from "framer-motion";
// import Footer from "../Components/Footer";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { UserProvider } from "../context/userContext";
import { browserName } from "react-device-detect";

const tele = window.Telegram.WebApp;
const Home = () => {
    const location = useLocation();
    // eslint-disable-next-line
    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
    const [hider, setHider] = useState(false);
    const [restrictAccess, setRestrictAccess] = useState(false);

    useEffect(() => {
        const handleContextMenu = (event) => event.preventDefault();
        const handleKeyDown = (event) => {
            if ((event.ctrlKey && (event.key === 'u' || event.key === 's')) || (event.ctrlKey && event.shiftKey && event.key === 'i')) {
                event.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        tele.ready();
        tele.expand();
        window.Telegram.WebApp.setHeaderColor('#000'); // Set header color to black

        // Haptic feedback
        if (tele.HapticFeedback) {
            tele.HapticFeedback.impactOccurred("medium");
        }
        // if (navigator.vibrate) {
        //     navigator.vibrate(100); // Vibrate for 100ms
        // }
    }, []);

    useEffect(() => {
        // const isDashboardRoute = location.pathname.startsWith('/dashboardADx') || location.pathname.startsWith('/dashboard');
        // Check if the user has visited before using localStorage
        const visited = localStorage.getItem('hasVisitedBefore');
        if (visited) {
            // User has visited before, no need to show the welcome message
            setHasVisitedBefore(true);
        } else {
            setHider(true);
            // Set the item in localStorage to mark the user as visited
            localStorage.setItem('hasVisitedBefore', 'true');
        }

        setTimeout(() => {
            setHider(false);
        }, 1000);

        // eslint-disable-next-line
    }, []);

    const overflow = 100;
const scrollableEl = useRef(null);

useEffect(() => {
    const isDashboardRoute = location.pathname.startsWith('/dashboardAdx') || location.pathname.startsWith('/dashboard');

    if (isDashboardRoute) {
        // console.log('Dashboard route');
        return; // Exit early to prevent unnecessary modifications
    }

    // Apply styles only if they haven't been applied already
    // if (document.body.dataset.overflowApplied !== "true") {
    //     document.body.style.overflowY = 'hidden';
    //     document.body.style.height = `${window.innerHeight}px`;
    //     document.body.style.paddingBottom = `${overflow}px`;

    //     // Prevent adding margin multiple times
    //     document.body.style.marginTop = `${overflow}px`;
    //     window.scrollTo(0, overflow);

    //     // Mark as applied to prevent duplicate changes
    //     document.body.dataset.overflowApplied = "true";
    // }

    let ts;

    const onTouchStart = (e) => {
        ts = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
        const el = scrollableEl.current;
        if (el) {
            const scroll = el.scrollTop;
            const te = e.changedTouches[0].clientY;
            if (scroll <= 0 && ts < te) {
                e.preventDefault();
            }
        } else {
            e.preventDefault();
        }
    };

    const onTouchMoveWithException = (e) => {
        const target = e.target.closest('#refer');
        if (!target) {
            onTouchMove(e);
        }
    };

    document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
    document.documentElement.addEventListener('touchmove', onTouchMoveWithException, { passive: false });

    // Cleanup event listeners and reset styles when component unmounts or route changes
    // return () => {
    //     document.documentElement.removeEventListener('touchstart', onTouchStart);
    //     document.documentElement.removeEventListener('touchmove', onTouchMoveWithException);

    //     // Restore original styles if applied
    //     if (document.body.dataset.overflowApplied === "true") {
    //         document.body.style.overflowY = '';
    //         document.body.style.marginTop = '';
    //         document.body.style.height = '';
    //         document.body.style.paddingBottom = '';

    //         // Remove the marker to allow reapplying when needed
    //         delete document.body.dataset.overflowApplied;
    //     }
    // };
}, [location.pathname]); // Removed `overflow` from dependencies to prevent redundant rerenders

    return (
        <>

            <TonConnectUIProvider manifestUrl="https://v2.bleggs.com/tonconnect-manifest.json">
           
                    <AnimatePresence mode="wait">
                        {restrictAccess ? (
                            <>

                                <Outlet />
                            </>
                        ) : (
                            <>
                                {/* <div><p>BrouesrBan</p></div> */}
                                <Outlet />
                            </>
                        )}
                    </AnimatePresence>
          
            </TonConnectUIProvider>

        </>
    );
};

export default Home;
