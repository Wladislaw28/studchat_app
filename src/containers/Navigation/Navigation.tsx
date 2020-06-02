import React from 'react';
import { Route, Switch, NavLink, withRouter } from "react-router-dom";
import { Avatar } from '../../components';

import './Navigation.scss';
import { connect } from 'react-redux';
import { dialogsActions } from '../../redux/actions';

const Navigation = (props: any) => {
    const { user } = props;
    const [activeNavLink, setActiveNavLink] = React.useState<boolean>(false);

    return (
        <div className="nav">
            <div className="nav__user">
                {!!user &&
                    <>
                        <Avatar user={user} />
                        <h1>{user.fullName}</h1>
                    </>
                }
            </div>
            <div className="nav__links">
                <NavLink onClick={() => { setActiveNavLink(!activeNavLink); }} to="/"
                    activeStyle={{ color: `${activeNavLink === true && '#1890ff'}` }}>главная</NavLink>
                <NavLink onClick={() => { setActiveNavLink(!activeNavLink); }}
                    to="/chat" activeStyle={{ color: `${activeNavLink === true && '#1890ff'}` }}>общий чат</NavLink>
                <NavLink onClick={() => { setActiveNavLink(!activeNavLink); }}
                    to="/calendar" activeStyle={{ color: `${activeNavLink === true && '#1890ff'}` }}>календарь</NavLink>
            </div>
            <div className="nav__bottomActionButtons">
                <div className="addNews">
                    +
                </div>
                <div className="signOut">
                    <button className="actionButton" onClick={() => {
                        localStorage.clear();
                        location.reload()
                    }}>выйти</button>
                </div>
            </div>
        </div>
    )
};

export default withRouter(
    connect(
        ({ user }: any) => ({ user: user.data }),
        dialogsActions,
    )(Navigation),
);

