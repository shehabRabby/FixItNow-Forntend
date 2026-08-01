import { CheckCircle2 } from "lucide-react";

export interface IService {
  id: string;
  name?: string;
  title?: string;
  price: number;
  location?: string;
}

interface ServiceSelectProps {
  services: IService[];
  selectedServiceId: string;
  selectedService: IService | null;
  onServiceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ServiceSelect({
  services,
  selectedServiceId,
  selectedService,
  onServiceChange,
}: ServiceSelectProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Selected Service
        </label>
        <select
          value={selectedServiceId}
          onChange={onServiceChange}
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name || service.title} - ৳{service.price}
            </option>
          ))}
        </select>
      </div>

      {selectedService && (
        <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300">
              {selectedService.name || selectedService.title}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Estimated Cost:{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">
                ৳{selectedService.price}
              </span>
            </p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
        </div>
      )}
    </div>
  );
}