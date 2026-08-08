import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function FeaturedProfessionals() {
  const professionals = [
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      role: "Master Electrician & Smart Home Specialist",
      rating: "4.9",
      reviews: "128",
      description: "Specializing in whole-home electrical modernizations, smart panel installations, and complex troubleshooting.",
      price: "$95/hr",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
      featured: true,
    },
    {
      id: "david-chen",
      name: "David Chen",
      company: "Premium Plumbing Services",
      rating: "4.8",
      reviews: "94",
      description: "Expert pipe repair, luxury fixture installation, and emergency leak resolution.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85",
      featured: false,
    },
    {
      id: "pristine-spaces",
      name: "Pristine Spaces Co.",
      company: "Deep Cleaning Specialists",
      rating: "5.0",
      reviews: "215",
      description: "Comprehensive home detailing, move-in/out sanitization, and eco-friendly practices.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=85",
      featured: false,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 space-y-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured Professionals
          </h2>

        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Featured Large Card (Sarah Jenkins) */}
          {professionals
            .filter((p) => p.featured)
            .map((pro) => (
              <div
                key={pro.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
              >
                {/* Image side */}
                <div className="relative md:w-1/2 h-64 md:h-auto bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={pro.image}
                    alt={pro.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                      Verified Pro
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{pro.rating}</span>
                      <span className="text-slate-400 font-normal">({pro.reviews} Reviews)</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
                      {pro.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {pro.role}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {pro.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Starting at</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">{pro.price}</span>
                    </div>
                    <span className="py-2 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {/* Right Column: Other Professionals Grid */}
          <div className="flex flex-col gap-6">
            {professionals
              .filter((p) => !p.featured)
              .map((pro) => (
                <div
                  key={pro.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-5 group"
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <Image
                      src={pro.image}
                      alt={pro.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{pro.rating}</span>
                      <span className="text-slate-400 font-normal">({pro.reviews} Reviews)</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white transition-colors">
                        {pro.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {pro.company}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {pro.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>

        </div>

      </div>
    </section>
  );
}