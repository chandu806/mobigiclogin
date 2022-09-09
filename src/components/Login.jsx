import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './Login.module.css'

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    //to handel all onChanges of signup page.
    const handleOnChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.className]: e.target.value,
        })
    }

    //to handel signup page.
    const handeleSignin = async (e) => {
        e.preventDefault()

        console.log(userDetails)

        // posting the userdetails to server via REST api
        let result = await fetch('https://loginfr.herokuapp.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails)
        })
        result = await result.json();

        if (result.status) { // if submitted successfully
            alert(result.message);
            localStorage.setItem('token', JSON.stringify(result.token))
            navigate(`/${result.id}`)
        } else {
            alert('username or password is incorrect!');
        }
       
    }

    return (
        <div className={styles.signupDiv}>

            <form className={styles.form} onSubmit={handeleSignin}>
                <div className={styles.form__body}>
                    <div className={styles.form__title}>
                        <p>Login Page</p>
                    </div>
                    <div className={styles.email}>
                        <label className={styles.form__label} htmlFor="userMail">User Email </label>
                        <input type="text" className='email' onChange={handleOnChange} required />
                    </div>
                    <div className={styles.password}>
                        <label className={styles.form__label} htmlFor="password">Password </label>
                        <input type="text" className='password' onChange={handleOnChange} required />
                    </div>
                    <div className={styles.footer}>
                        <input type="submit" className={styles.btn} value="Login" />
                    </div>
                    <p>Not a user? <span className={styles.navRegister} onClick={() => { navigate('/register') }}>Sign up </span> </p>
                </div>
            </form>
        </div >
    )
}

export default Login