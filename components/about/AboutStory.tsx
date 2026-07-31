import Image from "next/image";

const stats = [
  { value: "50k+", label: "Services Completed" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "12+", label: "Cities Covered" },
];

export function AboutStory() {
  return (
    <section id="our-story" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Crafting a New Era
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            FixItNow began with a simple observation: finding a reliable,
            high-quality plumber or electrician was harder than it should be.
            Homeowners were left guessing about who was entering their sanctuary.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Driven by a passion for craftsmanship and background in technology,
            we built a platform that treats home service as a premium experience.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                  {stat.value}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
            alt="Team of experts"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-6 right-6 bg-blue-600 text-white p-4 rounded-xl max-w-xs shadow-lg">
            <p className="text-xs italic font-medium">
              &quot;Quality is not an act, it is a habit.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}