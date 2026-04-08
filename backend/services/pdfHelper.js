// backend/services/pdfHelper.js
import { extractText, getDocumentProxy } from 'unpdf';

const extractPDF = async (buffer) => {
    try {
        // PDF load karo (Buffer ko Uint8Array mein badal kar unpdf ke rules ke mutabiq)
        const pdf = await getDocumentProxy(new Uint8Array(buffer));
        
        // Text nikalo aur saare pages ko ek single string mein merge kar do
        const { text } = await extractText(pdf, { mergePages: true });
        
        return text;
    } catch (error) {
        console.error("❌ PDF Parsing Error:", error);
        throw new Error("Failed to parse PDF using unpdf");
    }
};

export default extractPDF;