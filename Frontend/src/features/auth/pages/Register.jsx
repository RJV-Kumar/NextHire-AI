import { useState } from 'react';
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password})
        navigate('/')
    }
    
    if(loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className='form-container'>
                <div className='auth-brand'>
                    {/* <span className='auth-brand__mark'>NH</span> */}
                    <div>
                        <p className='auth-brand__eyebrow'>NextHire AI</p>
                        <h1>Register</h1>
                    </div>
                </div>
                <p className='auth-brand__copy'>Create your profile and start generating interview plans in minutes.</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor='username'>Username</label>
                        <input 
                            onChange={(e) => { setUsername(e.target.value) }}
                            type='text' id="username" name='username' placeholder='Enter username' />
                    </div>
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
                    <button className='button primary-button'>Register</button>
                </form>
                <p style={{ color: '#9aa4b2' }}>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register