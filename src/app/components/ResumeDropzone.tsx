// import { useState } from "react";
// import { LockClosedIcon } from "@heroicons/react/24/solid";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { parseResumeFromPdf } from "lib/parse-resume-from-pdf";
// import {
//   getHasUsedAppBefore,
//   saveStateToLocalStorage,
// } from "lib/redux/local-storage";
// import { type ShowForm, initialSettings } from "lib/redux/settingsSlice";
// import { useRouter } from "next/navigation";
// import addPdfSrc from "public/assets/add-pdf.svg";
// import Image from "next/image";
// import { cx } from "lib/cx";
// import { deepClone } from "lib/deep-clone";

// const defaultFileState = {
//   name: "",
//   size: 0,
//   fileUrl: "",
// };

// export const ResumeDropzone = ({
//   onFileUrlChange,
//   className,
//   playgroundView = false,
// }: {
//   onFileUrlChange: (fileUrl: string) => void;
//   className?: string;
//   playgroundView?: boolean;
// }) => {
//   const [file, setFile] = useState(defaultFileState);
//   const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
//   const [hasNonPdfFile, setHasNonPdfFile] = useState(false);
//   const router = useRouter();

//   const hasFile = Boolean(file.name);

//   const setNewFile = (newFile: File) => {
//     if (file.fileUrl) {
//       URL.revokeObjectURL(file.fileUrl);
//     }

//     const { name, size } = newFile;
//     const fileUrl = URL.createObjectURL(newFile);
//     setFile({ name, size, fileUrl });
//     onFileUrlChange(fileUrl);
//   };

//   const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const newFile = event.dataTransfer.files[0];
//     if (newFile.name.endsWith(".pdf")) {
//       setHasNonPdfFile(false);
//       setNewFile(newFile);
//     } else {
//       setHasNonPdfFile(true);
//     }
//     setIsHoveredOnDropzone(false);
//   };

//   const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const newFile = files[0];
//     setNewFile(newFile);
//   };

//   const onRemove = () => {
//     setFile(defaultFileState);
//     onFileUrlChange("");
//   };

//   const onImportClick = async () => {
//     const resume = await parseResumeFromPdf(file.fileUrl);
//     const settings = deepClone(initialSettings);

//     // Set formToShow settings based on uploaded resume if users have used the app before
//     if (getHasUsedAppBefore()) {
//       const sections = Object.keys(settings.formToShow) as ShowForm[];
//       const sectionToFormToShow: Record<ShowForm, boolean> = {
//         workExperiences: resume.workExperiences.length > 0,
//         educations: resume.educations.length > 0,
//         projects: resume.projects.length > 0,
//         skills: resume.skills.descriptions.length > 0,
//         custom: resume.custom.descriptions.length > 0,
//       };
//       for (const section of sections) {
//         settings.formToShow[section] = sectionToFormToShow[section];
//       }
//     }

//     saveStateToLocalStorage({ resume, settings });
//     router.push("/resume-builder");
//   };

