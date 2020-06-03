import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Messages, ChatInput, Status, Sidebar, Header } from '../../containers';
import { connect } from 'react-redux';

import './Chat.scss';

import { dialogsActions } from '../../redux/actions';

const Chat = (props) => {
    const { setCurrentDialogId, user } = props;
    useEffect(() => {
        const { pathname } = props.location;
        const dialogId = pathname.split(`${pathname === '/chat'
            ? '/chat'
            : '/chat/dialog/'}`).pop();
        setCurrentDialogId(dialogId);
    }, [props.location.pathname]);

    return (
        <section className="chat__container">
            <div className="chat__header">
                <Header isCompactMode={true} titleLogo="Studchat" />
            </div>
            <div className="chat">
                <Sidebar />
                {user && (
                    <div className="chat__dialog">
                        <Status />
                        <Messages />
                        <div className="chat__dialog-input">
                            <ChatInput />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default withRouter(
    connect(
        ({ user }) => ({ user: user.data }),
        dialogsActions,
    )(Chat),
);
