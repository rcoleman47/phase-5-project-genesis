import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Subcontractors from './Subcontractors';
import '../App.css';



function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Registration /> } />
        
        <Route path='/' element={ <Home /> } >
          <Route path='dashboard' element={ <Dashboard /> } />
          <Route path='projects' element={ <Projects /> } />
          <Route path='subcontractors' element={ <Subcontractors /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
