interface BookingFilterProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export function BookingFilter({ filterStatus, setFilterStatus }: BookingFilterProps) {
  return (
    <div className="flex justify-end">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer"
      >
        <option value="ALL">All Bookings</option>
        <option value="REQUESTED">Requested</option>
        <option value="ACCEPTED">Accepted</option>
        <option value="PAID">Paid</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="DECLINED">Declined</option>
      </select>
    </div>
  );
}