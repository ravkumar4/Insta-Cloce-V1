import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import UserProfile from './components/UserProfile'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/users/:id" component={UserProfile} />
    </Switch>
  </>
)

export default App
