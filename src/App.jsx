import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from "react-router-dom";
// import { Provider } from 'react-redux';
import './App.css';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { PostsList } from './features/posts/PostsList';
import { SinglePostPage } from './features/posts/SinglePostPage'
import { UsersList } from './features/users/UsersList';
import { UserPage } from './features/users/UserPage';

function App() {
  return (
      <Router>
        <main>
          <Header title="Muncey Blog" subtitle="Philip Munce" />
          <Navbar />
          <Switch>
            <Route 
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <PostsList />
                </React.Fragment>
              )} />
            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/users/:userId" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
  );
}

export default App;