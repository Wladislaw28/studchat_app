import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { Avatar, SignOutModal, CreateNewsModal } from '../../components';
import { CreateNews } from '../';
import { connect } from 'react-redux';
import { dialogsActions } from '../../redux/actions';

import './Navigation.scss';

const Navigation = (props: any) => {
    const { user } = props;
    const [activeNavLink, setActiveNavLink] = React.useState<boolean>(false);
    const [visibleModalSignOut, setVisibleModalSignOut] = React.useState<boolean>(false);

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
                    activeStyle={{ color: `${activeNavLink === true && '#363976'}` }}>главная</NavLink>
                <NavLink onClick={() => { setActiveNavLink(!activeNavLink); }}
                    to="/chat" activeStyle={{ color: `${activeNavLink === true && '#363976'}` }}>общий чат</NavLink>
                {/* <NavLink onClick={() => { setActiveNavLink(!activeNavLink); }}
                    to="/calendar" activeStyle={{ color: `${activeNavLink === true && '#363976'}` }}>календарь</NavLink> */}
            </div>
            <div className="nav__bottomActionButtons">
                <CreateNews />
                <div className="signOut">
                    <button className="actionButton" onClick={() => {
                        setVisibleModalSignOut(!visibleModalSignOut);
                    }}>выйти</button>
                </div>
                {visibleModalSignOut === true && <SignOutModal visible={visibleModalSignOut}
                    setVisible={(arg: boolean) => setVisibleModalSignOut(!arg)} />}
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

