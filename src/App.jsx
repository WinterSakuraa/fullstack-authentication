import React, { useContext, useEffect, useState } from 'react';
import UserService from './services/user-service';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    const getUsers = async () => {
        try {
            const res = await UserService.fetchUsers();
            setUsers(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    if (store.isLoading) {
        return <h1 className="loading">Loading...</h1>;
    }

    if (!store.isAuth) {
        return <LoginForm />;
    }

    return (
        <div className="App">
            <h1>User authorized with email: {store.user.email}</h1>
            <h1>{store.user.isActivated ? 'Account is activated' : 'ACTIVATE ACCOUNT'}</h1>

            <button onClick={() => store.logout()}>Logout</button>
            <button onClick={getUsers}>Get users</button>

            <div className="users-list">
                {users.map((user) => (
                    <div className="users-list__item" key={user.email}>
                        {user.email}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default observer(App);
