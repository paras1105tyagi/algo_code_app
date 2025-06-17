import React, { useEffect, useState } from "react";
import MainHeading from "../components/MainHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";
import { deleteTokenAndId } from "../ts/utils/utils";
import { TOKEN_STORAGE_KEY, ID_STORAGE_KEY, API_URL } from "../App";
import PropTypes from 'prop-types';

const SettingPage = ({ token, id }) => {
    const [username, setUsername] = useState("");
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    const [deleteAccountConfirm, setDeleteAccountConfirm] =
        useState(false);

    const deleteAccountFn = () => {
        console.log("account deleted");
        axios
            .post(
                `${API_URL}/api/accounts/delete/${id}`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then(({ data }) => {
                if (data.success) {
                    deleteTokenAndId(TOKEN_STORAGE_KEY, ID_STORAGE_KEY);
                    navigate("/");
                    window.location.reload();
                } else {
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
            })
            .catch((e) => {
                console.log(e);
                if (e.response?.data.success === false) {
                    navigate("/sorry");
                    setVerified(false);
                }
            });
    }, []);
    return (
        <>
            {verified ? (
                <MainHeading
                    data={{
                        username: username || "",
                        items: [
                            {
                                text: "Problem List",
                                link_path: "/problemset",
                            },
                        ],
                    }}
                />
            ) : (
                <MainHeading data={{ status: "none" }} />
            )}
            <div className="px-[8px]">
                <div className="bg-black border border-borders rounded-lg mx-auto justify-center mt-[8px] max-w-[1000px] h-fit px-6 py-2">
                    <h1 className="setting-title text-red-600">
                        Delete Account
                    </h1>
                    <p className="setting-p">
                        This will delete your account permenantly. All data will
                        be lost. There is no going back.
                    </p>
                    <button
                        className="setting-button-red"
                        onClick={() => setDeleteAccountConfirm(true)}
                    >
                        Delete your account
                    </button>
                    <ConfirmModal
                        display={deleteAccountConfirm}
                        displayFn={setDeleteAccountConfirm}
                        onOkFn={deleteAccountFn}
                        title="Delete Account"
                        message={`Are you sure you want to delete account ${username}?`}
                    />
                    <hr className="setting-hr" />
                </div>
            </div>
        </>
    );
};

SettingPage.propTypes = {
    token: PropTypes.string,
    id: PropTypes.string
};

export default SettingPage; 