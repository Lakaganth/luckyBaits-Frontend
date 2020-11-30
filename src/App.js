
import {  Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/dashboardPage/DashboardPage';
import LoginPage from './pages/loginPage/LoginPage';
import { useSelector,  } from "react-redux";
// import * as AuthActions from './store/actions/AuthActions'


const  App = ()=> {
  const location = useLocation()

  const authRedux = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
    console.log(authRedux.token)

  return (
    <div className="App">
     <Switch location={location}>    

       <Route exact path="/" render={()=> authRedux.token !== '' ? (<DashboardPage/>) : (<LoginPage />)} />    

       {/* <Route exact path="/" component={DashboardPage} /> */}
     
     </Switch>
    </div>
  );
}

export default App;
