import { ModeToggle } from "@/components/Theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DataBank from "../../Data/DataBank.json";

export function UserNav() {
  const navigate = useNavigate();
  const [bankAccountData, setBankAccountData] = useState(null);

  useEffect(() => {
    setBankAccountData(DataBank.bank_account);
  }, []);
  return (
    <>
      {bankAccountData && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1702155637~exp=1702156237~hmac=6b108931d9a033bcd81c78ce9015ea3520e2e527c9842d06ee299bf3e877bad9"
                  alt="@khalid_arkx"
                />
                <AvatarFallback>KE</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Mohamed Ettarni
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {bankAccountData.account_number}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-transparent justify-start w-56 -ml-4"
                  >
                    Profile
                  </TabsTrigger>
                </TabsList>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <ModeToggle className="w-full" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="py-4 cursor-pointer text-muted-foreground"
              onClick={() => navigate("/")}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
