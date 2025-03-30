import { Suspense } from "react";
import "./App.css";
import Bottles from "./components/Bottles/Bottles";

const bottlesPromise = fetch("bottles.json").then((res) => res.json());

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
          <div className="flex flex-col items-center max-w-md text-center">
            {/* Animated spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

            {/* Loading text with fade animation */}
            <h3 className="text-xl font-medium text-gray-700 mb-2 animate-pulse">
              Loading Premium Bottles
            </h3>

            {/* Progress indicator */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
            </div>

            {/* Subtle help text */}
            <p className="text-gray-500 text-sm">
              Please wait while we prepare your shopping experience...
            </p>
          </div>
        </div>
      }
    >
      <Bottles bottlesPromise={bottlesPromise} />
    </Suspense>
  );
}

export default App;
