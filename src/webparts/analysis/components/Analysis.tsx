import * as React from 'react';
import { SPService2 } from '../../../Service/Service';
import { IAnalysisProps } from './IAnalysisProps';
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
  private services = new SPService2(this.props.context);
  private canvasRef = React.createRef<HTMLCanvasElement>();

  constructor(props: IAnalysisProps) {
    super(props);
    this.state = {
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
  }
  

  public SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        style={{
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
        }}
        onClick={onClick}
      
      >
        <FiChevronRight size={20} /> {/* Adjust the size as needed */}
      </div>
    );
  };

  public SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        style={{
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
        }}
        onClick={onClick}
        
      >
        <FiChevronLeft size={20} /> {/* Adjust the size as needed */}
      </div>
    );
  };

  private settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 6000,
    autoplay: true,
    // arrows: true,
    nextArrow: <this.SampleNextArrow />,
    prevArrow: <this.SamplePrevArrow />
  };

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
public componentDidMount() {
  this.services.getListInfo(this.props.folderPath).then((items) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Get the current year

    const monthOrder = [
      "December", "November", "October", "September", "August", "July",
      "June", "May", "April", "March", "February", "January"
    ];

    // Function to filter items by year and sort them by month
    const getSortedItemsByYear = (year: number) => {
      console.log('items: ', items);
      const filteredItems = items.filter(item => item.Year === year.toString());
      return filteredItems.sort((a, b) => {
        return monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month);
      });
    };

    // Get sorted items for current year and previous year
    const allSortedItems: any[] = [];
    const yearsToFetch = [currentYear, currentYear - 1]; // Current year and previous year

    // Loop through only the two years (current year and previous year)
    yearsToFetch.forEach(year => {
      const sortedItems = getSortedItemsByYear(year);
      if (sortedItems.length > 0) {
        allSortedItems.push(...sortedItems); // Add documents for this year to the list
      }
    });

    // After fetching and sorting the items for the two years, set nav2 with the sorted documents
    this.setState({
      nav2: allSortedItems, // Set the documents for current and previous years
      selectedPdfUrl: allSortedItems.length > 0 ? allSortedItems[0].FileRef : undefined,
      selectedSummary: allSortedItems.length > 0 ? allSortedItems[0].Summary : null,
      isLoading: false, // Stop loading once items are fetched
    }, () => {
      if (this.state.selectedPdfUrl) {
        this.loadPdf();
      }
    });

  }).catch(error => {
    console.error("Error fetching documents:", error);
    this.setState({ isLoading: false }); // Stop loading even in case of an error
  });
  console.log("nav2:",this.state.nav2);
  console.log("nav2:",this.state.nav2);

}






  private pdfCache: { [url: string]: string[] } = {};

  private loadPdf(): void {
    const { selectedPdfUrl } = this.state;

    if (!selectedPdfUrl) {
      console.error('No PDF URL provided.');
      return;
    }

    // Check if the PDF is already cached
    if (this.pdfCache[selectedPdfUrl]) {
      this.setState({ pdfImages: this.pdfCache[selectedPdfUrl] });
      return;
    }

    const loadingTask = pdfjsLib.getDocument(selectedPdfUrl);

    loadingTask.promise.then((pdf) => {
      const numPages = pdf.numPages;
      const pdfImages: string[] = [];
      const renderPromises: Promise<void>[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const renderPage = async (pageNum: number) => {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 }); // Reduced scale
          // Create a new canvas for each page
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d', { willReadFrequently: true }); // Optimized context
          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            return page.render(renderContext).promise.then(() => {
              const imgSrc = canvas.toDataURL('image/png');
              pdfImages[pageNum - 1] = imgSrc; // Store images in order
            });
          }
        };

        renderPromises.push(renderPage(pageNum));
      }

      Promise.all(renderPromises).then(() => {
        // Cache the images
        this.pdfCache[selectedPdfUrl] = pdfImages;

        this.setState({ pdfImages }); // Update the state with all images
      });
    });
  }

  public handleStatus() {
    this.setState((state) => ({ DisplayStatus: !state.DisplayStatus }));
  }

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


  selectPdf = (pdfUrl: string, summary: string) => {
    this.setState(prevState => {
      let updatedHiddenPdfUrls = [...prevState.hiddenPdfUrls];

      // If a PDF was previously selected, make it visible again by removing it from the hidden list
      if (prevState.selectedPdfUrl) {
        updatedHiddenPdfUrls = updatedHiddenPdfUrls.filter(url => url !== prevState.selectedPdfUrl);
      }

      // Hide the newly selected PDF by adding it to the hidden list
      if (!updatedHiddenPdfUrls.includes(pdfUrl)) {
        updatedHiddenPdfUrls.push(pdfUrl);
      }

      return {
        selectedPdfUrl: pdfUrl,  // Set the new selected PDF
        numPages: null,
        selectedSummary: summary,
        pdfImages: [],
        hiddenPdfUrls: updatedHiddenPdfUrls,  // Update the list of hidden PDFs
        isPdfSelected: true,  // Set to true when a new PDF is selected
      };
    }, this.loadPdf);  // Reload the PDF after state update
};

  
public render(): React.ReactElement<IAnalysisProps> {
  return (
    <>
      <div>
        {this.state.isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Spinner label="Loading documents..." />
          </div>
        ) : this.state.nav2.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
            <div style={{ flex: 2, overflowY: 'auto', marginRight: '10px' }}>
              {/* PDF Viewer */}
              {this.state.selectedPdfUrl && this.state.pdfImages.length > 0 && (
                <>
                  <div style={{ position: 'relative', width: '100%', marginBottom: '20px', paddingBottom: '5%' }}>
                    <Slider {...this.settings}>
                      {this.state.pdfImages.map((imgSrc, index) => (
                        <div key={index}>
                          <img
                            src={imgSrc}
                            alt={`Page ${index + 1}`}
                            style={{
                              width: '100%',
                              border: '2px solid #ccc',
                              margin: '0 auto',
                              boxSizing: 'border-box',
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  {this.state.selectedSummary && <div><p>{this.state.selectedSummary}</p></div>}
                </>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ maxHeight: '452px',overflowX:'hidden', marginTop: '-15px' }}>
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  {this.state.nav2
                    .filter((doc, index) => {
                        // Exclude PPTX files
                          if (doc.FileRef.endsWith(".pptx")) {
                          return false;
                       }

                      // Include the first document only after a new PDF is selected
                      if (!this.state.isPdfSelected && index === 0) {
                        return false; // Exclude the first document initially
                      }
                      return this.state.hiddenPdfUrls.indexOf(doc.FileRef) === -1; // Hide PDFs that are selected
                    })
                    .map((doc, index) => (
<li key={index} style={{ marginBottom: '20px' }}>  

  {/* PDF Preview with click-overlay */}
  <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
  <iframe
  src={doc.FileRef}
  className={styles['pdf-frame']}
  frameBorder="0"
></iframe>


    

    {/* Transparent overlay for capturing click */}
    <div
      onClick={() => this.selectPdf(doc.FileRef, doc.Summary)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '113%',
        zIndex: 1,
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }}
    ></div>
  </div>
  <div
    onClick={() => this.selectPdf(doc.FileRef, doc.Summary)}
    style={{
      cursor: 'pointer',
      // padding: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      position: 'relative',
      padding:'0px 30px',
      marginTop:'-17'
    }}
  >
    {`${doc.Month} ${doc.Year}`}
  </div>
</li>

                    ))}
                </ul>
              </div>
            </div>

          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Documents are not available</p>
        )}
      </div>
      <canvas ref={this.canvasRef} style={{ display: 'none' }} />
    </>
  );
}

}  