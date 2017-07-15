import React from 'react'
import { connect } from 'react-redux'
//import { Field, reduxForm } from 'redux-form';
import { makeScreenshot } from '../../../store/main'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.go = this.go.bind(this);
    }
    go() {
        const { dispatch } = this.props;
        console.info("Going!", this.c.value);
        dispatch(makeScreenshot(this.c.value));
    }
    render() {
        const { dispatch } = this.props;
        return <div>
            <h4>Welcome!</h4>
            <div>
                <label>Screenshot ya?</label>
                <div>
                    <input
                        name="address"
                        type="text"
                        placeholder="url"
                        value="https://www.firebox.com"
                        ref={c => this.c = c}
                    />
                </div>
            </div>
            <button type="submit" onClick={this.go}>Go on!</button>

            <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
        </div>;
    }
}

// export default connect(store => store)(reduxForm({
//     form: 'home',
// })(HomeView))

export default connect(store => store)(HomeView)

