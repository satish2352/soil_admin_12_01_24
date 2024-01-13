import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';

import 'jspdf-autotable';
import { saveAs } from 'file-saver';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-webenqlist',
  templateUrl: './webenqlist.component.html',
  styleUrls: ['./webenqlist.component.css']
})
export class WebenqlistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webEnquiryList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
        this.alllist.sort((a,b)=>b.id - a.id)
      }
    });
    this.ngxService.stop();
  }
  exportToExcel(): void {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}_${date
          .getHours()
          .toString()
          .padStart(2, '0')}-${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}-${date
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alllist);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(data, 'contacts.xlsx');

    saveAs(data, `WebEnq_${dateString}.xlsx`);

  }

// Ensure pdfmake has the necessary fonts
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// exportToPdf(): void {
//   const date = new Date();
//   const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}-${date
//       .getDate()
//       .toString()
//       .padStart(2, '0')}_${date
//         .getHours()
//         .toString()
//         .padStart(2, '0')}-${date
//           .getMinutes()
//           .toString()
//           .padStart(2, '0')}-${date
//             .getSeconds()
//             .toString()
//             .padStart(2, '0')}`;

//   const element: HTMLElement | null = document.getElementById('exportTable');

//   if (element) {
//     html2canvas(element).then(async (canvas) => {
//       const imgData = canvas.toDataURL('image/png');

//       // OCR using Tesseract.js
//       const worker = await createWorker();
//       worker.load();

//       worker.recognize(imgData)
//         .then(({ data: { text } }) => {
//           // Now 'text' contains the extracted text from the image
//           console.log('Extracted Text:', text);

//           // Split the text into rows and columns
//           const rows = text.split('\n').map(row => row.trim());
//           const tableData = rows.map(row => row.split(/\s+/));

//           // Create a new PDF with the extracted text in table format using pdfmake
//           const docDefinition = {
//             content: [
//               { text: `WebsiteEnq_${dateString}`, style: 'header' },
//               {
//                 table: {
//                   headerRows: 1,
//                   body: [
//                     /* Add your header array here */,
//                     ...tableData,
//                   ],
//                 },
//               },
//             ],
//             styles: {
//               header: {
//                 fontSize: 18,
//                 bold: true,
//                 margin: [0, 0, 0, 10],
//               },
//             },
//           };

//           pdfMake.createPdf(docDefinition).download(`WebsiteEnq_${dateString}.pdf`);
//         })
//         .finally(() => worker.terminate());
//     });
//   }
// }
///only 10 col 
// exportPdf() {
//   // Get the HTML table element by ID
//   const tableElement = document.getElementById('exportTable');

//   if (tableElement) {
//     // Extract table headers and rows from the HTML table
//     const tableHeaders = Array.from(tableElement.querySelectorAll('thead th')).map((header) => header.textContent);
//     const tableRows = Array.from(tableElement.querySelectorAll('tbody tr')).map((row) =>
//       Array.from(row.children).map((cell) => cell.textContent)
//     );

//     // Create the document definition
//     const documentDefinition = {
//       content: [
//         { text: 'Table Export Example', style: 'header' },
//         {
//           table: {
//             headerRows: 1,
//             body: [tableHeaders, ...tableRows],
//           },
//         },
//       ],
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           margin: [0, 0, 0, 10],
//         },
//       },
//     };

//     // Generate the PDF
//     pdfMake.createPdf(documentDefinition).download('WebEnq.pdf');
//   } else {
//     console.error('Table element not found.');
//   }
// }
async exportToPdf() {
  // Get the HTML table element by ID
  const tableElement = document.getElementById('exportTable');

  if (tableElement) {
    // Function to get all rows including those in hidden pages
    const getAllTableRows = async () => {
      const allRows = [];
      const totalRows = tableElement.querySelectorAll('tbody tr');

      for (let i = 0; i < totalRows.length; i++) {
        const row = totalRows[i];
        const rowData = Array.from(row.children).map(cell => cell.textContent);
        allRows.push(rowData);
      }

      return allRows;
    };

    const tableHeaders = Object.keys(this.alllist[0]);
    const tableRows = this.alllist.map(row => Object.values(row));

    // Calculate dynamic widths based on content length
    const dynamicWidths = tableHeaders.map(header => ({
      width: 'auto',
      minCellWidth: header.length * 14, // Adjust this multiplier as needed
    }));

    // Set a specific width for the last column
    const specificWidth = [20, 20, 20, 20, 20, 20, 20];

    // Combine the dynamic widths and the specific width
    console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));

    const columnWidths = [...dynamicWidths.map(col => col.minCellWidth), ...specificWidth];

    // Create the document definition
    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],
      content: [
        { text: 'Table Export Example', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: columnWidths,
            body: [tableHeaders, ...tableRows],
            layout: 'lightHorizontalLines',
          },
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    // Generate the PDF
    pdfMake.createPdf(documentDefinition).download('WebEnq.pdf');
  } else {
    console.error('Table element not found.');
  }
}
// exportPdf() {
//   // Define your table data
//   const tableData = [
//     ['Name', 'Age', 'City'],
//     ['John Doe', 30, 'New York'],
//     ['Jane Doe', 25, 'Los Angeles'],
//     // Add more rows as needed
//   ];

