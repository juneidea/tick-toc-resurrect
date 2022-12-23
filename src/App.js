import React, {Component, Fragment} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';
import Main from './Main'
import {me} from './store'

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Fragment>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id,
    isFetching: state.user.isFetching
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me())
    // fetchWebRTC: () => dispatch(Stream())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(App))