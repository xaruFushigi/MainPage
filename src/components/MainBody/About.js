import React from 'react';
import Fade from '@mui/material/Fade';

const About = () => {
    return (
        <div>
            <section id="about">
                <Fade in={true} timeout={1000}>
                    <div>
                        <div className="three columns">
                            <img className="profile-pic"
                                src="URL_OF_YOUR_IMAGE"
                                alt="Profile" />
                        </div>
                        <div className="nine columns main-col">
                            <h2>About Me</h2>
                            <p>Biography</p>
                        </div>
                    </div>
                </Fade>
            </section>
        </div>
    );
}

export default About;
