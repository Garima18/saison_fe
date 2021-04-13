import './App.css';
import Loader from "./main/shared/Loader/Loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const StartPage = lazy(() => import("./main/StartPage/StartPage"));

function App() {
  return (
    <div className="App">
      <Router>
      <Suspense fallback={<Loader />}>
      <Switch>
          <Route exact path="/" component={StartPage} />
          </Switch>
        </Suspense>
        </Router>
    </div>
  );
}

export default App;
