import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";
import TripsPage from "../pages/TripsPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Route>
  )
);

export default router;
