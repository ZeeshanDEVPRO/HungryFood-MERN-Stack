import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CgProfile } from "react-icons/cg"
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const PartnerProfile = ({ onClose, setShowProfile }) => {
    const [name, setName] = useState("Zeeshan Sayeed");
    const [email, setEmail] = useState("zeeshansayeedindia@gmail.com");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem('partner');
        navigate('/home');
    };

    return (
        <Button>
            <div className="pagebox">
                <div className="cardbox">
                    <div className="topbox">
                        <div className="title">Profile</div>
                        <div className="cross" onClick={onClose}><ImCross /></div>
                    </div>
                    <div className="img"><CgProfile /></div>
                    <div className="data">
                      
                        <div className="name">{name}</div>
                        <div className="email">{email}</div>
                        <div className="logout" onClick={logout}>Logout</div>
                    </div>
                </div>
            </div>
        </Button>
    )
}

export default PartnerProfile

const Button = styled.div`
font-size: 21px;

.pagebox {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5vh;
   
  }
  .data{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2vh;
  }
  .cross{
    cursor:pointer;
    font-size: 22px;
  }
.topbox{
    display: flex;
    justify-content: space-between;
}
  .cardbox{
    height: 60vh;
    width:25vw;
    border-radius: 4px;
    background-color: white;
    padding: 4vh;
  }
  .img{
    display:flex;
    justify-content: center;
    font-size:130px;
    padding: 20px;
    margin: 10px;
    background-color: #cfcfcf;
  }
  .logout{
    display: flex;
    justify-content: center;
    color:white;
    background-color: #ff4545;
    border-radius: 5px;
    cursor:pointer;
    padding: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;