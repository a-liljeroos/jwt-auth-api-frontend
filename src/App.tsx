import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import LoginContainer from "./components/LoginContainer/LoginContainer";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Toaster />
        <LoginContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
