import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
// import LoginPage from "./pages/loginPage/LoginPage";
import { useSelector } from "react-redux";
// import * as AuthActions from './store/actions/AuthActions'
import OrderDetailPage from "./pages/orderDetailPage/OrderDetailPage";
import SkuDetailPAge from "./pages/skuPage/SkuDetailPage";

const App = () => {
  const location = useLocation();

  const authRedux = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Switch location={location}>
        <Route
          exact
          path="/"
          render={() =>
            authRedux.token !== "" ? <DashboardPage /> : <DashboardPage />
          }
        />
        <Route path="/orders/:id" component={OrderDetailPage} />
        <Route path="/bom/:sku" component={SkuDetailPAge} />

        {/* <Route exact path="/" component={DashboardPage} /> */}
      </Switch>
    </div>
  );
};

export default App;
