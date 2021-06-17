import React from 'react';
import Music from './components/Music/Music';
import Friends from './components/Friends/Friends';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import ProfileContainerBlock from './components/Profile/ProfileContainer';
import UserContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Preloader from './common/Preloader';
import withSuspense from './hoc/withSuspense'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initializedApp } from './components/Durax/app-reducer';
import { compose } from 'redux';
import { Redirect, Switch, withRouter } from 'react-router';
import './App.css';
const DialogContainer = React.lazy(() => import('./components/Dialogs/DialogContainer'));

const initState
  = {
  news: [{ user: 'Roman', id: 1, text: 'How are you?' },
  { user: 'Maria', id: 2, text: 'Hello me friends' },
  { user: 'Marta', id: 3, text: 'I am fine)' }
  ],

}

class App extends React.Component {
  catchAllUnhundledErrors = (event) => {
    alert('Some error occured');
    console.log(event);
  }
  componentDidMount() {
    this.props.initializedApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhundledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhundledErrors);

  }
  usersContainer = () => <UserContainer />
  profileContainerBlock = () => <ProfileContainerBlock />
  render() {
    if (!this.props.initialized) {
      return <Preloader from={'AppComponent'} />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar items={this.props.navbar} />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/profile" />
            </Route>
            <Route exact path='/profile/:userId?' render={this.profileContainerBlock} />
            <Route path='/dialogs/:userId?' render={withSuspense(DialogContainer)} />
            <Route path='/news' render={() => <News {...initState} />} />
            <Route path='/music' render={Music} />
            <Route path='/settings' render={Settings} />
            <Route path='/friends' render={Friends} />
            <Route path='/users' render={this.usersContainer} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404 PAGE NOT FOUND</div>} />
          </Switch>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

export default compose(connect(mapStateToProps, { initializedApp }), withRouter)(App)
