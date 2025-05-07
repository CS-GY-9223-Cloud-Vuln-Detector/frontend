import AppRoutes from "./routes";
import Navbar from "./components/Layout/Navbar";
// import Footer from './components/Layout/Footer'; // Optional
import "./styles/App.css"; // App-specific styles

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
