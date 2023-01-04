import './App.css';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import Error404 from './components/404/Error404';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home} />
        <Route path="/pokemon/details/:id" component={PokemonDetails}/>
        <Route path="/pokemon/create" component={Form}/>
        <Route component={Error404}/>
      </Switch>
    </div>
  );
}

export default App;
