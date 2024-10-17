import Login from "./component/Login";
import Register from "./component/Register";
import FileUpload from "./component/FileUpload";
import HomePage from "./component/HomePage";
import OrgPage from "./component/OrgPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/admin-login' element={<Login role='admin' title='Admin Login' />}/>
          <Route path='/user-login' element={<Login role='user' title='User Login' />}/>
          <Route path='/manager-login'  element={<Login role='manager' title='Manager Login' />}/>

          <Route path='/manager-register' element={<Register role='manager' title='Create Organization Manager'/>}/>
          
          <Route path='/file-upload' element={<FileUpload role="faculty" organization="670f6501a6f72c0d114639ad"/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/organizations' element={<OrgPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
