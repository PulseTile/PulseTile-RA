import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import page1 from "./page1";
import page2 from "./page2";

import { makePDF } from "./functions";

export default () => {
    let editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setValue(
        makePDF
            .toString()
            .split('\n')
            .slice(1, -1)
            .join('\n')
            .replace(/^  /gm, '')
    );
    editor
        .getSession()
        .getSelection()
        .clearSelection();

    let iframe = document.querySelector('iframe');
    makePDF(iframe);

    editor.getSession().on('change', function() {
        try {
            let fn = new Function(
                'PDFDocument',
                'blobStream',
                'lorem',
                'iframe',
                editor.getValue()
            );
            fn(PDFDocument, blobStream, iframe, page1, page2);
        } catch (e) {
            console.log('Error: ', e);
        }
    });
}
