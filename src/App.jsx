import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import CreateNote from "./components/CreateNote";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { ThemeProvider } from "./context/ThemeContext";

function App({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className=" h-full w-full">
          <Navbar />
          {/* <SidebarTrigger /> */}

          {children}

          <CreateNote />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
