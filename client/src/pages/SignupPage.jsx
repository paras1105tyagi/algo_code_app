import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import Loading from "../components/Loading";
import PropTypes from 'prop-types';

const SignupPage = ({ Data }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = () => {
        setisLoading(true);
        try {
            if (password !== confirmPassword) {
                setMessage(
                    "Password and confirm password do not match. Please make sure you enter the same password in both fields."
                );
                return;
            }
            axios
                .post(`${API_URL}/api/accounts/signup`, {
                    username: username,
                    email: email,
                    password: password,
                })
                .then(({ data }) => {
                    Data.setTokenFunction(data.token);
                    Data.setIdFunction(data.id);
                    navigate("/problemset");
                })
                .catch((e) => {
                    setisLoading(false);
                    setMessage(e.response?.data.message);
                });
        } catch (error) {
            console.error("Sign-up failed:", error);
        }
    };

    return (
        <>
            <Link to={"/"}>
                <div
                    id="logo-cont"
                    className="inline-block relative text-[24px] left-1/2 -translate-x-1/2 font-bold italic mx-auto mt-[12px]"
                >
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 px-[1px]">
                        Algo_
                    </span>
                    <span className="text-white">Code</span>
                </div>
            </Link>

            <div className="min-h-fit w-[300px] mx-auto text-[14px]">
                <div className="relative bg-[#0b1120] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-[34px] font-bold mb-[30px] text-center mt-[60px] text-white">
                        Sign Up
                    </h2>
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-gray-400 focus:placeholder:text-indigo-300 bg-[#0b1120] text-white rounded border-indigo-700 leading-tight focus:outline-none focus:border-indigo-400"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-gray-400 focus:placeholder:text-indigo-300 bg-[#0b1120] text-white rounded border-indigo-700 leading-tight focus:outline-none focus:border-indigo-400"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-gray-400 focus:placeholder:text-indigo-300 bg-[#0b1120] text-white rounded border-indigo-700 leading-tight focus:outline-none focus:border-indigo-400"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="appearance-none border w-full py-2 px-3 placeholder:text-gray-400 focus:placeholder:text-indigo-300 bg-[#0b1120] text-white rounded border-indigo-700 leading-tight focus:outline-none focus:border-indigo-400"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-[6px] px-4 rounded focus:outline-none focus:shadow-outline w-full transition"
                            type="button"
                            onClick={handleSignUp}
                        >
                            {isLoading ? (
                                <div className="w-full block h-[21px]">
                                    <div className="absolute left-1/2 -translate-x-1/2">
                                        <Loading />
                                    </div>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-[20px]">
                        <span className="text-gray-400">
                            Already have an account?{" "}
                        </span>
                        <Link
                            to="/login"
                            className="text-indigo-400 hover:text-blue-400"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="text-center mt-[20px] text-red-500 w-full overflow-hidden">
                        {message}
                    </div>
                </div>
            </div>
        </>
    );
};

SignupPage.propTypes = {
    Data: PropTypes.shape({
        token: PropTypes.string.isRequired,
        setTokenFunction: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        setIdFunction: PropTypes.func.isRequired
    }).isRequired
};

export default SignupPage;
