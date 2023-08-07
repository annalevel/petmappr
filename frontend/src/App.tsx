import React from "react";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { routes } from "./AppRoutes";

const App: React.FC = () => {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map((route, i) => (
              <Route
                path={route.path}
                Component={route.component}
                key={route.key}
              />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
