import { Link, useNavigate } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    if(loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className='form-container'>
                <div className='auth-brand'>
                    {/* <span className='auth-brand__mark'>N</span> */}
                    <div>
                        <p className='auth-brand__eyebrow'>NextHire AI</p>
                        <h1>Login</h1>
                    </div>
                </div>
                <p className='auth-brand__copy'>Pick up your interview prep where you left off.</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor='email'>Email</label>
                        <input 
                            onChange={(e) => { setEmail(e.target.value) }}
                            type='email' id="email" name='email' placeholder='Enter your email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'>Password</label>
                        <input 
                            onChange={(e) => { setPassword(e.target.value) }}
                            type='password' id="password" name='password' placeholder='Enter your password' />
                    </div>
                    <button className='button primary-button'>Login</button>
                </form>
                <p style={{ color: '#9aa4b2' }}>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login