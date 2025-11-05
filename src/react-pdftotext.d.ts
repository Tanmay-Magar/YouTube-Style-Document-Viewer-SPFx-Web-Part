declare module 'react-pdftotext' {
    export default function pdfToText(file: Blob): Promise<string>;
  }
  