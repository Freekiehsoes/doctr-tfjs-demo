import {GraphModel, loadGraphModel} from "@tensorflow/tfjs";
import {DET_CONFIG, RECO_CONFIG} from "../common/constants";
import {AnnotationData} from "react-mindee-js";
import {Stage} from "konva/lib/Stage";

export class OcrData {
    public recognitionModel!: GraphModel;
    public detectionModel!: GraphModel;
    public detConfig = DET_CONFIG.db_mobilenet_v2;
    public recoConfig = RECO_CONFIG.crnn_vgg16_bn;
    public readonly heatMapContainerElement!: HTMLCanvasElement;

    public annotationStage!: Stage;
    private annotationData: AnnotationData = {
        image: null
    };

    private constructor() {
        this.heatMapContainerElement = document.createElement("canvas");
        this.heatMapContainerElement.id = "heatmap";
        document.body.appendChild(this.heatMapContainerElement);
        const context = this.heatMapContainerElement.getContext("2d");
        context?.clearRect(0, 0, this.heatMapContainerElement.width, this.heatMapContainerElement.height);
    }

    public static async create(): Promise<OcrData> {
        const ocrData = new OcrData();
        await ocrData.loadModels();
        return ocrData;
    }

    private async loadModels() {
        this.recognitionModel = await loadGraphModel(this.recoConfig.path);
        this.detectionModel = await loadGraphModel(this.detConfig.path);
    }

    public getAnnotationData(): AnnotationData {
        return this.annotationData;
    }

    public setAnnotationData(annotationData: Partial<AnnotationData>) {
        this.annotationData = {...this.annotationData, ...annotationData};
    }
}