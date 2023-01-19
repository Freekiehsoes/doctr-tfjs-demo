import {AnnotationData} from "react-mindee-js";
import Konva from "konva/lib";
import {KONVA_REFS} from "react-mindee-js/dist/common/constants";
import {flatten} from "underscore";

export default async function OcrStage(annotationData: AnnotationData, imageObject: HTMLImageElement) {
    // generate a konva stage from the annotation data like mindee-js does in AnnotationViewer.tsx
    const container = document.createElement("div");
    container.id = "ocr-stage";
    document.body.appendChild(container);

    const stage = new Konva.Stage({
        container: container,
        width: imageObject.width,
        height: imageObject.height,
    });

    const layers = {
        image: new Konva.Layer(),
        shapes: new Konva.Layer({
            id: KONVA_REFS.shapesLayer,
        }),
    }

    stage.add(
        layers.image,
        layers.shapes,
    );

    const image = await new Promise<any>((resolve) => {
        const image = new Konva.Image({
            image: imageObject,
            width: stage.width(),
            height: stage.height(),
        });
        resolve(image);
    });

    console.log(annotationData)
    const shapes = (annotationData.shapes || []).map((shape) => {
        const {coordinates, config} = shape;

        const points = coordinates.map((coordinate: [number,number]) => {
            // coordinate is between 0 and 1
            // map it to the image size
            const [x, y] = coordinate;
            return [
                x * stage.width(),
                y * stage.height(),
            ];
        });

        return new Konva.Line({
            points: flatten(points),
            stroke: config.stroke,
            strokeWidth: 2,
            closed: true,
        });
    });

    layers.image.add(image);
    layers.image.draw();
    layers.shapes.add(...shapes);
    layers.shapes.draw();



    return stage;
}