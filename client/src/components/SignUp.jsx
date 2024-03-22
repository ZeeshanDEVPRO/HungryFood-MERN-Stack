import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SignUp = ({ onClose, setShowLogin, setShowSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, []);

  const changeModal = () => {
    setShowLogin(true);
    setShowSignUp(false);
  }

  const collectData = async () => {
    setLoading(true);
    let type = 'user';
    event.preventDefault();
    try {
      let result = await fetch(`http://localhost:5000/register`, {
        method: 'post',
        body: JSON.stringify({ name, email, password, type }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.warn('1');
      result = await result.json();
      console.warn(result);
      if (result.auth) {
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        setShowSignUp(false);
        setLoading(false);
        window.location = "/";
      } else {
        console.warn('error');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <Button>
      <div className="page">
        <div className='outer'>
          <div >
            <div className='top'>
              <h1>Signup </h1>
              <button id='font' onClick={onClose} ><span className="material-symbols-outlined">
                close
              </span></button>
            </div>

            <div>
              <form>
                <input type='text' placeholder='Name' className='num' value={name} onChange={(e) => { setName(e.target.value) }} required />
                <input type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                <input type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                {loading ? (<button id ='sign' disabled>Signing Up...</button>):
                (<button id='sign' onClick={collectData}>Sign Up</button>)}
                <div className="or">
                  <h1>OR</h1>
                  <div className='google'><img src='https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png' /><div>Sign Up with Google</div></div>
                </div>
              </form>
            </div>
          </div>
          <div className="sec2" style={{ color: 'gray' }}>
            Already registered? <div className="link" onClick={changeModal}>Just Login</div>
          </div>
        </div>
      </div>

    </Button>
  )
}

export default SignUp

const Button = styled.div`
.page {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(4px); 
    display: flex;
    align-items: center;
    justify-content: center;
}

.outer {
    font-family: 'Poppins', sans-serif;
    border-radius: 8px;
    background-color: white;
    width: 60%;
    max-width: 27vw; 
    max-height: 85vh; 
    overflow: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.link{
  color: rgb(239, 79, 95);
  display: inline-block;
  cursor: pointer;
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"]:focus,
input[type="number"]:not(:empty) {
  border-color: blue;
}
.sec2{
  padding: 15px;
  margin-left: 15px;
}
h1{
  color: rgb(79,79,79);
}
.or{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 9px;
}
#sign{
  display: inline-flex;
    vertical-align: middle;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 100%;
    width: 90%;
    min-width: 15rem;
    min-height: 44px;
    line-height: 44px;
    margin-top: 0px;
    margin-left: 0px;
    font-size: 1.6rem;
    font-weight: 300;
    color: rgb(255, 255, 255);
    opacity: 1;
    white-space: nowrap;
    background: border-box rgb(239, 79, 95);
    border-color: rgb(239, 79, 95);
    border-width: 0px;
    border-style: solid;
    border-radius: 0.6rem;
    padding: 0px 1.6rem;
    transition: transform 0.25s ease 0s, opacity 0.25s ease 0s, box-shadow 0.25s ease 0s;
    outline: none !important;
    cursor: pointer;
}
#font{
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
}
.top{
  display: flex;
  justify-content: space-between;
  margin: 18px;
}
input{
  position: relative;
    display: flex;
    width: 82%;
    max-height: 15px;
    padding: 0.8rem;
    font-size: 18px;
    -webkit-box-align: center;
    align-items: center;
    border: 1px solid rgb(207, 207, 207);
    border-radius: 6px;
}
form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.google {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 90%;
    min-width: 16rem;
    min-height: 44px;
    line-height: 44px;
    margin-top: 0px;
    margin-left: 0px;
    font-size: 20px;
    font-weight: 300;
    color: rgb(79, 79, 79);
    white-space: nowrap;
    background: white;
    border: 1px solid rgb(206, 205, 205); 
    border-radius: 6px;
    padding: 0px 1.6rem;
    transition: transform 0.25s ease 0s, opacity 0.25s ease 0s, box-shadow 0.25s ease 0s;
    cursor: pointer;
    gap: 15px;
  }
.google img{
  max-width: 25px;
  max-height: 25px;
}
`;