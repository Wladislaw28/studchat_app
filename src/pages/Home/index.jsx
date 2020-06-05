import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Navigation } from 'containers';
import Chat from '../Chat/Chat';
import Main from '../Main/Main';
import { CurrentNews } from '../../containers';

import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/chat" component={Chat} />
          <Route path={`/news`} component={CurrentNews} />
        </Switch>
      </div>
    </section>
  );
};

export default Home;