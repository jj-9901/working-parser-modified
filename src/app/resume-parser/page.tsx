// "use client";
// // import { useState, useEffect } from "react";
// // import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
// // import type { TextItems } from "lib/parse-resume-from-pdf/types";
// // import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
// // import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
// // import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
// // import { ResumeDropzone } from "components/ResumeDropzone";
// // import { cx } from "lib/cx";
// // import { Heading, Link, Paragraph } from "components/documentation";
// // import { ResumeTable } from "resume-parser/ResumeTable";
// // import { FlexboxSpacer } from "components/FlexboxSpacer";
// // import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";

// // import { useState, useEffect } from "react";
// // import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
// // import type { TextItems } from "lib/parse-resume-from-pdf/types";
// // import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
// // import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
// // import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
// // import { ResumeDropzone } from "components/ResumeDropzone";
// // import { ResumeTable } from "resume-parser/ResumeTable";


// // const RESUME_EXAMPLES = [
// //   {
// //     fileUrl: "resume-example/laverne-resume.pdf",
// //     description: (
// //       <span>
// //         Borrowed from University of La Verne Career Center -{" "}
// //         <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
// //           Link
// //         </Link>
// //       </span>
// //     ),
// //   },
// //   {
// //     fileUrl: "resume-example/openresume-resume.pdf",
// //     description: (
// //       <span>
// //         Created with OpenResume resume builder -{" "}
// //         <Link href="/resume-builder">Link</Link>
// //       </span>
// //     ),
// //   },
// // ];

// // const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];
// // export default function ResumeParser() {
// //   const [fileUrl, setFileUrl] = useState(defaultFileUrl);
// //   const [textItems, setTextItems] = useState<TextItems>([]);
// //   const lines = groupTextItemsIntoLines(textItems || []);
// //   const sections = groupLinesIntoSections(lines);
// //   const resume = extractResumeFromSections(sections);

// //   useEffect(() => {
// //     async function test() {
// //       const textItems = await readPdf(fileUrl);
// //       setTextItems(textItems);
// //     }
// //     test();
// //   }, [fileUrl]);

// //   return (
// //     <main className="h-full w-full overflow-hidden">
// //       <div className="grid md:grid-cols-6">
// //         <div className="flex justify-center px-2 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
// //           <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
// //             <div className="aspect-h-[9.5] aspect-w-7">
// //               <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" />
// //             </div>
// //           </section>
// //           <FlexboxSpacer maxWidth={45} className="hidden md:block" />
// //         </div>
// //         <div className="flex px-6 text-gray-900 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
// //           <FlexboxSpacer maxWidth={45} className="hidden md:block" />
// //           <section className="max-w-[600px] grow">
// //             <Heading className="text-primary !mt-4">
// //               Resume Parser Playground
// //             </Heading>
// //             <Paragraph smallMarginTop={true}>
// //               This playground showcases the OpenResume resume parser and its
// //               ability to parse information from a resume PDF. Click around the
// //               PDF examples below to observe different parsing results.
// //             </Paragraph>
// //             <div className="mt-3 flex gap-3">
// //               {RESUME_EXAMPLES.map((example, idx) => (
// //                 <article
// //                   key={idx}
// //                   className={cx(
// //                     "flex-1 cursor-pointer rounded-md border-2 px-4 py-3 shadow-sm outline-none hover:bg-gray-50 focus:bg-gray-50",
// //                     example.fileUrl === fileUrl
// //                       ? "border-blue-400"
// //                       : "border-gray-300"
// //                   )}
// //                   onClick={() => setFileUrl(example.fileUrl)}
// //                   onKeyDown={(e) => {
// //                     if (["Enter", " "].includes(e.key))
// //                       setFileUrl(example.fileUrl);
// //                   }}
// //                   tabIndex={0}
// //                 >
// //                   <h1 className="font-semibold">Resume Example {idx + 1}</h1>
// //                   <p className="mt-2 text-sm text-gray-500">
// //                     {example.description}
// //                   </p>
// //                 </article>
// //               ))}
// //             </div>
// //             <Paragraph>
// //               You can also{" "}
// //               <span className="font-semibold">add your resume below</span> to
// //               access how well your resume would be parsed by similar Application
// //               Tracking Systems (ATS) used in job applications. The more
// //               information it can parse out, the better it indicates the resume
// //               is well formatted and easy to read. It is beneficial to have the
// //               name and email accurately parsed at the very least.
// //             </Paragraph>
// //             <div className="mt-3">
// //               <ResumeDropzone
// //                 onFileUrlChange={(fileUrl) =>
// //                   setFileUrl(fileUrl || defaultFileUrl)
// //                 }
// //                 playgroundView={true}
// //               />
// //             </div>
// //             <Heading level={2} className="!mt-[1.2em]">
// //               Resume Parsing Results
// //             </Heading>
// //             <ResumeTable resume={resume} />
// //             <ResumeParserAlgorithmArticle
// //               textItems={textItems}
// //               lines={lines}
// //               sections={sections}
// //             />
// //             <div className="pt-24" />
// //           </section>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }



