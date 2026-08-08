import Image from "next/image";

export default function SpecializedServices() {
  const services = [
    {
      title: "Leak Repair",
      description: "Rapid detection & fixing",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Pipe Installation",
      description: "Complete system upgrades",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Water Heater Service",
      description: "Repair, replace, & maintain",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Drain Cleaning",
      description: "Clear tough clogs instantly",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section className="py-10 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 space-y-8">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Specialized Services
          </h2>
        </div>

        {/* Bento Grid Layout (Fully Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Leak Repair */}
          <div className="relative h-72 rounded-xl overflow-hidden shadow-sm bg-slate-900 group">
            <Image
              src={services[0].image}
              alt={services[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {services[0].title}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {services[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: Pipe Installation (Spans 2 columns on lg) */}
          <div className="relative h-72 lg:col-span-2 rounded-3xl overflow-hidden shadow-sm bg-slate-900 group">
            <Image
              src={services[1].image}
              alt={services[1].title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {services[1].title}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {services[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Water Heater Service (Spans 2 columns on lg) */}
          <div className="relative h-72 lg:col-span-2 rounded-3xl overflow-hidden shadow-sm bg-slate-900 group">
            <Image
              src={services[2].image}
              alt={services[2].title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {services[2].title}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {services[2].description}
              </p>
            </div>
          </div>

          {/* Card 4: Drain Cleaning */}
          <div className="relative h-72 rounded-3xl overflow-hidden shadow-sm bg-slate-900 group">
            <Image
              src={services[3].image}
              alt={services[3].title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {services[3].title}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {services[3].description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}