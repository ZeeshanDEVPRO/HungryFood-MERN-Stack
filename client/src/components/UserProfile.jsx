import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgProfile } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);
  
  const fetchProfile = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        console.log('User data:', userData);
        const user = JSON.parse(userData);
        if (user && user.name) {
          setName(user.name);
        } else {
          console.error('Name not found in user data');
        }
        if (user && user.email) {
          setEmail(user.email);
        } else {
          console.error('Email not found in user data');
        }
      } else {
        console.error('User data not found in localStorage');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  };
  

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/home');
  };

  return (
    <Button>
      <div className="page">
        <div className="card">
          <div className="top">
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

export default UserProfile;

const Button = styled.div`
  font-size: 25px;

  .page {
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

  .cross {
    cursor: pointer;
    font-size: 22px;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  .card {
    height: 60vh;
    width: 25vw;
    border-radius: 4px;
    background-color: aliceblue;
    padding: 4vh;
  }

  .img {
    display: flex;
    justify-content: center;
    font-size: 130px;
    padding: 20px;
    margin: 10px;
    background-color: #cfcfcf;
  }

  .logout {
    display: flex;
    justify-content: center;
    color: white;
    background-color: #ff4545;
    border-radius: 5px;
    cursor: pointer;
    padding: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;
