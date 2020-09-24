import React from 'react';
import './App.css';
import Contact from './component/Contact';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }
  render() {
    return (
      <div className="App">
        <Contact/>
      </div>
    );
  }
}
export default App;
