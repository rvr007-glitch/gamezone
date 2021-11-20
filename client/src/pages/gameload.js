import React from 'react'
import "./gameload.css"

const gameload = () => {
    return (
        <div>
          <div className="container">
        <div className="banner">
            <div className="heading">
                <h1 className="title"></h1>
            </div>
            <div className="box">
                <div className="lbox">
                    <img className="avtar" src="av1.jpg" alt="" srcset=""/>
                </div>




                <div className="rbox">
                    <img className="avtar" src="av2.jpg" alt="" srcset=""/>
                </div>

            </div>
            <div className="name">
                <h1 className="username fir">
                    HASHIRAMA
                </h1>

                <h1 className="username sec">
                    MADARA
                </h1>
            </div>
            <div className="loading">
                <div className="percent">
                    100%
                </div>

                <div className="progress-bar">

                    <div className="progress">
                        <div className="text">Completed</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>   
      
    )
}

export default gameload
