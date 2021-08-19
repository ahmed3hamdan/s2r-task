import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./HomePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HomePage />
  </QueryClientProvider>
);

export default App;
