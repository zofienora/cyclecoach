"use client";


export default function Suggestions() {

  return (
   <section className="rounded-lg p-4 h-screen">
    <h2 className="text-2xl font-bold font-heading text-foreground text-center py-8">
      Explore
    </h2>
    <div className="">
        <div className="bg-primary rounded-lg p-10 mt-5 mb-5">
            <p className="text-lg font-bold font-heading text-white uppercase text-center pt-10 pb-10">Upcoming Phase</p>
        </div>
        <div className="border-2 border-secondary rounded-lg p-10 mt-5 mb-5">
            <p className="text-lg font-sans text-center pt-10 pb-10">Text</p>

        </div>
        <div className="border-2 border-alert rounded-lg p-10 mt-5 mb-5">
            <p className="text-lg font-sans text-center pt-10 pb-10">Text</p>
        </div>
    </div>

   </section>
  );
}