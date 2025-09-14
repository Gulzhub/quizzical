import { useState } from "react";
import StartScreen from "./components/StartScreen";

import Quiz from "./components/Quiz";

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);

  return (
    <main>
      {/* <div className="blob blob-1"></div>
      <div className="blob blob-2"></div> */}
      {showStartScreen ? (
        <StartScreen setShowStartScreen={() => setShowStartScreen(false)} />
      ) : (
        <Quiz />
      )}
    </main>
  );
}

export default App;