//   // Define the table headers
//   const tableHeaders = ['Name', 'Age', 'City'];

//   // Create the document definition
//   const documentDefinition = {
//     content: [
//       { text: 'Table Export Example', style: 'header' },
//       {
//         table: {
//           headerRows: 1,
//           body: [tableHeaders, ...tableData],
//         },
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//       },
//     },
//   };

//   // Generate the PDF
//   pdfMake.createPdf(documentDefinition).download('table_export.pdf');
// }


// exportPdf() {
//   // Create a new instance of jsPDF
//   const pdf = new jsPDF();

//   // Get the HTML table element by ID
//   const table = document.getElementById('exportTable');

//   // Use autoTable to add the table to the PDF
//   pdf.autoTable({ html: table });

//   // Save or download the PDF
//   pdf.save('webenq.pdf');
// }

  
  // exportToPdf(): void {
  //   const date = new Date();
  //   const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}-${date
  //       .getDate()
  //       .toString()
  //       .padStart(2, '0')}_${date
  //       .getHours()
  //       .toString()
  //       .padStart(2, '0')}-${date
  //       .getMinutes()
  //       .toString()
  //       .padStart(2, '0')}-${date
  //       .getSeconds()
  //       .toString()
  //       .padStart(2, '0')}`;
  
  //   const element: HTMLElement | null = document.getElementById('exportTable');
  
  //   if (element) {
  //     html2canvas(element).then(async (canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  
  //       // OCR using Tesseract.js
  //       const worker = await createWorker();
  //       worker.load();
        
  //       worker.recognize(imgData)
  //         .then(({ data: { text } }) => {
  //           // Now 'text' contains the extracted text from the image
  //           console.log('Extracted Text:', text);
  
  //           // Split the text into rows and columns
  //           const rows = text.split('\n').map(row => row.trim());
  //           const tableData = rows.map(row => row.split(/\s+/));
  
  //           // Create a new PDF with the extracted text in table format
  //           const pdf = new jsPDF();
  //           pdf.autoTable({
  //             head: [/* Add your header array here */],
  //             body: tableData,
  //             startY: 10, // Adjust position as needed
  //           });
  
  //           pdf.save(`WebsiteEnq_${dateString}.pdf`);
  //         })
  //         .finally(() => worker.terminate());
  //     });
  //   }
  // }
  
  


// exportToPdf(): void {
//   const date = new Date();
//   const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}-${date
//       .getDate()
//       .toString()
//       .padStart(2, '0')}_${date
//       .getHours()
//       .toString()
//       .padStart(2, '0')}-${date
//       .getMinutes()
//       .toString()
//       .padStart(2, '0')}-${date
//       .getSeconds()
//       .toString()
//       .padStart(2, '0')}`;

//   const element: HTMLElement | null = document.getElementById('exportTable');

//   if (element) {
//     html2canvas(element).then(async (canvas) => {
//       const imgData = canvas.toDataURL('image/png');

//       // OCR using Tesseract.js
//       const worker = await createWorker();
//       worker.load();
//       // worker.loadLanguage('eng');
//       // worker.initialize('eng');
      
//       worker.recognize(imgData)
//         .then(({ data: { text } }) => {
//           // Now 'text' contains the extracted text from the image
//           console.log('Extracted Text:', text);

//           // Create a new PDF with the extracted text
//           const pdf = new jsPDF.jsPDF();
//           pdf.text(text, 10, 10); // Adjust position as needed
//           pdf.save(`WebsiteEnq_${dateString}.pdf`);
//         })
//         .finally(() => worker.terminate());
//     });
//   }
// }

  // exportToPdf(): void {
  //   const date = new Date();
  //   const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}-${date
  //     .getDate()
  //     .toString()
  //     .padStart(2, '0')}_${date
  //     .getHours()
  //     .toString()
  //     .padStart(2, '0')}-${date
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, '0')}-${date
  //     .getSeconds()
  //     .toString()
  //     .padStart(2, '0')}`;
  
  //   const element: HTMLElement | null = document.getElementById('exportTable');
  
  //   if (element) {
  //     html2canvas(element).then((canvas) => {
  //       const pdf = new jsPDF.jsPDF();
  //       const imgData = canvas.toDataURL('image/png');
  
  //       pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust size as needed
  //       pdf.save(`WebsiteEnq_${dateString}.pdf`);
  //     });
  //   }
  // }
 


  





  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webBlogArticleDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Blog article deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'blogarticle-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'blogreply-edit', this.editid]);
  }
}

