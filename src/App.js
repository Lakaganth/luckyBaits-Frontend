import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import LoginPage from "./pages/loginPage/LoginPage";
import OrderDetailPage from "./pages/orderDetailPage/OrderDetailPage";
import SkuDetailPAge from "./pages/skuPage/SkuDetailPage";
import UploadOrders from "./pages/uploadXLSX/UploadOrders";
import UploadBom from "./pages/uploadXLSX/UploadBom";
import React from "react";
import { useSelector } from "react-redux";

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
            localStorage.token !== "" ? <DashboardPage /> : <LoginPage />
          }
        />

        <Route path="/orders/:id" component={OrderDetailPage} />
        <Route path="/bom/:sku" component={SkuDetailPAge} />
        <Route path="/upload" component={UploadOrders} />
        <Route path="/uploadBom" component={UploadBom} />
      </Switch>
    </div>
  );
};

export default App;
