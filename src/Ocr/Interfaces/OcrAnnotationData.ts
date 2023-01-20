import {AnnotationShape, Orientation} from "react-mindee-js/dist/common/types";

export interface OcrAnnotationData {
    image?: string | null;
    shapes?: AnnotationShape[];
    orientation?: Orientation;
}