// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import {useEffect} from "react";
import {Ocr} from "./Ocr/Ocr";

function App() {
    useEffect(() => {
        (async () => {
            const ocr = await Ocr.create();
            const words = [];
            words.push(...await ocr.processImage('images/image1.jpeg'));
            words.push(...await ocr.processImage('images/image2.jpeg'));
            words.push(...await ocr.processImage('images/image3.jpeg'));
            words.push(...await ocr.processImage('images/image4.jpg'));
            console.log(words);

            words.forEach(imageWords => {
                const ol = document.createElement('ol');
                imageWords.forEach(word => {
                    const li = document.createElement('li');
                    li.innerText = word.words.join(' ');
                    ol.appendChild(li);
                });
                document.body.appendChild(ol);

            })
        })();
    }, []);

    return (
        <div className="App">

        </div>
    );
}

export default App;
