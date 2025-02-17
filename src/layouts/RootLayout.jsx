import { Outlet } from "react-router";
import PageTransition from "./animation/PageTransition";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="text-black bg-slate-200 pt-[90px]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
