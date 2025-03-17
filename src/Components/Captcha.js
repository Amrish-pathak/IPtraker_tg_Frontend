import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Captcha = () => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const [deviceFingerprint, setDeviceFingerprint] = useState(null);
    const [userIP, setUserIP] = useState(null);
    const recaptchaRef = useRef(null);  // Reference for reCAPTCHA

    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    useEffect(() => {
        const loadFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setDeviceFingerprint(result.visitorId);
        };

        const fetchIP = async () => {
            try {
                const res = await fetch('https://api64.ipify.org?format=json');
                const data = await res.json();
                setUserIP(data.ip);
            } catch (error) {
                console.error('Failed to fetch IP:', error);
            }
        };

        loadFingerprint();
        fetchIP();
    }, []);

    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    const resetCaptcha = () => {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();  // Reset reCAPTCHA
        }
        setCaptchaToken(null);
    };

    const handleSubmit = async () => {
        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        setLoading(true);
        const userId = user.id;

        try {
            if (!userId || !deviceFingerprint || !captchaToken || !userIP) {
                alert('All fields are required. Please try again.');
                resetCaptcha();
                return;
            }

            const response = await fetch('https://iptraker-tg-backend.onrender.com/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    deviceFingerprint,
                    captchaToken,
                    ip: userIP
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPopupMessage({
                    success: true,
                    message: '✅ Verification Successful! Your account is now verified.',
                });
            } else {
                setPopupMessage({
                    success: false,
                    message: `❌ Verification Failed! ${data.message}`,
                });
                resetCaptcha();  // Reset CAPTCHA on failure
            }
        } catch (error) {
            console.error('Verification failed:', error);
            setPopupMessage({
                success: false,
                message: '❌ Verification Failed! Something went wrong.',
            });
            resetCaptcha();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* reCAPTCHA */}
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Les5vUqAAAAAAYUFQ1-_slEerrjrjeXOogrzsKc"
                onChange={handleCaptcha}
                className="shadow-lg rounded-xl"
            />

            {/* Verify Button */}
            <motion.button
                onClick={handleSubmit}
                whileHover={!loading ? { scale: 1.05 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
                {loading ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                ) : (
                    '✅ Verify Now'
                )}
            </motion.button>

            {/* Popup for Success or Failure */}
            {popupMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                >
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
                        <h3 className={`text-xl font-bold text-center ${popupMessage.success ? 'text-green-600' : 'text-red-600'}`}>
                            {popupMessage.message}
                        </h3>

                        {/* Back to Bot Button */}
                        {popupMessage.success ? (
                            <button
                                onClick={() => {
                                    setPopupMessage(null);
                                    window.location.href = 'https://t.me/tgnum_pikerbot';
                                }}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300"
                            >
                                🔙 Back to Bot
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setPopupMessage(null);
                                    resetCaptcha();
                                }}
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition duration-300"
                            >
                                🔄 Try Again
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Captcha;
