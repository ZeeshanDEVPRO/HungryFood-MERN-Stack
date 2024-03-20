import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const Footer = () => {
const navigate = useNavigate();

  return (
    <Sutton>
      <div className="title">HungryFood</div>
      <div className="content">
        <div className="info">
          <div className="tit" onClick={()=>{navigate("/about")}}>INFOVERSE</div>
          <div className="sub" onClick={()=>{navigate("/about")}}>About Us</div>
          <div className="sub" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Careers</div>
          <div className="sub" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Blog</div>
          <div className="sub" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Contact Us</div>
          <div className="sub" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>FAQ</div>
          <div className="sub" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Help Center</div>
        </div>
        <div className="hungry">
          <div className="tit">HUNGRYVERSE</div>
          <div className="sub">Veg Basket</div>
          <div className="sub">PizZa Gang</div>
          <div className="sub">Cookie Story</div>
        </div>
        <div className="partner">
          <div className="tit">PARTNER</div>
          <div className="sub">Become a Partner</div>
          <div className="sub">Partner Login</div>
          <div className="sub">Partner Portal</div>
          <div className="sub">Partner Programs</div>

        </div>
        <div className="learn">
          <div className="tit">LEARN</div>
          <div className="sub">Courses</div>
          <div className="sub">Tutorials</div>
          <div className="sub">Community</div>
        </div>
        <div className="links">
          <div className="tit">SOCIAL LINKS</div>
          <div className="link">
            <a href='https://www.instagram.com/zeeshan_s_india?igsh=cjB6dDZ4NHllY2F4' ><img src='https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Instagram_svg-512.png' alt='image hidden' /></a>
            <a href='https://twitter.com/Zeeshan71276394?s=09'><img src='https://cdn2.iconfinder.com/data/icons/social-media-2421/512/Twitter-256.png' alt='image hidden' /></a>
            <a href='https://linkedin.com/in/zeeshan-sayeed-18a76120a'><img src='https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-512.png' alt='image hidden' /></a>
            <a href='https://github.com/ZeeshanDEVPRO'><img src='https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png' alt='image hidden' /></a>
          </div>
          <button className='btn'><img src='https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png' alt='image hidden' /></button>
          <button className='btn' ><img src='https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png' alt='image hidden' /></button>
        </div>
      </div>
      <hr />
      <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © HungryFood™ Ltd. All rights reserved.</p>
    </Sutton>
  )
}

export default Footer

const Sutton = styled.div`
background-color: rgb(243, 240, 241);
max-width: 100vw;
border: none;
padding-left: 10vw;
padding-right: 10vw;
padding-top: 5vh;
padding-bottom: 5vh;
font-family: 'Poppins', sans-serif;
.btn{
  cursor: pointer;
}
button{
  border: none;
}
button img{
  min-width: 140px;
  min-height: 40px;
}
.sub{
  cursor:pointer;
  color: rgb(105, 96, 96);
}
img{
  max-width: 20px;
  max-height: 20px;
  margin: 4px;
}
.content{
  display: flex;
  justify-content: space-between;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.tit{
  color: rgb(43, 32, 32);
  font-size:17px;
  margin-bottom: 2vh;
}
p{
  font-weight: 100;
}
.title{
  display: flex;
  justify-content: flex-start;
  font-family: 'Poppins', sans-serif;
  font-family: 'Protest Riot', sans-serif;
  font-size: 40px;
  font-weight: 300;
}
.links{
  display: flex;
  flex-direction: column;
}
.link{
  margin-bottom: 3vh;
}
`;