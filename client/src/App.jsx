import React from 'react';
import './App.css';
import Post from './Post';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Indexpage from './Pages/Indexpage';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
import {UserContextProvider} from './Context-api/Usercontext'
import Createpost from './Pages/Createpost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';
function App() {
  return (
    <UserContextProvider> 
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* index prop indicates that this route should match the exact root path ("/"). */}
          <Route index element={<Indexpage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/register' element={<Registerpage />} />
          <Route path='/create' element={<Createpost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
