import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { LogOutIcon } from "lucide-react";
import { logoutActions } from "../actions";
import { redirect } from 'next/navigation'

const UserProfile = ({ user }: { user: User | null }) => {

  const handleLogIn = () => {
    redirect('/signin')
  }
  const handleSignUp = () => {
    redirect('/signup')
  }

  return user ? (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"w-64"}>
          <div className={"p-4 flex items-center space-x-4"}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className={"flex flex-col space-y-1"}>
              <p className={"text-xs font-semibold"}>{user.name}</p>
              <p className={"text-xs"}>{user.email}</p>
              <button
                onClick={async () => {
                  await logoutActions();
                }}
                className={
                  "mt-4 border-2 rounded-xl flex items-center justify-center space-x-1 border-[#ededed] text-[#8d8d8d] hover:bg-gray-200 transition duration-150"
                }
              >
                <LogOutIcon className={"w-3"} />
                <p className={"text-[10px]"}>Sign out</p>
              </button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className={"flex gap-x-3"}>
      <button className="bg-orange-600 text-white rounded-md py-1 px-2 hover:bg-orange-700" onClick={handleLogIn} >
        Log In
      </button>
      <button className="bg-orange-600 text-white rounded-md py-1 px-2 hover:bg-orange-700" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default UserProfile;
