import React from 'react'
import "./profile.css"

import { useLocation } from "react-router";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import {axiosInstance} from "../config";
import { Link } from 'react-router-dom';




const Profile = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"
    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied!');
            alert("Link Copied!")
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
        };
        if (file) {

            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axiosInstance.post("/upload", data);

            } catch (err) {

            }
        }
        try {

            const res = await axiosInstance.put("/users/" + user._id, updatedUser);
            console.log(res);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            console.log(updatedUser);
            console.log("dgdggdg");
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];

    };



    return (
        <div>
            <div className="AR_navbar game-button orange">
                <div className="AR_logo"></div>
                <div className="AR_ku">

                    <Link to={"/"} style={{ textDecoration: "none" }}> <span className="span">Play</span></Link>
                    <Link to={"/points"} style={{ textDecoration: "none" }}> <span className="span">Points</span></Link>
                    <span className="span" onClick={() => copyToClipBoard('some text to copy')}>Invited</span>
                    <Link to={"/points"} style={{ textDecoration: "none" }}> <span className="span">About Us</span></Link>
                </div>


            </div>
            <div className="parentdiv">
                <a href={"https://youtu.be/sWoSZmHsCls"} style={{ textDecoration: "none" }}>
                    <div className="instruct game-button red">
                        <span className="span">How to Play ?</span>
                    </div>
                </a>
                <div className="box">

                    <div className="photo-wrap">

                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} className="box-img2" />
                        <div className="Sbtns">
                            <button className="game-button blue addphoto" onClick={handleClick}>Update
                                <input
                                    className="game-button red"
                                    type="file"
                                    id="fileInput"
                                    ref={hiddenFileInput}
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />

                            </button>

                            <button className="game-button green addphoto" onClick={handleSubmit}>Save


                            </button>
                        </div>
                    </div>
                    <h1>
                        {user.username} </h1>
                    {/* <h3 className="h3">

                    credits <button className="game-button red credits">+

                    </button></h3> */}
                    <h3 className="Apoints">

                        Points <div className="game-button red Spoints">{user.points}

                        </div></h3>

                    {/* 
                <h5>
                    Player Lvl-9</h5> */}
                    <p className="global" style={{ color: "white" }} >
                        Global Rank NA</p>


                </div>
            </div>
            <div className="headran">
                <h5>Ranking and Rating</h5>
            </div>
            <div className="container">

                <div className="ct">
                    <h1 className="rank">NA</h1>
                    <h5 className="rankt">Tournament : Rise </h5>

                </div>
                <div className="ct">
                    <h1 className="rank">NA</h1>
                    <h5 className="rankt">Tournament : Pekasoo </h5>
                </div>
                <div className="ct">
                    <h1 className="rank">NA</h1>
                    <h5 className="rankt">Tournament : Rizen </h5>
                </div>
                <div className="ct">
                    <h1 className="rank">NA</h1>
                    <h5 className="rankt">Tournament : Hell High </h5>
                </div>

            </div>

        </div>
    )
}

export default Profile
