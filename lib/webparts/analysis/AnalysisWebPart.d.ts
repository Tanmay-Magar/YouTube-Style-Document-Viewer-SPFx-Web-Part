import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IAnalysisWebPartProps {
    description: string;
    folderPath: string;
    context: any;
}
export default class AnalysisWebPart extends BaseClientSideWebPart<IAnalysisWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=AnalysisWebPart.d.ts.map