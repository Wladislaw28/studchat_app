import React from 'react';
import { News, Header } from '../../containers';

import './Main.scss';

const Main = () => {
    return (
        <div className="main">
            <div className="main__container">
                <Header isCompactMode={false} />
                <div className="main__container-news">
                    <News />
                </div>
            </div>
        </div>
    );
}

export default Main;