import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { LoadingComponent } from "components/LoadingComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingComponent />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