// import { useState, useEffect } from "react";
// import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
// import type { TextItems } from "lib/parse-resume-from-pdf/types";
// import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
// import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
// import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
// import { ResumeDropzone } from "components/ResumeDropzone";
// import { ResumeTable } from "resume-parser/ResumeTable";

// export default function ResumeParser() {
//   const [fileUrl, setFileUrl] = useState<string | null>(null);
//   const [textItems, setTextItems] = useState<TextItems>([]);

//   const lines = groupTextItemsIntoLines(textItems);
//   const sections = groupLinesIntoSections(lines);
//   const resume = extractResumeFromSections(sections);

//   useEffect(() => {
//     if (!fileUrl) return;

//     async function parsePdf() {
//       if (!fileUrl) return;
//       const textItems = await readPdf(fileUrl);
//       setTextItems(textItems);
//     }

//     parsePdf();
//   }, [fileUrl]);

//   return (
//     <div className="space-y-10 px-4 py-10">
//       <ResumeDropzone onFileUrlChange={setFileUrl} />

//       {fileUrl && (
//         <iframe
//           src={fileUrl}
//           title="PDF Preview"
//           className="w-full h-[600px] border rounded"
//         />
//       )}

//       <ResumeTable resume={resume} />
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { ResumeDropzone } from "components/ResumeDropzone";
import { ResumeTable } from "resume-parser/ResumeTable";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import type { TextItems } from "lib/parse-resume-from-pdf/types";

export default function ResumeParser() {
  const [resume, setResume] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  const handleFileUrlChange = async (url: string | null) => {
    setLoading(true);
    
    if (!url) {
      setFileUrl(null);
      setPdfPreviewUrl(null);
      setLoading(false);
      return;
    }

    // Handle blob URLs from file uploads
    if (url.startsWith("blob:") || url.startsWith("data:")) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setFileUrl(objectUrl);
        setPdfPreviewUrl(objectUrl);

        // Optional: upload to Flask
        const formData = new FormData();
        formData.append("file", new File([blob], "resume.pdf", { type: "application/pdf" }));

        try {
          const res = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          console.log("Uploaded to Flask:", data);
          
          // If Flask returns a file URL, use that for parsing but keep the blob URL for preview
          if (data.file_url) {
            setFileUrl(data.file_url);
          }
        } catch (error) {
          console.error("Upload to Flask failed:", error);
        }
      } catch (error) {
        console.error("Error processing file:", error);
      }
    } else {
      // Direct URL
      setFileUrl(url);
      setPdfPreviewUrl(url);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    async function parseResume(url: string) {
      try {
        const textItems: TextItems = await readPdf(url);
        const lines = groupTextItemsIntoLines(textItems);
        const sections = groupLinesIntoSections(lines);
        const resumeData = extractResumeFromSections(sections);
        setResume(resumeData);
                
        // Send the parsed data to the API if you want to access it via API
        try {
          await fetch("http://localhost:5000/parse", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(resumeData),
          });
        } catch (error) {
          console.error("Error sending parsed data to API:", error);
        }
        
      } catch (error) {
        console.error("Error parsing resume:", error);
      }
    }

    if (fileUrl) {
      parseResume(fileUrl);
    }
  }, [fileUrl]);

  return (
    <div className="space-y-10 px-4 py-10">
      <ResumeDropzone onFileUrlChange={handleFileUrlChange} />
      
      {loading && (
        <div className="text-center py-4">
          <p>Loading PDF...</p>
        </div>
      )}
      
      {pdfPreviewUrl && (
        <iframe
          src={pdfPreviewUrl}
          className="w-full h-[600px] border rounded"
          title="PDF Preview"
        />
      )}
      
      {resume && <ResumeTable resume={resume} />}
    </div>
  );
}
