import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "../components/dumb-components/ProtectedRoute";
import { HashLoader } from "react-spinners";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const FaqPage = lazy(() => import("../pages/FAQPage"));
const TripsPage = lazy(() => import("../pages/TripsPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
const TripListPage = lazy(() => import("../pages/TripListPage"));
const TripDetailsPage = lazy(() => import("../pages/TripDetailsPage"));
const ActivitiesPage = lazy(() => import("../pages/ActivitiesPage"));
const ActivityListPage = lazy(() => import("../pages/ActivityListPage"));
const ActivityDetailsPage = lazy(() => import("../pages/ActivityDetailsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const Loader = <HashLoader size={50} color="black" className="m-auto" />;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          <Suspense fallback={Loader}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={Loader}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="/faq"
        element={
          <Suspense fallback={Loader}>
            <FaqPage />
          </Suspense>
        }
      />
      <Route path="/trips">
        <Route
          index
          element={
            <ProtectedRoute>
              <Suspense fallback={Loader}>
                <TripsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="mytrips"
          element={
            <Suspense fallback={Loader}>
              <TripListPage />
            </Suspense>
          }>
          <Route
            path=":tripid"
            element={
              <Suspense fallback={Loader}>
                <TripDetailsPage />
              </Suspense>
            }>
            <Route
              path="activities"
              element={
                <Suspense fallback={Loader}>
                  <ActivitiesPage />
                </Suspense>
              }
            />
            <Route
              path="myactivities"
              element={
                <Suspense fallback={Loader}>
                  <ActivityListPage />
                </Suspense>
              }>
              <Route
                path=":activityid"
                element={
                  <Suspense fallback={Loader}>
                    <ActivityDetailsPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        path="/sign-in"
        element={
          <Suspense fallback={Loader}>
            <SignInPage />
          </Suspense>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Suspense fallback={Loader}>
            <SignUpPage />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
