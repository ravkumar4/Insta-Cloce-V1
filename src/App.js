import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './components/PageNotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/users/:id" component={UserProfile} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <Route path="/page-not-found" component={PageNotFound} />
      <Redirect to="/page-not-found" />
    </Switch>
  </>
)

export default App
