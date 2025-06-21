import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { LogOutIcon, UserIcon, Settings } from "lucide-react";
import { logoutActions } from "../actions";
import { redirect } from "next/navigation";

const UserProfile = ({ user }: { user: User | null }) => {
  const handleLogIn = () => {
    redirect("/signin");
  };

  const handleSignUp = () => {
    redirect("/signup");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return user ? (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full hover:bg-orange-50 transition-colors"
          >
            <Avatar className="h-10 w-10 border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={user.name}
              />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-64 p-0 border-0 shadow-lg"
          align="end"
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b border-orange-100">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-orange-200">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={user.name}
                />
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 rounded-lg transition-colors">
              <UserIcon className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-sm">Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 rounded-lg transition-colors">
              <Settings className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-sm">Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem asChild>
              <button
                onClick={async () => {
                  await logoutActions();
                }}
                className="w-full flex items-center cursor-pointer hover:bg-red-50 rounded-lg transition-colors text-red-600 focus:bg-red-50"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span className="text-sm">Sign out</span>
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        onClick={handleLogIn}
        className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200"
      >
        Log In
      </Button>
      <Button
        onClick={handleSignUp}
        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default UserProfile;
