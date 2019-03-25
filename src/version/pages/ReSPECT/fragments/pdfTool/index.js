import PDFDocument from "@react-pdf/pdfkit";
import blobStream from "blob-stream";
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import { makePDF } from "./functions";

import page1 from "./page1";
import page2 from "./page2";

export default (versionInfo) => {
    // let editor = ace.edit('editor');
    // editor.setTheme('ace/theme/monokai');
    // editor.getSession().setMode('ace/mode/javascript');
    // editor.setValue(
    //     makePDF
    //         .toString()
    //         .split('\n')
    //         .slice(1, -1)
    //         .join('\n')
    //         .replace(/^  /gm, '')
    // );
    // editor
    //     .getSession()
    //     .getSelection()
    //     .clearSelection();
    //
    // let iframe = document.querySelector('iframe');
    makePDF(versionInfo);
    //
    // editor.getSession().on('change', function() {
    //     try {
    //         let fn = new Function(
    //             'PDFDocument',
    //             'blobStream',
    //             'lorem',
    //             'iframe',
    //             editor.getValue()
    //         );
    //         fn(PDFDocument, blobStream, iframe, page1, page2);
    //     } catch (e) {
    //         console.log('Error: ', e);
    //     }
    // });
}
