import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  return (
    <Button>
      <div className="intro">
        <div className='topper'>
          <div className="myTitle">HungryFood</div>
          <div className='home' onClick={() => { auth ? navigate('/') : navigate('/home') }}>home</div>
          <div className="home"><a style={{ textDecoration: "none", color: "white" }} href='https://mail.google.com/mail/u/0/#inbox'>contact</a></div>
        </div>
        <div className='foot'>Better food for more people</div>


      </div>
      <div className="heading">About Us</div>

      <div className="details">
        <div className='head'>Driving the force of <span>assortment</span></div>
        <div>For over a decade now, we’ve been empowering our customers in discovering new tastes and experiences across countries. By putting together meticulous information for our customers, we enable them to make an informed choice.</div>
      </div>
      <div className="project">
        <div className='head2'>Who am I ?</div>
        <div className="wrap">
          <p>I am <span className='name'>Zeeshan Sayeed</span>, an undergraduate B.Tech student in <span className='name'>NIT ROURKELA</span>. I am currently a sophomore.I am well versed and passionate about coding. My skills include <span className='name'>DSA in C++, MERN stack development and Blockchain Development</span>. I am also interested in python and data science. I would look forward to gain experience in internships in big tech companies and new age startups. Check the links in the footer to reach me. </p>
          <img src='https://www.nitrkl.ac.in/assets/images/about-banner.jpg' alt='image hidden' />
        </div>
      </div>
    </Button>
  )
}

export default About;

const Button = styled.div`
  margin-bottom: 10vh;
  font-family: 'Poppins', sans-serif;
  .foot{
    margin-bottom: 18vh;
  }
 .topper{
  display: flex;
  gap:5vw;
  padding-top: 5vh;
 
 }
.myTitle{
  font-family: 'Poppins', sans-serif;
  font-family: 'Protest Riot', sans-serif;
  font-size: 30px;
  font-weight: 550;
}
.home{
  font-size: 23px;
  font-weight: 200;
  cursor:pointer;
}
  .intro {
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.hsedocs.com/_data/blogs/NTM=.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 130vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5vw;
  padding-left: 5vw;
  color: white;
  font-size: 45px;
  font-weight: 550;
  text-align: center;
  margin-bottom: 5vh;
}

  .name {
    font-weight: 1000;
  }

  img {
    max-width: 40vw;
    max-height: fit-content;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
  }

  .wrap {
    display: flex;
    gap: 10vw;
    font-weight: 100;
  }

  .head2 {
    color: rgb(22, 19, 20);
    font-weight: 600;
    font-size: 40px;
    display: flex;
    justify-content: flex-start;
    margin-top: 10vh;
  }

  .project {
    margin-left: 20vh;
    margin-right: 20vh;
  }

  .heading {
    color: rgb(22, 19, 20);
    font-weight: 600;
    font-size: 40px;
    display: flex;
    justify-content: center;
    padding-top: 3vh;
  }

  .details {
    margin-left: 20vh;
    margin-right: 20vh;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;
  }

  .head {
    font-weight: 400;
    font-size: 35px;
  }

  span {
    color: rgb(239, 79, 95);
  }
`;
