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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { SPService2 } from '../../../Service/Service';
import * as pdfjsLib from 'pdfjs-dist';
import styles from './Analysis.module.scss';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
console.log('pdfWorker', pdfWorker);
// Set the workerSrc for pdfjsLib
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
var Analysis = /** @class */ (function (_super) {
    __extends(Analysis, _super);
    function Analysis(props) {
        var _this = _super.call(this, props) || this;
        _this.services = new SPService2(_this.props.context);
        _this.canvasRef = React.createRef();
        _this.SampleNextArrow = function (props) {
            var onClick = props.onClick;
            return (React.createElement("div", { style: {
                    position: 'absolute',
                    top: '50%',
                    right: '1px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    padding: '4px',
                    paddingRight: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#141414',
                    opacity: '0.65',
                    transition: 'transform 0.3s ease',
                    color: '#FFFFFF', // Initial color set to gray
                }, onClick: onClick },
                React.createElement(FiChevronRight, { size: 20 }),
                " "));
        };
        _this.SamplePrevArrow = function (props) {
            var onClick = props.onClick;
            return (React.createElement("div", { style: {
                    position: 'absolute',
                    top: '50%',
                    left: '1px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    padding: '4px',
                    paddingLeft: '4px',
                    opacity: '0.65',
                    backgroundColor: '#141414',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    color: '#FFFFFF', // Initial color set to gray
                }, onClick: onClick },
                React.createElement(FiChevronLeft, { size: 20 }),
                " "));
        };
        _this.settings = {
            dots: false,
            infinite: false,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 6000,
            autoplay: true,
            // arrows: true,
            nextArrow: React.createElement(_this.SampleNextArrow, null),
            prevArrow: React.createElement(_this.SamplePrevArrow, null)
        };
        _this.pdfCache = {};
        // selectPdf = (pdfUrl: string, summary: string) => {
        //   // Only update state and load PDF if the selected PDF is different from the current one
        //   if (this.state.selectedPdfUrl !== pdfUrl) {
        //     this.setState({ selectedPdfUrl: pdfUrl, numPages: null, selectedSummary: summary, pdfImages: [] }, () => {
        //       this.loadPdf();
        //     });
        //   }
        // };
        // onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        //   this.setState({ numPages });
        // };
        _this.selectPdf = function (pdfUrl, summary) {
            _this.setState(function (prevState) {
                var updatedHiddenPdfUrls = __spreadArray([], prevState.hiddenPdfUrls, true);
                // If a PDF was previously selected, make it visible again by removing it from the hidden list
                if (prevState.selectedPdfUrl) {
                    updatedHiddenPdfUrls = updatedHiddenPdfUrls.filter(function (url) { return url !== prevState.selectedPdfUrl; });
                }
                // Hide the newly selected PDF by adding it to the hidden list
                if (!updatedHiddenPdfUrls.includes(pdfUrl)) {
                    updatedHiddenPdfUrls.push(pdfUrl);
                }
                return {
                    selectedPdfUrl: pdfUrl,
                    numPages: null,
                    selectedSummary: summary,
                    pdfImages: [],
                    hiddenPdfUrls: updatedHiddenPdfUrls,
                    isPdfSelected: true, // Set to true when a new PDF is selected
                };
            }, _this.loadPdf); // Reload the PDF after state update
        };
        _this.state = {
            DisplayStatus: false,
            nav2: [],
            selectedPdfUrl: null,
            numPages: null,
            selectedSummary: null,
            hiddenPdfUrls: [],
            pdfImages: [],
            isLoading: true,
            isPdfSelected: false, // Add the new state variable isPdfSelected and initialize it to false
        };
        return _this;
    }
    // public componentDidMount() {
    //   this.services.getListInfo(this.props.folderPath).then((items) => {
    //     const currentDate = new Date();
    //     const currentMonthIndex = currentDate.getMonth();
    //     const currentYear = currentDate.getFullYear().toString();
    //     const monthNames = [
    //       "January", "February", "March", "April", "May", "June",
    //       "July", "August", "September", "October", "November", "December"
    //     ];
    //     const monthOrder = [
    //       "December", "November", "October", "September", "August", "July",
    //       "June", "May", "April", "March", "February", "January"
    //     ];
    //     const currentMonthName = monthNames[currentMonthIndex];
    //     const filteredItems = items.filter(item => item.Year === currentYear);
    //     const sortedItems = filteredItems.sort((a, b) => {
    //       return monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month);
    //     });
    //     const currentMonthItem = sortedItems.find(item => item.Month === currentMonthName);
    //     const selectedItem = currentMonthItem ? currentMonthItem : sortedItems[0];
    //     this.setState({
    //       nav2: sortedItems,
    //       selectedPdfUrl: selectedItem ? selectedItem.FileRef : undefined,
    //       selectedSummary: selectedItem ? selectedItem.Summary : null,
    //       isLoading: false, // Stop loading once items are fetched
    //     }, () => {
    //       if (this.state.selectedPdfUrl) {
    //         this.loadPdf();
    //       }
    //     });
    //   }).catch(error => {
    //     console.error("Error fetching documents:", error);
    //     this.setState({ isLoading: false }); // Stop loading even in case of an error
    //   });
    // }
    //   
    Analysis.prototype.componentDidMount = function () {
        var _this = this;
        this.services.getListInfo(this.props.folderPath).then(function (items) {
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear(); // Get the current year
            var monthOrder = [
                "December", "November", "October", "September", "August", "July",
                "June", "May", "April", "March", "February", "January"
            ];
            // Function to filter items by year and sort them by month
            var getSortedItemsByYear = function (year) {
                console.log('items: ', items);
                var filteredItems = items.filter(function (item) { return item.Year === year.toString(); });
                return filteredItems.sort(function (a, b) {
                    return monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month);
                });
            };
            // Get sorted items for current year and previous year
            var allSortedItems = [];
            var yearsToFetch = [currentYear, currentYear - 1]; // Current year and previous year
            // Loop through only the two years (current year and previous year)
            yearsToFetch.forEach(function (year) {
                var sortedItems = getSortedItemsByYear(year);
                if (sortedItems.length > 0) {
                    allSortedItems.push.apply(allSortedItems, sortedItems); // Add documents for this year to the list
                }
            });
            // After fetching and sorting the items for the two years, set nav2 with the sorted documents
            _this.setState({
                nav2: allSortedItems,
                selectedPdfUrl: allSortedItems.length > 0 ? allSortedItems[0].FileRef : undefined,
                selectedSummary: allSortedItems.length > 0 ? allSortedItems[0].Summary : null,
                isLoading: false, // Stop loading once items are fetched
            }, function () {
                if (_this.state.selectedPdfUrl) {
                    _this.loadPdf();
                }
            });
        }).catch(function (error) {
            console.error("Error fetching documents:", error);
            _this.setState({ isLoading: false }); // Stop loading even in case of an error
        });
        console.log("nav2:", this.state.nav2);
        console.log("nav2:", this.state.nav2);
    };
    Analysis.prototype.loadPdf = function () {
        var _this = this;
        var selectedPdfUrl = this.state.selectedPdfUrl;
        if (!selectedPdfUrl) {
            console.error('No PDF URL provided.');
            return;
        }
        // Check if the PDF is already cached
        if (this.pdfCache[selectedPdfUrl]) {
            this.setState({ pdfImages: this.pdfCache[selectedPdfUrl] });
            return;
        }
        var loadingTask = pdfjsLib.getDocument(selectedPdfUrl);
        loadingTask.promise.then(function (pdf) {
            var numPages = pdf.numPages;
            var pdfImages = [];
            var renderPromises = [];
            for (var pageNum = 1; pageNum <= numPages; pageNum++) {
                var renderPage = function (pageNum) { return __awaiter(_this, void 0, void 0, function () {
                    var page, viewport, canvas, context, renderContext;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, pdf.getPage(pageNum)];
                            case 1:
                                page = _a.sent();
                                viewport = page.getViewport({ scale: 1 });
                                canvas = document.createElement('canvas');
                                context = canvas.getContext('2d', { willReadFrequently: true });
                                if (context) {
                                    canvas.width = viewport.width;
                                    canvas.height = viewport.height;
                                    renderContext = {
                                        canvasContext: context,
                                        viewport: viewport,
                                    };
                                    return [2 /*return*/, page.render(renderContext).promise.then(function () {
                                            var imgSrc = canvas.toDataURL('image/png');
                                            pdfImages[pageNum - 1] = imgSrc; // Store images in order
                                        })];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                renderPromises.push(renderPage(pageNum));
            }
            Promise.all(renderPromises).then(function () {
                // Cache the images
                _this.pdfCache[selectedPdfUrl] = pdfImages;
                _this.setState({ pdfImages: pdfImages }); // Update the state with all images
            });
        });
    };
    Analysis.prototype.handleStatus = function () {
        this.setState(function (state) { return ({ DisplayStatus: !state.DisplayStatus }); });
    };
    Analysis.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", null, this.state.isLoading ? (React.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                } },
                React.createElement(Spinner, { label: "Loading documents..." }))) : this.state.nav2.length > 0 ? (React.createElement("div", { style: { display: 'flex', flexDirection: 'row', margin: '10px' } },
                React.createElement("div", { style: { flex: 2, overflowY: 'auto', marginRight: '10px' } }, this.state.selectedPdfUrl && this.state.pdfImages.length > 0 && (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { position: 'relative', width: '100%', marginBottom: '20px', paddingBottom: '5%' } },
                        React.createElement(Slider, __assign({}, this.settings), this.state.pdfImages.map(function (imgSrc, index) { return (React.createElement("div", { key: index },
                            React.createElement("img", { src: imgSrc, alt: "Page ".concat(index + 1), style: {
                                    width: '100%',
                                    border: '2px solid #ccc',
                                    margin: '0 auto',
                                    boxSizing: 'border-box',
                                } }))); }))),
                    this.state.selectedSummary && React.createElement("div", null,
                        React.createElement("p", null, this.state.selectedSummary))))),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { maxHeight: '452px', overflowX: 'hidden', marginTop: '-15px' } },
                        React.createElement("ul", { style: { padding: 0, listStyle: 'none' } }, this.state.nav2
                            .filter(function (doc, index) {
                            // Exclude PPTX files
                            if (doc.FileRef.endsWith(".pptx")) {
                                return false;
                            }
                            // Include the first document only after a new PDF is selected
                            if (!_this.state.isPdfSelected && index === 0) {
                                return false; // Exclude the first document initially
                            }
                            return _this.state.hiddenPdfUrls.indexOf(doc.FileRef) === -1; // Hide PDFs that are selected
                        })
                            .map(function (doc, index) { return (React.createElement("li", { key: index, style: { marginBottom: '20px' } },
                            React.createElement("div", { style: { position: 'relative', width: '100%', paddingBottom: '56.25%' } },
                                React.createElement("iframe", { src: doc.FileRef, className: styles['pdf-frame'], frameBorder: "0" }),
                                React.createElement("div", { onClick: function () { return _this.selectPdf(doc.FileRef, doc.Summary); }, style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '113%',
                                        zIndex: 1,
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                    } })),
                            React.createElement("div", { onClick: function () { return _this.selectPdf(doc.FileRef, doc.Summary); }, style: {
                                    cursor: 'pointer',
                                    // padding: '10px',
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                    position: 'relative',
                                    padding: '0px 30px',
                                    marginTop: '-17'
                                } }, "".concat(doc.Month, " ").concat(doc.Year)))); })))))) : (React.createElement("p", { style: { textAlign: 'center' } }, "Documents are not available"))),
            React.createElement("canvas", { ref: this.canvasRef, style: { display: 'none' } })));
    };
    return Analysis;
}(React.Component));
export default Analysis;
//# sourceMappingURL=Analysis.js.map