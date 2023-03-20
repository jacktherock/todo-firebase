import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            window.M.toast({ html: `Welcome! ${result.user.email}`, classes: "green darken-2" })
            navigate('/dashboard')
        } catch (err) {
            window.M.toast({ html: err.message, classes: "red darken-2" })
        }
    }

    return (
        <div className='container center'>
            <h3>Login</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn blue waves-effect waves-light">
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
            <p>Don't have account? <Link to="/signup"> Create account </Link>now</p>
        </div>
    )
}

export default Login