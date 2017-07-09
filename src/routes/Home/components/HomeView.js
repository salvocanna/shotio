import React from 'react'
import { connect } from 'react-redux'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { makeScreenshot } from '../../../store/main'

class HomeView extends React.Component {
    render() {
        const { dispatch } = this.props;
        return <div>
            <h4 onClick={()=> {
                dispatch(makeScreenshot());
            }}>Welcome!</h4>
            <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
        </div>;
    }
}

export default connect(store => store)(HomeView)

