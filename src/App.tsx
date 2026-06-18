import { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/pages/Onboarding";
import SignIn from "./pages/Authentication/SignIn";
import Number from "./pages/Authentication/Number";
import Verification from "./pages/Authentication/Verification";
import Location from "./pages/Authentication/Location";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import Layout from "./components/Layout";
import Explore from "./pages/Store/Explore";
import Cart from "./pages/Store/Cart";
import Favorite from "./pages/Store/Favorite";
import ProductDetails from "./pages/Store/ProductDetails";
import CategoryProducts from "./pages/Store/CategoryProducts";
import Shop from "./pages/Store/Shop";
import { Route, Routes } from "react-router";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      <div>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/number" element={<Number />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/location" element={<Location />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Shop />
                </Layout>
              }
            />
            <Route
              path="/explore"
              element={
                <Layout>
                  <Explore />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="/favorites"
              element={
                <Layout>
                  <Favorite />
                </Layout>
              }
            />
            <Route
              path="/product-details"
              element={
                <Layout>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path="/category-product"
              element={
                <Layout>
                  <CategoryProducts />
                </Layout>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
