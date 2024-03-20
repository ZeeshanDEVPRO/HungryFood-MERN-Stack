import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import PartnerLogin from './PartnerLogin';


const Nav = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showPartner, setShowPartner] = useState(false);
    const navigate = useNavigate();


    const aboutPage = () => {
        navigate('/about');
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
        document.body.style.overflow = 'hidden';
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setShowSignUp(false);
        setShowLogin(false);
        setShowPartner(false);
        document.body.style.overflow = 'auto';
    };

    const partnerLogin = () => {
        setShowPartner(true);
        document.body.style.overflow = 'hidden';
    }

    return (
        <Button>
         
            <div className="container">
                <div className="intro">
                    <ul className="nav-ul nav-right">
                        <li onClick={handleSignUpClick}>SignUp</li>
                        <li onClick={handleLoginClick}>Login</li>
                        <li onClick={aboutPage}>About Us</li>
                        <li onClick={partnerLogin}>Partner</li>
                    </ul>
                    <div className="title">HungryFood</div>
                    <div className="supporter">
                        Discover the best food & drinks near you
                    </div>
                    <div className="supporter">
                        <div>24*7 Delivery at your doorstep</div>
                        <img
                            className="delicon"
                            src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp"
                        />
                    </div>
                </div>
            </div>
    
            {showSignUp && (
                <SignUp onClose={handleCloseModal} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
            )}
            {showLogin && (
                <Login onClose={handleCloseModal} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
            )}
            {showPartner && (
                <PartnerLogin onClose={handleCloseModal} setShowPartner={setShowPartner}/>
            )}
        </Button>
    );
};

export default Nav;

const Button = styled.div`
margin-bottom: 8vh;
    .delicon {
        max-height: 65px;
    }

    .nav-ul {
        scroll-behavior: auto;
    }

    .title {
        font-family: 'Poppins', sans-serif;
        font-family: 'Protest Riot', sans-serif;
        font-size: 70px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 80px;
    }

    .supporter {
        font-family: 'Poppins', sans-serif;
        color: white;
        font-size: 35px;
        display: flex;
        justify-content: center;
        margin-top: 5vh;
    }

    .intro {
        background-image: url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png');
        min-height: 80vh;
        max-width: 100vw;
        color: white;
    }

    ul {
        list-style-type: none;
        margin: 0;
        display: flex;
        justify-content: flex-end;
        gap: -15vw;
    }

    ul li {
        padding: 20px;
        margin: 15px;
        padding-right: 60px;
        font-size: 18px;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
    }

    ul li a {
        text-decoration: none;
        color: white;
    }

    body.modal-open {
        overflow: hidden;
    }
`;
