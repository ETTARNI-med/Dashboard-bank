"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const [data, setData] = useState<User[]>([]);
  const [user, setUser] = useState<(User | undefined)[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/v1/users/allusers"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const id = "656909592bc5e1439783b639";
    const user: (User | undefined)[] = data.map((chrink) => {
      if (chrink._id === id) {
        return chrink;
      }
    });
    console.log(user);
    setUser(user);
  }, [data]);

  const currentUser =
    typeof user[0] !== "undefined"
      ? user[0]
      : {
          _id: "",
          email: "",
          user_name: "",
          first_name: "",
          last_name: "",
          user_image: "",
          role: "",
          creation_date: "",
        };
  const {
    
    creation_date,
    email,
    user_name,
    user_image,
    first_name,
    last_name,
  } = currentUser;
  const newDate = new Date(creation_date).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(newDate);
  const message = (
    <Alert>
      <AlertTitle className="flex justify-between items-center pb-3">
        Profile Updated!
        <X size={14} onClick={() => setTitle(false)} />
      </AlertTitle>
      <AlertDescription>
        Your profile has been updated successfully.
      </AlertDescription>
    </Alert>
  );
  const [title, setTitle] = useState(false);
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 items-center justify-start w-[80vw] mx-auto space-y-4">
      <div className="w-80 flex justify-between items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src={user_image} alt={user_name} />
          <AvatarFallback>
            {first_name?.charAt(0).toUpperCase() +
              last_name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
      </div>
      <div className="flex justify-center">
        <p>Member since : {newDate}</p>
      </div>
      <div className="sm:col-span-1 self-end space-y-2 sm:space-y-4">
        <Label className="ml-2">Username</Label>
        <Input placeholder="Mohamed Ettarni" defaultValue={user_name} />
      </div>
      <div className="sm:col-span-1 self-end space-y-2 sm:space-y-4">
        <Label className="ml-2">Email</Label>
        <Input placeholder="Ettarnimohamed@gmail.com" defaultValue={email} />
      </div>
      <div className="sm:col-span-1 self-end space-y-2 sm:space-y-4">
        <Label className="ml-2">First Name</Label>
        <Input placeholder="Mohamed" defaultValue={first_name} />
      </div>
      <div className="sm:col-span-1 self-end space-y-2 sm:space-y-4">
        <Label className="ml-2">last Name</Label>
        <Input placeholder="Ettarni" defaultValue={last_name} />
      </div>
      <div className="sm:col-span-1 self-end space-y-2 sm:space-y-4">
        <Label className="ml-2">New Password</Label>
        <Input type="password" />
      </div>
      <div className="sm:col-span-1 self-end space-y-2 sm:space-y-4">
        <Label className="ml-2">Password</Label>
        <Input type="password" />
      </div>
      <div className="sm:col-span-2 ml-auto">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            setTitle(true);
            setTimeout(() => {
              setTitle(false);
            }, 3000);
          }}
          type="button"
        >
          Update profile
        </Button>
      </div>
      <div className="absolute bottom-4 right-4">{title && message}</div>
    </form>
  );
}
