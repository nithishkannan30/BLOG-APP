import React from 'react';
import './App.css';
import Post from './Post';
import { Route,Routes} from 'react-router-dom';
import Layout from './Layout';
import Indexpage from './Pages/Indexpage';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
         {/* index prop indicates that this route should match the exact root path ("/"). */}
      <Route index element={<Indexpage/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/register' element={<Registerpage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
