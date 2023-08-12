import React from "react";
import "./Navbar.css";
import ParticlesBg from "particles-bg";
import Fade from '@mui/material/Fade';
const Navbar = () => {
    return(
        <div className="outline">
          {/* <ParticlesBg bg={true} type="custom" color="#00F" num={1} /> */}
            <div className="home flex justify-center">
                <ul id="nav" className="nav flex flex-row">
                    <li className="current ml2">
                        <a className="smoothscroll" href="#home">
                            Home
                        </a>
                    </li>

                    <li className="ml2">
                        <a className="smoothscroll" href="#about">
                            About
                        </a>
                    </li>

                    <li className="ml2">
                        <a className="smoothscroll" href="#portfolio">
                            Works
                        </a>
                    </li>

                    <li className="ml2">
                        <a className="smoothscroll" href="#contact">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>

            <div className="row banner" >
                <div className="banner text">
                    <Fade bottom >
                        <h1 className="responsive-headline">name</h1>
                    </Fade>
                    s
                    <Fade bottom duration={1200} >
                        <h3>description</h3>
                    </Fade>
                    <hr />
                    d
                    <Fade bottom duration={2000}>
                        <ul className="social">
                            <a href="" className="button btn project-btn">
                                <i className="fa fa-book"></i> Project
                            </a>
                            <a href="" className="button btn github-btn">
                                <i className="fa fa-github"></i> Github
                            </a>
                        </ul>
                    </Fade>

                    <p className="scrolldown">
                        <a className="smoothscroll" href="#about">
                            <i className="icon-down-circle"/>
                        </a>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Navbar;