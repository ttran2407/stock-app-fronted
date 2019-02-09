
import React from 'react'
import WelcomeContainerContent from '../components/WelcomeContainerContent'
import { CSSTransition } from 'react-transition-group';

class WelcomeContainer extends React.Component {

  render (){


    return (
      <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="fade"
          >
        <WelcomeContainerContent/>
      </CSSTransition>
    )
  }
}

export default WelcomeContainer
