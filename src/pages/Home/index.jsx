import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch, NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { Messages, ChatInput, Status, Sidebar, Navigation } from 'containers';

import { dialogsActions } from '../../redux/actions';

import Chat from '../Chat/Chat';

import './Home.scss';

const Home = (props) => {
  return (
    <section className="home">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home1} />
          <Route path="/chat" component={Chat} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </div>
    </section>
  );
};

export default Home;

const Calendar = () => {
  return (
    <div>
      Calendar page
    </div>
  )
}

const Home1 = () => {
  return (
    <div>
      Home1 page
    </div>
  )
}