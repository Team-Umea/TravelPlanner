import { BsListTask } from "react-icons/bs";

export default function ActivityCountBadge({ activities }) {
  return (
    <div className="flex items-center gap-2">
      <BsListTask size={24} />
      <p>Planned activities {activities}</p>
    </div>
  );
}
