import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainHeading from "../components/MainHeading";
import { API_URL } from "../App";
import PropTypes from 'prop-types';

const ProfilePage = ({ token, id }) => {
    const [username, setUsername] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);
    const [verifiedCertain, setVerifiedCertain] = useState(false);
    const { name } = useParams();

    const [eAll, setEAll] = useState();
    const [mAll, setMAll] = useState();
    const [hAll, setHALL] = useState();
    const [eSolved, setESolved] = useState();
    const [mSolved, setMSolved] = useState();
    const [hSolved, setHSolved] = useState();

    useEffect(() => {
        axios.get(`${API_URL}/api/accounts/id/${id}`, {
            headers: { Authorization: token },
        })
        .then(({ data }) => {
            setUsername(data.username);
            setVerified(true);
            setVerifiedCertain(true);
        })
        .catch(() => {
            setVerified(false);
            setVerifiedCertain(true);
        });

        axios.get(`${API_URL}/api/accounts/${name}`)
        .then(({ data }) => {
            setUsername(data.username);
            setUser(data);
            setEAll(data.easy_problems_count);
            setMAll(data.medium_problems_count);
            setHALL(data.hard_problems_count);
            setESolved(data.problems_solved_easy);
            setMSolved(data.problems_solved_medium);
            setHSolved(data.problems_solved_hard);
        });
    }, []);

    return (
        <div className="p-6 bg-blue-100 min-h-screen font-sans text-gray-800">
            <MainHeading
                data={
                    verifiedCertain && verified
                        ? { username, status: "loggedin", items: [{ text: "Problem List", link_path: "/problemset" }] }
                        : verifiedCertain
                        ? { status: "not-loggedin" }
                        : { status: "none" }
                }
            />

            {user && (
                <>
                    {/* Profile Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center justify-between mt-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="text-2xl font-semibold">{user.username}</div>
                                <div className="text-gray-500 text-sm">Rank: {user.rank}</div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 text-sm space-y-1 text-right">
                            <div><strong>Views:</strong> {user.views}</div>
                            <div><strong>Solutions:</strong> {user.solution_count}</div>
                            <div><strong>Reputation:</strong> {user.reputation_count}</div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <div className="text-xl font-semibold mb-4">Problem Solving Stats</div>
                        <div className="text-4xl font-bold text-blue-600">
                            {user.problems_solved_count}{" "}
                            <span className="text-sm text-gray-500">
                                / {eAll + mAll + hAll}
                            </span>
                        </div>

                        <div className="mt-6 space-y-4">
                            <ProgressBar label="Easy" solved={eSolved} total={eAll} color="bg-green-400" />
                            <ProgressBar label="Medium" solved={mSolved} total={mAll} color="bg-yellow-500" />
                            <ProgressBar label="Hard" solved={hSolved} total={hAll} color="bg-red-400" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const ProgressBar = ({ label, solved, total, color }) => {
    const percentage = Math.round((solved / (total || 1)) * 100);
    return (
        <div>
            <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                <span>{label}</span>
                <span>{solved} / {total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div className={`${color} h-3 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    label: PropTypes.string.isRequired,
    solved: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

ProfilePage.propTypes = {
    token: PropTypes.string,
    id: PropTypes.string
};

export default ProfilePage;
