import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import Loading from "../components/Loading";
import PropTypes from 'prop-types';

const LoginPage = ({ Data }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setisLoading(true);
        try {
            axios
                .post(`${API_URL}/api/accounts/login`, {
                    username_or_email: usernameOrEmail,
                    password: password,
                })
                .then(({ data }) => {
                    if (data.success === false) {
                        setMessage(data.message);
                        setisLoading(false);
                        return;
                    }
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-zinc-900 px-4">
            <Link to="/" className="text-[28px] font-bold italic text-center mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Algo</span>
                <span className="text-white">_Code</span>
            </Link>

            <div className="w-full max-w-sm bg-zinc-950 text-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

                <div className="mb-4">
                    <input
                        className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="text"
                        placeholder="Username or Email"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition text-black font-semibold py-2 rounded-xl shadow-lg"
                >
                    {isLoading ? (
                        <div className="flex justify-center">
                            <Loading />
                        </div>
                    ) : (
                        "Log In"
                    )}
                </button>

                <div className="text-sm mt-6 text-zinc-400 flex justify-between">
                    <span>Don't have an account?</span>
                    <Link to="/signup" className="text-orange-500 hover:text-red-600 font-medium">Sign up</Link>
                </div>

                {message && (
                    <div className="mt-4 text-red-500 text-center text-sm font-medium">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    Data: PropTypes.shape({
        token: PropTypes.string,
        setTokenFunction: PropTypes.func,
        id: PropTypes.string,
        setIdFunction: PropTypes.func
    })
};

export default LoginPage;
