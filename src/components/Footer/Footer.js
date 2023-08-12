import React from "react"
import Fade from '@mui/material/Fade';

const Footer = () => {
    return (<div className="outline">
        <div className="row outline bg-red">
            <Fade bottom>
                <div className="twelve columns">
                    <ul className="social-links"></ul>
                    <ul className="copyright">
                        <li>&copy; Copyright 2023</li>
                        <li>
                            Design by{" "}
                            <a title="Styleshout" href="">
                                Stylesheet
                            </a>
                        </li>
                    </ul>
                </div>
            </Fade>

            <div id="go-top">
                <a className="smoothscroll" title="Back to Top" href="">
                    <i className="icon-up-open"/>
                </a>
            </div>

        </div>
    </div>)
}

export default Footer;