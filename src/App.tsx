// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import VisionWrapper from "./components/VisionWrapper";
import {useEffect} from "react";
import {Ocr} from "./Ocr/Ocr";

function App() {
  useEffect(() => {
    (async () => {
      const ocr = await Ocr.create();
      const words = await ocr.processImage('car.jpg');
        console.log(words);
    })();
  }, []);

  return (
        <div className="App">

        </div>
  );
}

export default App;
