interface TransactionDetailsProps {
  title: string;
  details: string | number;
  border?: boolean;
}

export const TransactionDetails = ({
  title,
  details,
  border = true,
}: TransactionDetailsProps) => {
  return (
    <div
      className={`flex items-center justify-between border-dashed border-white/10 px-4 py-3 font-normal text-gray-500 dark:text-white/50 ${
        border ? "border-b" : ""
      }`}
    >
      <p>{title}</p>
      <p className="rounded-full bg-white px-2 py-1 dark:bg-neutral-900">
        {details}
      </p>
    </div>
  );
};
