import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-[150px] xs:w-[200px] lg:w-[300px] h-9"
      />
    </div>
  );
}
