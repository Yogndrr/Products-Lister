import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./SignUp.css"

const SignUp = ({ setLoggedIn, signed }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fields = { name, email, password };

    const navigate = useNavigate()

    useEffect(() => {
        if (signed) {
            navigate("/profile")
        }
    })

    const submitHandler = (event) => {
        event.preventDefault()

        axios.post("http://localhost:5000/register", fields,
            {
                headers: { "Content-Type": "application/json" }
            })
            .then((result) => {
                resetHandler()
                localStorage.setItem("user", JSON.stringify(result.data))
                setLoggedIn(true)
                navigate("/profile")
                console.log(result)
            })

            .catch((error) => {
                console.error(error)
            })
    }

    // const content = { "Content-Type": "application/json" }
    // const contentType = { headers: content }

    // axios.post("http://localhost:5000/register", fields, contentType)

    const resetHandler = () => {
        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <h1>Register Now</h1>
                <div className="signup-form">
                    <div className="form-field">
                        <span>Name:</span>
                        <input
                            type="text" name="name" placeholder="Enter your name" className="input-field"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required
                        />
                    </div>

                    <div className="form-field">
                        <span>Email:</span>
                        <input
                            type="email" name="email" placeholder="Enter your email" className="input-field"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email" required
                        />
                    </div>

                    <div className="form-field">
                        <span>Password:</span>
                        <input
                            type="password" name="password" placeholder="Enter your password" className="input-field"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" required
                        />
                    </div>

                    <button type="submit" id='signUp'>Sign Up</button>
                    <button id='reset' onClick={resetHandler}>Reset</button>
                    <br />
                    <Link to="/login">Already have an account? Login Now</Link>
                </div>
            </form>
        </>
    );
};

export default SignUp;
