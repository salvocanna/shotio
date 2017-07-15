import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { makeScreenshot } from '../../../store/main'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends React.Component {
    render() {
        const { dispatch } = this.props;
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return <div>
            <h4>Welcome!</h4>
            <div className='btn' onClick={()=> {
                dispatch(makeScreenshot());
            }}>You want a new scrrenhot yah?</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <div>
                        <Field
                            name="firstName"
                            component="input"
                            type="text"
                            placeholder="First Name"
                        />
                    </div>
                </div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </form>
            <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
        </div>;
    }
}

export default connect(store => store)(reduxForm({
    form: 'home',
})(HomeView))