//   return (
//     <div
//       className={cx(
//         "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 ",
//         isHoveredOnDropzone && "border-sky-400",
//         playgroundView ? "pb-6 pt-4" : "py-12",
//         className
//       )}
//       onDragOver={(event) => {
//         event.preventDefault();
//         setIsHoveredOnDropzone(true);
//       }}
//       onDragLeave={() => setIsHoveredOnDropzone(false)}
//       onDrop={onDrop}
//     >
//       <div
//         className={cx(
//           "text-center",
//           playgroundView ? "space-y-2" : "space-y-3"
//         )}
//       >
//         {!playgroundView && (
//           <Image
//             src={addPdfSrc}
//             className="mx-auto h-14 w-14"
//             alt="Add pdf"
//             aria-hidden="true"
//             priority
//           />
//         )}
//         {!hasFile ? (
//           <>
//             <p
//               className={cx(
//                 "pt-3 text-gray-700",
//                 !playgroundView && "text-lg font-semibold"
//               )}
//             >
//               Browse a pdf file or drop it here
//             </p>
//             <p className="flex text-sm text-gray-500">
//               <LockClosedIcon className="mr-1 mt-1 h-3 w-3 text-gray-400" />
//               File data is used locally and never leaves your browser
//             </p>
//           </>
//         ) : (
//           <div className="flex items-center justify-center gap-3 pt-3">
//             <div className="pl-7 font-semibold text-gray-900">
//               {file.name} - {getFileSizeString(file.size)}
//             </div>
//             <button
//               type="button"
//               className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
//               title="Remove file"
//               onClick={onRemove}
//             >
//               <XMarkIcon className="h-6 w-6" />
//             </button>
//           </div>
//         )}
//         <div className="pt-4">
//           {!hasFile ? (
//             <>
//               <label
//                 className={cx(
//                   "within-outline-theme-purple cursor-pointer rounded-md p-[16px] font-semibold shadow-sm hover:bg-white",
//                   playgroundView ? "border" : "bg-primary"
//                 )}
//               >
//                 Browse file
//                 <input
//                   type="file"
//                   className="sr-only"
//                   accept=".pdf"
//                   onChange={onInputChange}
//                 />
//               </label>
//               {hasNonPdfFile && (
//                 <p className="mt-6 text-red-400">Only pdf file is supported</p>
//               )}
//             </>
//           ) : (
//             <>
//               {/* {!playgroundView && (
//                 // <button
//                 //   type="button"
//                 //   className="btn-primary"
//                 //   onClick={onImportClick}
//                 // >
//                 //   Import and Continue <span aria-hidden="true">→</span>
//                 // </button>
//               )} */}
//               <p className={cx(" text-gray-500", !playgroundView && "mt-6")}>
//                 Note: {!playgroundView ? "Import" : "Parser"} works best on
//                 single column resume
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const getFileSizeString = (fileSizeB: number) => {
//   const fileSizeKB = fileSizeB / 1024;
//   const fileSizeMB = fileSizeKB / 1024;
//   if (fileSizeKB < 1000) {
//     return fileSizeKB.toPrecision(3) + " KB";
//   } else {
//     return fileSizeMB.toPrecision(3) + " MB";
//   }
// };


"use client";

import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import addPdfSrc from "public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "lib/cx";

const defaultFileState = {
  name: "",
  size: 0,
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false);
  const [uploading, setUploading] = useState(false);

  const hasFile = Boolean(file.name);

  const uploadToFlask = async (newFile: File) => {
    const formData = new FormData();
    formData.append("file", newFile);
    setUploading(true);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.file_url) {
        setFile({ name: newFile.name, size: newFile.size });
        onFileUrlChange(data.file_url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile?.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      uploadToFlask(newFile);
    } else {
      setHasNonPdfFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      uploadToFlask(newFile);
    } else {
      setHasNonPdfFile(true);
    }
  };

  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  return (
    <div
      className={cx(
        "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 ",
        isHoveredOnDropzone && "border-sky-400",
        playgroundView ? "pb-6 pt-4" : "py-12",
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div
        className={cx(
          "text-center",
          playgroundView ? "space-y-2" : "space-y-3"
        )}
      >
        {!playgroundView && (
          <Image
            src={addPdfSrc}
            className="mx-auto h-14 w-14"
            alt="Add pdf"
            aria-hidden="true"
            priority
          />
        )}
        {!hasFile ? (
          <>
            <p
              className={cx(
                "pt-3 text-gray-700",
                !playgroundView && "text-lg font-semibold"
              )}
            >
              Browse a PDF file or drop it here
            </p>
            <p className="flex text-sm text-gray-500">
              <LockClosedIcon className="mr-1 mt-1 h-3 w-3 text-gray-400" />
              File data is uploaded temporarily to Flask and used for parsing
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button
              type="button"
              className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              title="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="pt-4">
          {!hasFile ? (
            <>
              <label
                className={cx(
                  "within-outline-theme-purple cursor-pointer rounded-md p-[16px] font-semibold shadow-sm hover:bg-white",
                  playgroundView ? "border" : "bg-primary"
                )}
              >
                {uploading ? "Uploading..." : "Browse file"}
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={onInputChange}
                />
              </label>
              {hasNonPdfFile && (
                <p className="mt-6 text-red-400">Only PDF file is supported</p>
              )}
            </>
          ) : (
            <>
              <p className={cx("text-gray-500", !playgroundView && "mt-6")}>
                Note: {!playgroundView ? "Import" : "Parser"} works best on
                single-column resumes
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  return fileSizeKB < 1000
    ? fileSizeKB.toPrecision(3) + " KB"
    : fileSizeMB.toPrecision(3) + " MB";
};

