import React, {useState} from 'react';
import './App.css';
import { useRef } from 'react';
import axios from 'axios'
import jwt from 'jwt-decode'


function App() {
  const formRef = useRef(null);
  const [userRole, setData1] = useState('');
  const [userName, setData2] = useState('');
  const [isCorrect, setIsCorrect] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    const loginData = {
      login: formData.get("login"),
      password: formData.get("password")
    };

    axios.post(`http://localhost:3000/auth/login`, {
      username: loginData.login,
      password: loginData.password
    })
      .then(res => {
        const token = res.data.token;
        const user = jwt(token); 
        setData1(user.role);
        setData2(user.username);
        setIsCorrect('success');
        console.log(token);
      })
      .catch(error => {
        console.error(error);
        setIsCorrect('error');
      });
     
  }

  const handleRegistration = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    const registerData = {
      login: formData.get("login"),
      password: formData.get("password")
    };

    axios.post(`http://localhost:3000/auth/registration`,{
      username: registerData.login,
      password: registerData.password
    });

    console.log(registerData); 
  }

  

  return (
    <div className="subscribe-container">
      <form className="main_form" ref={formRef}>
        <input type="text" id="login" name="login" placeholder="Login"/><br/><br/>

        <input type="password" id="password" name="password" placeholder="Password"/><br/><br/>
      
        <button type="submit" name="action" value="login" className="btn" onClick={handleSubmit}>Login</button>
        <button type="submit" name="action" value="register" className="btn" onClick={handleRegistration}>Register</button>



        
      </form>
      {isCorrect === "success" ?
       <h2 className='login_message success'>Вхід успішний. Ласкаво просимо, {userName.toString()}. Ваша роль: {userRole.toString()} </h2> 
       :
       isCorrect === "error" ? <h2 className='login_message error'>Неправильний логін чи пароль. Спробуйте ще раз</h2> 
       :
        null}
    </div>
  );
}

export default App;
