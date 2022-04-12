import storeContext from "./store/store-context";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Show from "./pages/Show";

function App() {
  return (
    <storeContext.Provider
      value={{
        API_KEY: "c22ff294f31f1b188bebf62f0ecf696e",
        ID: "",
        API_PHOTO: "https://image.tmdb.org/t/p/w500",
        IMAGE_SECOND:
          "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      }}
    >
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/serial/:id" element={<Show />} />
      </Routes>
    </storeContext.Provider>
  );
}

export default App;
