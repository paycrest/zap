import { TiInfo } from "react-icons/ti";

export const InputError = ({ message }: { message: string | any }) => (
  <div className="flex items-center gap-1 text-xs font-medium text-rose-500">
    <TiInfo />
    <p>{message}</p>
  </div>
);
