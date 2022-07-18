import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </>
)

export default App
