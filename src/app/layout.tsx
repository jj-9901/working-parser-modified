// import "globals.css";
// // import { TopNavBar } from "components/TopNavBar";
// import { Analytics } from "@vercel/analytics/react";

// export const metadata = {
//   title: "OpenResume - Free Open-source Resume Builder and Parser",
//   description:
//     "OpenResume is a free, open-source, and powerful resume builder that allows anyone to create a modern professional resume in 3 simple steps. For those who have an existing resume, OpenResume also provides a resume parser to help test and confirm its ATS readability.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <TopNavBar />
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   );
// }

import "globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Pink top margin */}
        <div className="h-12 bg-white-200"></div>

        {children}

        {/* Pink bottom margin */}
        <div className="h-12 bg-white-200"></div>

        <Analytics />
      </body>
    </html>
  );
}
