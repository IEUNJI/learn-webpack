import React from 'react';

class App extends React.Component {

  state = {
    val: ''
  };

  change = e => {
    console.log('change');
    this.setState({
      val: e.target.value
    });
  }

  render() {
    return (
      <div>
        App
        <input type="text" value={this.state.val} onChange={this.change} />
      </div>
    );
  }
}

export default App;
