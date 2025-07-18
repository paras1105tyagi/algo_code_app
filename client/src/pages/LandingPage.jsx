import MainHeading from "../components/MainHeading";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
import Loading from "../components/Loading";
import PropTypes from 'prop-types';

const LandingPage = ({ token, id }) => {
    const [username, setUsername] = useState("");
    const [verified, setVerified] = useState(false);
    const [verifiedCertain, setVerifiedCertain] = useState(false);
    useEffect(() => {
        if (!id) {
            setVerified(false);
            setVerifiedCertain(true);
        }
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
                setVerifiedCertain(true);
            })
            .catch((e) => {
                setVerified(false);
                setVerifiedCertain(true);
            });
    }, []);
    return (
        <div className="text-[14px] overflow-hidden h-screen">
            {verifiedCertain ? (
                <MainHeading
                    data={{
                        username: username,
                        status: verified ? "loggedin" : "not-loggedin",
                    }}
                />
            ) : (
                <div className="fixed w-full h-[60px] bg-black border-b border-borders flex felx-row z-[100]">
                    <div className="h-[60px]"></div>
                </div>
            )}
            <div className="w-[100vw] overflow-hidden h-[calc(100vh-60px)] absolute">
                <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-red-800 opacity-60 z-10"></div>
                <div className="absolute circle-2-animation top-[8%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-500 opacity-60 z-10"></div>
                <div className="absolute circle-3-animation top-[10%] left-[45%] -translate-x-1/2 w-[400px] h-[300px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-yellow-600 opacity-60 z-10"></div>
                <div className="absolute circle-4-animation top-[10%] left-[50%] -translate-x-1/2 w-[200px] h-[200px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-red-600 opacity-60 z-10"></div>
                <div className="absolute circle-5-animation top-[10%] left-[45%] -translate-x-1/2 w-[400px] h-[400px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-800 opacity-60 z-10"></div>
                <div className="absolute top-[20%] left-[47%] -translate-x-1/2 w-[600px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-600 opacity-60 z-10"></div>
                <div className="absolute circle-7-animation top-[10%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-800 opacity-60 z-10"></div>
            </div>
            {verifiedCertain && verified ? (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                        <TypeAnimation
                            sequence={[
                                `Welcome back ${username}!`,
                                2000,
                                `Ready for more challenges, ${username}?`,
                                2000,
                                "Let's dive in!",
                            ]}
                            wrapper="span"
                            cursor={true}
                            style={{
                                fontSize: "1em",
                                display: "inline-block",
                            }}
                        />
                    </h1>
                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 md:top-[300px] top-[400px]">
                        Ready to conquer complex challenges? Explore our Problem
                        List now!
                    </p>
                    <div className="absolute md:top-[450px] top-[550px] left-1/2 -translate-x-1/2 z-50">
                        <Link
                            to="/problemset"
                            className="relative ml-[8px] font-bold inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-md text-black text-[18px] hover:bg-red-800"
                        >
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-red-700">
                                Problem List
                            </div>
                        </Link>
                    </div>
                </>
            ) : verifiedCertain === true && verified === false ? (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                        <TypeAnimation
                            sequence={[
                                "Learn",
                                2000,
                                "Solve",
                                2000,
                                "Explore",
                                2000,
                                "Prepare",
                                2000,
                                "Start Now!",
                                5000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{
                                fontSize: "1em",
                                display: "inline-block",
                            }}
                        />
                    </h1>
                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 top-[300px]">
                        Reach the pinnacle of your coding potential with
                        AlgoCode. Elevate your skills, conquer challenges, and
                        excel in technical interviews, propelling your
                        programming journey to new heights.
                    </p>
                    <div className=" absolute top-[500px] left-1/2 -translate-x-1/2 z-50">
                        <Link
                            to="/signup"
                            className=" relative ml-[8px] font-bold inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-md text-black text-[18px] hover:bg-red-800"
                        >
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-red-700">
                                Get Started
                            </div>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-[120]">
                    <Loading />
                </div>
            )}
        </div>
    );
};

LandingPage.propTypes = {
    token: PropTypes.string,
    id: PropTypes.string
};

export default LandingPage;