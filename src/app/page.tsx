// import { Hero } from "home/Hero";
// import { Steps } from "home/Steps";
// import { Features } from "home/Features";
// import { Testimonials } from "home/Testimonials";
// import { QuestionsAndAnswers } from "home/QuestionsAndAnswers";

// export default function Home() {
//   return (
//     <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
//       <Hero />
//       <Steps />
//       <Features />
//       <Testimonials />
//       <QuestionsAndAnswers />
//     </main>
//   );
// }

"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/resume-parser");
  };

  return (
    <main className="flex h-screen items-center justify-center bg-yellow-50">
      <button
        onClick={handleClick}
        className="font-mono text-4xl px-12 py-8 bg-yellow-300 text-black shadow-2xl rounded-xl hover:bg-black hover:text-white transition-all duration-300 m-8 transform -translate-y-12"
      >
        Go to Resume Parser
      </button>
    </main>
  );
}

