import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AnalysisWebPartStrings';
import Analysis from './components/Analysis';
import { IAnalysisProps } from './components/IAnalysisProps';

export interface IAnalysisWebPartProps {
  description: string;
  folderPath: string;
  context: any;
}

export default class AnalysisWebPart extends BaseClientSideWebPart<IAnalysisWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnalysisProps> = React.createElement(
      Analysis,
      {
        description: this.properties.description,
        context: this.context,
        folderPath: this.properties.folderPath,
        pageNumber : 0,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('folderPath', {
                  label: strings.FolderNameLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}




