export default function DataLabel({ data, label }) {
  return (
    <div className="flex gap-x-2 h-fit">
      <p className="text-slate-800 font-bold">{label}</p>
      <p>{data}</p>
    </div>
  );
}
