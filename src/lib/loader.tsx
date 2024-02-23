import { cn } from "./utils";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <svg
      className={cn(
        "border-[3.5px] rounded-full border-black-100/30 border-t-blue-700 border-r-blue-700",
        className
      )}
    />
  );
};
