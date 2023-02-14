import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return (
        <div className="login-form">
            <input
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="btns">
                <button className="btn__login" onClick={() => store.login(email, password)}>
                    Login
                </button>
                <button className="btn__register" onClick={() => store.register(email, password)}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default observer(LoginForm);
