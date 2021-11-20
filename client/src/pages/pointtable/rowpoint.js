import React, { useState, useEffect } from 'react'
import "./rowpoint.css"
import {axiosInstance} from "../../config";
import { useLocation } from "react-router";
const Rowpoint = () => {
    const [profilepic, setProfilepic] = useState();
    const [username, setusername] = useState();
    const [points, setpoints] = useState();
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    const PF = "http://localhost:5000/images/"
    const colors = ["rgba(202, 12, 12, 0.5)", "rgba(12, 142, 202, 0.8)", "rgba(12, 202, 69, 0.5)"]
    const Rankcolors = ["red", "blue", "orange"]

    const getColor = ((i) => {

        return colors[i % 3];
    })
    const getRankColor = ((i) => {
        console.log(Rankcolors[i % 3]);

        return Rankcolors[i % 3];
    })

    useEffect(() => {
        let ignore = false;

        if (!ignore) fetchPosts()
        return () => { ignore = true; }
    }, []);
    const fetchPosts = async () => {
        const res = await axiosInstance.get("/api/users/rank")
        setPosts(res.data);
        console.log(res.data);
    };




    return (
        <div className="Acontainer">
            <div className="Amaincontainer">
            <div className="pointsa game-button red">
                Points Arena
            </div>
                <div className="arank"></div>
                {posts.map((p, i) => (
                    <div className="mt" style={{ backgroundColor: getColor(i) }}>
                        <div className={ ` "aprank ${getRankColor(i)}  game-button }"`  }  > #{i + 1}</div>
                        {/* <div className={`"aprank game-button ${getRankColor(i)}" `} >#{i + 1}</div> */}
                        <div className="alogo">
                            <img className="userlogo" src={PF + p.profilePic} alt="" srcset="" />
                        </div>



                        <div className="ausername">{p.username}</div>
                        {/* <div className="aresult">
                            <span className="m1 match">W</span>
                            <span className="m2 match">L</span>
                            <span className="m3 match">W</span>
                            <span className="m4 match">W</span>
                            <span className="m5 match">L</span>

                        </div> */}
                        <div className="apoint">{p.points} Points</div>
                        <div className="achallenge">
                            <button className="a"> Challenge</button>
                        </div>



                    </div>
                )

                )}

            </div>



        </div>
    )
}

export default Rowpoint
