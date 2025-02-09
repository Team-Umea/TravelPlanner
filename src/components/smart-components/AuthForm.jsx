import { HashLoader } from "react-spinners";
import useAuthStore from "../../hooks/useAuthStore";

export default function AuthForm({ headline, onSubmit, children }) {
  const { status } = useAuthStore(true);

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="m-auto w-[90%] max-w-[500px] p-8 p-8 bg-slate-200 shadow-lg rounded-xl">
      <h2 className="mb-8 text-2xl text-sky-800 font-semibold">{headline}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-8 m-auto">
        {children}
      </form>
    </div>
  );
}
