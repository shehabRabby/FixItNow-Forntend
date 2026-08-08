import Image from "next/image";
import { Star } from "lucide-react";

export default function PopularServices() {
  const services = [
    {
      title: "Smart Lighting Setup",
      price: "From $99",
      rating: "4.9",
      description: "Installation and configuration of smart switches, dimmers, and integrated lighting...",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Panel Upgrades",
      price: "Est. $800+",
      rating: "5.0",
      description: "Upgrade your home's electrical capacity safely to support modern appliances and...",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Outlet Replacement",
      price: "From $65",
      rating: "4.8",
      description: "Replace broken, outdated, or ungrounded outlets for improved safety and aesthetics.",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 space-y-8">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Popular Electrical Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold rounded-full shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
                      {item.title}
                    </h3>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full shrink-0">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}