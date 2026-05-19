import './App.css'
import Skeleton  from './components/ui/Skeleton';
import SideBar from './components/layout/Sidebar';
import NavBar from "./components/layout/Navbar";

function App() {

  return (
    <section className="flex h-screen w-screen bg-red-300">
      <SideBar />
      <section className="grid w-full " >
        <NavBar />
        <Skeleton  />
      </section>
    </section>
  );
}

export default App
