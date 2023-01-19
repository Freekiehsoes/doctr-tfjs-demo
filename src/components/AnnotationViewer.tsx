// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import {
  AnnotationData,
  AnnotationViewer as AnnotationViewerBase,
  Stage,
} from "react-mindee-js";

interface Props {
  loadingImage: boolean;
  annotationData: AnnotationData;
  setAnnotationStage: (stage: Stage) => void;
}

export default function AnnotationViewer({
  setAnnotationStage,
  annotationData,
  loadingImage,
}: Props): JSX.Element {
  return (
      <>
        {loadingImage ? (
            <>loading...</>
        ) : !annotationData.image ? (
            <>No image loaded</>
        ) : (
            <AnnotationViewerBase
                data={annotationData}
                getStage={setAnnotationStage}
            />
        )}
      </>
  );
}
