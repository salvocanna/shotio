import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
    <div>
        <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <div className="navbar-brand">Shotio</div>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li>
                            <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
                        </li>
                        {/*<li>*/}
                            {/*<Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>
        <div className='container text-center'>
            <div className='page-layout__viewport'>
                {children}
            </div>
        </div>
    </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
