import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/Theme/theme-provider";

interface Props {
  className?: string;
}

export function ModeToggle({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const clickHandler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <>
      <Button
        variant={"ghost"}
        className={className}
        size="icon"
        onClick={clickHandler}
      >
        <div className="w-full hidden dark:flex dark:justify-between text-muted-foreground">
          Light Mode <Sun size={20} />
        </div>
        <div className="flex justify-between w-full dark:hidden text-muted-foreground">
          Dark Mode <Moon size={20} />
        </div>
      </Button>
    </>
  );
}
