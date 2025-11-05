import * as React from 'react';
import { IAnalysisProps } from './IAnalysisProps';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export interface INewsCarouselState {
    DisplayStatus: boolean;
    nav2: any[];
    selectedPdfUrl: string | null;
    numPages: number | null;
    selectedSummary: string | null;
    hiddenPdfUrls: string[];
    pdfImages: string[];
    isLoading: boolean;
    isPdfSelected: boolean;
}
export default class Analysis extends React.Component<IAnalysisProps, INewsCarouselState> {
    private services;
    private canvasRef;
    constructor(props: IAnalysisProps);
    SampleNextArrow: (props: any) => React.JSX.Element;
    SamplePrevArrow: (props: any) => React.JSX.Element;
    private settings;
    componentDidMount(): void;
    private pdfCache;
    private loadPdf;
    handleStatus(): void;
    selectPdf: (pdfUrl: string, summary: string) => void;
    render(): React.ReactElement<IAnalysisProps>;
}
//# sourceMappingURL=Analysis.d.ts.map