import React from 'react';
import MyAppBar from './components/MyAppBar'
import LeftMenu from "./components/LeftMenu"
import './App.css';

class App extends React.Component {
  state ={
    leftDrawerOpen: false,
    page: "nothing",
  }

  toggleLeftMenu = (open) => {
    this.setState({
      leftDrawerOpen: open,
    });
  }

  selectMenu = (page)=>{
    this.toggleLeftMenu(false);
    // change content
    this.setState({page: page})
  }

  render() {
    return (
      <div className="App">
        <MyAppBar title="gcoka Playground" onClickMenu={()=>this.toggleLeftMenu(true)} />
        <LeftMenu
          open={this.state.leftDrawerOpen}
          handleClose={()=>this.toggleLeftMenu(false)}
          handleSelectMenu={this.selectMenu}></LeftMenu>
        <p className="App-intro">
          {this.state.page} is Selected!
        </p>
      </div>
    );
  }
}

export default App;
