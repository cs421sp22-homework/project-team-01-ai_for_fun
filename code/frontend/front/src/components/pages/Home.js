import React from "react";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


export const Home = () => {
    return (
        <div>
            <header>
                <h1 >AI FOR FUN</h1>
                <p>This is an applicaiton that would like to implement AI model in human face, for bring fun exprience to you.</p>
                <Link to="https://github.com/Joeyryanbridges">
                    <image src="./image/bl.png" className="githubIcon" />
                </Link>
            </header>
        </div>
    );
};