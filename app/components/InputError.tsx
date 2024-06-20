import { BsExclamationTriangle } from "react-icons/bs";

export const InputError = ({ message }: { message: string | any }) => (
  <div className="flex items-center gap-1 text-xs font-medium text-rose-500">
    <BsExclamationTriangle />
    <p>{message}</p>
  </div>
);
