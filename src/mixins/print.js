export default{
    data() {
        return {
            
        }
    },
    methods:{
        print(element_id, title="Document") {
            const prtHtml = document.getElementById(element_id).innerHTML;
                // Get all stylesheets HTML
                let stylesHtml = '';
                for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                    stylesHtml += node.outerHTML;
                }
                
                // Open the print window
                const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
                
                WinPrint.document.write(`<!DOCTYPE html>
                <html>
                <head>
                    <title>${title} </title>
                    ${ stylesHtml }
                </head>
                <body>
                    ${ prtHtml }
                </body>
                </html>`);
                
               WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();

        }
    }
}