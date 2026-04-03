import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell min-h-screen text-slate-900 transition-colors duration-300 dark:text-slate-50">
          <div className="app-glow app-glow-one" />
          <div className="app-glow app-glow-two" />

          <Navbar />

          <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;