import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
require('./app.css');

export default class Main extends React.Component {

  componentWillMount = () => {

    if(localStorage.getItem('items'))
    {
      //Do nothing
    }
    else
    {
      const temp=[];
      localStorage.setItem('items', JSON.stringify(temp));
    }    
  }

  render() {
    return (
      <div className='main-container'>
        <ReactCSSTransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
            {this.props.children}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
