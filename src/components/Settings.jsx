import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import AccountFormRow from "./AccountFormRow";
import { useUserContext } from "../context/User_Context";
import Message from "./Message";

const Settings = () => {
  const { showMessage, message, user, getUser, polishName } = useUserContext();

  const [passwordData, setPasswordData] = useState({
    old: "",
    new: "",
  });
  const [newName, setNewName] = useState("");
  const [updateNameWindow, setUpdateNameWindow] = useState(false);
  const [updatePasswordWindow, setUpdatePasswordWindow] = useState(false);
  const [hideWindow, setHideWindow] = useState(false);

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const updateName = async (e) => {
    e.preventDefault();
    setbtnStatus({
      text: "loading",
      disabled: true,
    });

    if (newName.length < 3) {
      showMessage(
        true,
        "error-msg",
        "please make sure name has three or more characters"
      );
      setbtnStatus({
        text: "save",
        disabled: false,
      });
      return;
    }

    try {
      await axios.patch(`/api/v1/users/updateUser`, { name: newName });
      setNewName("");
      showMessage(true, "success-msg", "username updated.");
      setbtnStatus({
        text: "save",
        disabled: false,
      });
      closeWindow("name");
      getUser();
    } catch (err) {
      showMessage(true, "error-msg", "Error: Please try again");
      setNewName("");
      setbtnStatus({
        text: "save",
        disabled: false,
      });
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    setbtnStatus({
      text: "saving",
      disabled: true,
    });

    if (passwordData.old.length < 6 || passwordData.new.length < 6) {
      showMessage(
        true,
        "error-msg",
        "please make sure both old and new passwords have six or more characters"
      );
      setbtnStatus({
        text: "save",
        disabled: false,
      });
      return;
    }

    try {
      await axios.patch(`/api/v1/users/updateUserPassword`, {
        oldPassword: passwordData.old,
        newPassword: passwordData.new,
      });
      setPasswordData({
        old: "",
        new: "",
      });
      showMessage(true, "success-msg", "password updated.");
      closeWindow("password");
      setbtnStatus({
        text: "Submit",
        disabled: false,
      });
      getUser();
    } catch (err) {
      setbtnStatus({
        text: "Submit",
        disabled: false,
      });
      setPasswordData({
        old: "",
        new: "",
      });
      if (err.response.data.msg)
        return showMessage(true, "error-msg", err.response.data.msg);

      showMessage(true, "error-msg", "Error: Please try again");
      setbtnStatus({
        text: "Submit",
        disabled: false,
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name") return setNewName(e.target.value);

    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  const closeWindow = (cat) => {
    if (cat === "name") {
      setNewName("");
      setUpdateNameWindow(false);
      setHideWindow(false);
      return;
    }
    setPasswordData({
      old: "",
      new: "",
    });
    setUpdatePasswordWindow(false);
    setHideWindow(false);
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-box">
          {user && (
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl p-4">
                {polishName(user.name)} Account
              </h1>
              {message.show && <Message />}
              {!hideWindow && (
                <div>
                  <p className="pb-4">
                    <strong>User Id: </strong>
                    {user.userId}.
                  </p>

                  <button
                    className="btn text-sm md:text-base"
                    onClick={() => {
                      setUpdateNameWindow(true);
                      setHideWindow(true);
                      showMessage();
                    }}
                  >
                    Update Username
                  </button>
                  <button
                    className="btn text-sm md:text-base"
                    onClick={() => {
                      setUpdatePasswordWindow(true);
                      setHideWindow(true);
                      showMessage();
                    }}
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
          )}
          {updateNameWindow && (
            <form onSubmit={updateName}>
              <h3 className="text-xl font-heading pb-4">Update Username</h3>
              <AccountFormRow
                name="name"
                type="text"
                value={newName}
                onChangeFunc={handleChange}
              />
              <br />
              <div className="flex justify-between">
                <button
                  className={`${
                    btnStatus.disabled ? "btn-disabled" : "btn-standard"
                  } text-sm sm:text-base !w-[80px]`}
                  disabled={btnStatus.disabled}
                >
                  {btnStatus.text}
                </button>
                <button
                  className="btn-cancel text-sm sm:text-base !w-[80px]"
                  onClick={() => closeWindow("name")}
                  type="submit"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {updatePasswordWindow && (
            <form onSubmit={updatePassword}>
              <h3 className="text-xl font-heading pb-4">Update Password</h3>

              <AccountFormRow
                name="old"
                type="password"
                value={passwordData.old}
                onChangeFunc={handleChange}
              />
              <AccountFormRow
                name="new"
                type="password"
                value={passwordData.new}
                onChangeFunc={handleChange}
              />
              <br />
              <div className="flex justify-between">
                <button
                  className={`${
                    btnStatus.disabled ? "btn-disabled" : "btn-standard"
                  } text-sm sm:text-base !w-[80px]`}
                  disabled={btnStatus.disabled}
                  type="submit"
                >
                  {btnStatus.text}
                </button>
                <button
                  className="btn-cancel text-sm sm:text-base !w-[80px]"
                  onClick={() => closeWindow("pass")}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
