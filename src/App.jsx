import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import BlogHeader from './components/BlogHeader';
import BlogNav from './components/BlogNav';
import About from './Views/About';
import Home from './Views/Home';
import Page from './Views/Page';
import Post from './Views/Post';
import Posts from './Views/Posts';

function App() {
  return (
    <Provider>
      <Router>
        <main>
          <BlogHeader title="Muncey Blog" subtitle="Philip Munce" />
          <BlogNav />
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/page" exact component={Page} />
            <Route path="/post" exact component={Post} />
            <Route path="/posts" exact component={Posts} />
          </Switch>
        </main>
      </Router>
    </Provider>
  );
}



export default App;