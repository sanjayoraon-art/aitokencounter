export interface FileParseResult {
  text: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  isImage: boolean;
  imageDimensions?: { width: number; height: number; previewUrl?: string };
}

/**
 * Client-side file parser handling text, code, JSON, PDF, DOCX, and images
 */
export async function parseUploadedFile(file: File): Promise<FileParseResult> {
  const fileName = file.name;
  const fileSize = file.size;
  const fileType = file.type || '';
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // 1. Check if image
  if (fileType.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'svg'].includes(extension)) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const previewUrl = URL.createObjectURL(file);
      img.onload = () => {
        resolve({
          text: `[Image File: ${fileName} (${img.naturalWidth}x${img.naturalHeight}px)]`,
          fileName,
          fileSize,
          fileType,
          isImage: true,
          imageDimensions: {
            width: img.naturalWidth,
            height: img.naturalHeight,
            previewUrl,
          },
        });
      };
      img.onerror = () => {
        resolve({
          text: `[Image File: ${fileName}]`,
          fileName,
          fileSize,
          fileType,
          isImage: true,
          imageDimensions: { width: 1024, height: 1024, previewUrl },
        });
      };
      img.src = previewUrl;
    });
  }

  // 2. Handle PDF file
  if (extension === 'pdf' || fileType === 'application/pdf') {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      // Set worker source if available
      if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      }
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n\n';
      }
      return {
        text: fullText.trim(),
        fileName,
        fileSize,
        fileType,
        isImage: false,
      };
    } catch (e) {
      console.warn('PDF parsing fallback executing:', e);
      // Fallback text extraction if worker fails
      const text = await file.text();
      const cleaned = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ');
      return {
        text: cleaned || `[PDF Document: ${fileName} - Raw extraction fallback]`,
        fileName,
        fileSize,
        fileType,
        isImage: false,
      };
    }
  }

  // 3. Handle DOCX file
  if (extension === 'docx' || fileType.includes('officedocument.wordprocessingml')) {
    try {
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return {
        text: result.value.trim(),
        fileName,
        fileSize,
        fileType,
        isImage: false,
      };
    } catch (e) {
      console.warn('DOCX parsing fallback:', e);
      const text = await file.text();
      return {
        text: text || `[DOCX Document: ${fileName}]`,
        fileName,
        fileSize,
        fileType,
        isImage: false,
      };
    }
  }

  // 4. Handle plain text, code, markdown, JSON, CSV
  const textContent = await file.text();
  return {
    text: textContent,
    fileName,
    fileSize,
    fileType,
    isImage: false,
  };
}
