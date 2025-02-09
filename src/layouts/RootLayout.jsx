import { Outlet } from "react-router";
import PageTransition from "./animation/PageTransition";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-cyan-700 to-gray-900">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
