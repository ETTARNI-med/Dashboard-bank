"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Plugs/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="ml-1" htmlFor="email">
              Enter Your Account Number
            </Label>
            <Input
              id="Account"
              placeholder="Enter Account number"
              type="number"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              pattern="[0-9]*"
              inputMode="numeric"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="ml-1" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}
