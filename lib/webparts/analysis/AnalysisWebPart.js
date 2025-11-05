var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AnalysisWebPartStrings';
import Analysis from './components/Analysis';
var AnalysisWebPart = /** @class */ (function (_super) {
    __extends(AnalysisWebPart, _super);
    function AnalysisWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnalysisWebPart.prototype.render = function () {
        var element = React.createElement(Analysis, {
            description: this.properties.description,
            context: this.context,
            folderPath: this.properties.folderPath,
            pageNumber: 0,
        });
        ReactDom.render(element, this.domElement);
    };
    AnalysisWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(AnalysisWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    AnalysisWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return AnalysisWebPart;
}(BaseClientSideWebPart));
export default AnalysisWebPart;
//# sourceMappingURL=AnalysisWebPart.js.map