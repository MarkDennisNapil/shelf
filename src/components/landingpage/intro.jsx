import React from "react";

export default class Introduction extends React.Component {
    render(){
        return(
            <div className="intro-container">
                <div className="intro-graphic"></div>
                <div className="intro-text">
                    <h1>Welcome to Shelf</h1>
                </div>
            </div>
        )
    }
}