import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import { useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const [mode,setMode] = useState('light');
  const [alert,setAlert] = useState(null);

  const showAlert = (message,type)=>{
      setAlert({
        msg : message,
        type : type
      })
      setTimeout(() => {
        setAlert(null)
      },2000)
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#212529';
      showAlert("DarkMode has been Enabled !","success");
      // setInterval(() => {
      //   document.title = 'TextUtils is Amazing !';
      // },2000);
      // setInterval(() => {
      //   document.title = 'Install TextUtils Now !';
      // }, 1500);
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("LightMode has been Enabled !","success");
    }
  }

  return (
    <>
    <Router>
      <Navbar title = "TextUtils" about = "About TextUtils" mode = {mode} togglemode = {toggleMode}/>
      <Alert alert = {alert}/>
      <div className = "container my-3">
      {/* <About/> */}
      <Switch>
          <Route exact path="/about">
            <About mode = {mode}/>
          </Route>
          <Route exact path="/">
            <TextForm heading = "Enter the Text Here to Analyze" mode = {mode} showAlert = {showAlert}/>
          </Route>
        </Switch>
      </div>
      </Router>
    </>
  );
}

export default App;
