import {Routes,Route} from 'react-router-dom';
import './App.css';

import Login from './components/login';
import Signup from './components/signup';

import All from './components/All';
import Protected from './Protected';


function App() {
  return (
    <div className="App">
    <Routes>
        <Route  path = '/' element = {<Protected Component = {<All/>}/>}/>
        <Route  path = '/login' element = {<Login/>}/>
        <Route  path = '/signup' element = {<Signup/>}/>

      

      </Routes>
    </div>
  );
}

export default App;
