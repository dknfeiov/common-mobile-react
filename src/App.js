import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Record from './views/record';
import {Tabs, Badge} from 'antd-mobile';

// ReactDOM.render(<Button>Start</Button>, mountNode);

class App extends Component {

  constructor() {
    super();
    this.tabs = [
      { title: <Badge text={'3'}>日常任务</Badge> },
      { title: <Badge text={'今日(20)'}>社区</Badge> },
      { title: <Badge dot>我的</Badge> },
    ];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="body">
          <Record></Record>
        </div>
        <Tabs tabs={this.tabs} tabBarPosition='bottom'
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
        </Tabs>
      </div>
    );
  }
}

export default App;
