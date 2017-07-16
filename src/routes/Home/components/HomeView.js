import React from 'react'
import { connect } from 'react-redux'
//import { Field, reduxForm } from 'redux-form';
import { makeScreenshot } from '../../../store/main'
// import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.go = this.go.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);

        this.state = {
            address: 'https://www.firebox.com',
        }
    }

    go() {
        const { dispatch } = this.props;
        dispatch(makeScreenshot(this.state.address));
    }

    onAddressChange(e) {
        this.setState({ address: e.target.value });
    }

    render() {
        const { dispatch, main} = this.props;
        const src = main.screenshot !== null ? 'data:image/png;base64,'+main.screenshot : null;

        return <div>
            <h2>Take a screenshot!</h2>
            <div>
                <input
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="www.example.com"
                    value={this.state.address}
                    onChange={this.onAddressChange}
                />
            </div>
            <div>
                <button type="submit"
                        onClick={this.go}
                        className="btn btn-primary margin-button">
                    Go on!
                </button>
            </div>

            <div>
                <img src={src} style={{width: '500px'}} ref={img => this.img = img} />
            </div>

            {/*<img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />*/}
        </div>;
    }
}

// export default connect(store => store)(reduxForm({
//     form: 'home',
// })(HomeView))

export default connect(store => store)(HomeView)

