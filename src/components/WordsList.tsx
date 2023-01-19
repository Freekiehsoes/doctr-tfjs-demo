// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import React from "react";
import { Word } from "src/common/types";

interface Props {
  words: Word[];
  extractingWords: boolean;
}
export default function WordsList({
  words,
  extractingWords,
}: Props): JSX.Element {
  return (
      <div>

        {!extractingWords && !words.length && (
            <>No image loaded</>
        )}
        {extractingWords ? (
            <>Loading...</>
        ) : (
            words.map((word, key) => (
                <div key={key}>
                  {word.words.join(', ')}
                </div>
            ))
        )}
      </div>
  );
}
