import {OcrData} from "./OcrData";
import {AnnotationData} from "react-mindee-js";
import {extractBoundingBoxesFromHeatmap, extractWords, getHeatMapFromImage} from "../utils";
import {Word} from "../common/types";
import OcrStage from "./OcrStage";
import {Stage} from "konva/lib/Stage";

export class Ocr {
    private data: OcrData;

    private imageObject: HTMLImageElement | null = null;

    private constructor(data: OcrData) {
        this.data = data;
    }

    public static async create(): Promise<Ocr> {
        const data = await OcrData.create();
        return new Ocr(data);
    }

    public async processImage(imageUrl: string) {
        this.imageObject = await this.loadImage(imageUrl);
        await getHeatMapFromImage({
            detectionModel: this.data.detectionModel,
            heatmapContainer: this.data.heatMapContainerElement,
            imageObject: this.imageObject,
            size: [this.data.detConfig.height, this.data.detConfig.width]
        });
        await this.getBoundingBoxes();

        return await this.getWords();
    }

    private async loadImage(imageUrl: string) {
        return new Promise<HTMLImageElement>((resolve) => {
            const imageObject = new Image();
            imageObject.onload = () => {
                resolve(imageObject);
            }
            imageObject.src = imageUrl
        });
    }

    private async getBoundingBoxes() {
        return new Promise<void>((resolve) => {
            const boundingBoxes = extractBoundingBoxesFromHeatmap([
                this.data.detConfig.height,
                this.data.detConfig.width
            ]);
            this.data.setAnnotationData({
                image: this.imageObject?.src,
                shapes: boundingBoxes
            });
            resolve();
        });
    }

    private async getWords() {
        return await extractWords({
            recognitionModel: this.data.recognitionModel,
            stage: await this.getAnnotationStage(this.data.getAnnotationData()),
            size: [this.data.recoConfig.height, this.data.recoConfig.width]
        });
    }

    private async getAnnotationStage(annotationData: AnnotationData) {
        const stage = await OcrStage(annotationData, this.imageObject as HTMLImageElement);
        return new Promise<Stage>((resolve) => {
            setTimeout(() => {
                resolve(stage);
            }, 2000);
        });
    }
}
