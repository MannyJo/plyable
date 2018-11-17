import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AddEmployees from '../Manager/AddEmployees';
import AdminOrgMain from '../AdminOrgMain/AdminOrgMain';
import Survey from '../Survey/Survey';
import UserMain from '../UserMain/UserMain';
import Registration from '../Registration/Registration';

import './App.css';
import AdminMain from '../AdminMain/AdminMain';
import NewOrgForm from '../AdminMain/NewOrgForm';
import CompletedFeedback from '../CompletedFeedback/CompletedFeedback';
import Messages from '../Messages/AllMessages';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/main" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              {/* <Route
              exact
              path="/about"
              component={AboutPage}
            /> */}


              <Route

                path="/register"
                component={Registration}
              />

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              {/* <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            /> */}
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}

              <ProtectedRoute
                exact
                path="/addemployees"
                component={AddEmployees}
              />
              <ProtectedRoute
                exact
                path="/survey"
                component={Survey}
              />
              {/* <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            /> */}
              <ProtectedRoute
                exact
                path="/main"
                component={UserMain}
              />
              <ProtectedRoute
                exact
                path="/adminmain"
                component={AdminMain}
              />
              <ProtectedRoute
                exact
                path="/adminmain/organization/:id"
                component={AdminOrgMain}
              />
              <ProtectedRoute
                exact
                path="/adminmain/createneworganization"
                component={NewOrgForm}
              />
              <ProtectedRoute
                exact
                path="/viewparticipation"
                render={() => <CompletedFeedback useOrgId={true} />}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Messages />
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
