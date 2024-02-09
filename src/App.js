import React, { useState } from 'react';
import './App.css';
import TextForm from './components/TextForm';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
        <Alert alert={alert} />
        <div className="container my-3">
            <TextForm showAlert={showAlert} heading="Visualize, Craft, Enhance Text."/>
        </div>
    </>
  );
}

export default App;

// Made with ❤️
// Krishna Balasara 




