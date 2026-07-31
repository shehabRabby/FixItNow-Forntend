import Image from "next/image";
import { ShieldCheck, Clock } from "lucide-react";

export function AboutMission() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60 dark:border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[350px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop"
            alt="Electrical Work"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 order-1 lg:order-2">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            OUR MISSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Connecting you with the masters of the craft.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            In a world of &quot;good enough,&quot; we strive for perfection. Our
            mission is to eliminate the stress of home repair by curating a
            network of the top 1% of service professionals.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe that your home is your sanctuary. Every pipe fixed,
            every wire run, and every wall painted should reflect a standard
            of excellence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-lg shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Vetted Elite</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Only top 5% of applicants pass our screening.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-lg shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Rapid Response</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Instant booking and 24/7 emergency support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}