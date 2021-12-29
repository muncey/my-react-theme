import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './views/Home';
import Users from './views/Users';
import PostView from './views/PostView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />}/>
          <Route path="/posts/:postId" element={<PostView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;