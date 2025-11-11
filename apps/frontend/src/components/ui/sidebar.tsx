import { Link } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";
import { createContext, PropsWithChildren, useState, useContext } from "react";
import { cn } from "~/lib/constants";
import { Button } from "./button";

interface SidebarContextType {
  setIsActive: (active: boolean) => void;
  active: boolean;
  className?: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps extends PropsWithChildren {
  className?: string;
}

export const Sidebar = ({ children, className }: SidebarProps) => {
  const [active, setIsActive] = useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{ active, setIsActive }}>
      <div className={cn("relative flex flex-col w-full h-full", className)}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

interface SidebarItemProps extends PropsWithChildren {
  active?: boolean;
  icon: LucideIcon;
  link: string;
  className?: string;
}

export const SidebarItem = ({
  children,
  active,
  icon,
  link,
  className,
}: SidebarItemProps) => {
  const { active: sidebarActive } = useSidebarContext();

  const isActive = sidebarActive === !!active;
  const Icon = icon;

  return (
    <div
      className={cn(
        "relative  w-full h-full ",
        isActive ? "" : "bg-zinc-800",
        className,
      )}
    >
      <Link to={link} className="flex justify-around px-2 py-1 w-full h-full">
        <Icon className="w-6 h-6" />
        <h3>{children}</h3>
      </Link>
    </div>
  );
};

SidebarItem.displayName = "SidebarItem";

type UserProps = {
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
};
interface SidebarAvatarProps extends PropsWithChildren {
  className?: string;
  User: UserProps;
}

export const SidebarAvatar = ({ className, User }: SidebarAvatarProps) => {
  const { name, email, emailVerified, createdAt } = User;
  const PickTheFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase();
  };
  const isVerified = emailVerified ? "" : "before:content-[!]";

  return (
    <div
      className={cn(
        "relative  w-full mt-4 mb-4",

        className,
      )}
    >
      <div
        className={cn(
          " flex bg-transparent gap-x-4 rounded-md p-2 ",
          isVerified,
        )}
      >
        <div className=" bg-[#00C951] border border-zinc-400 rounded-sm w-10 h-10 flex items-center justify-center">
          <Button variant="ghost" className="w-6 h-6">
            {PickTheFirstLetter(name)}
          </Button>
        </div>
        <div
          aria-label="userDetails"
          className="flex flex-col items-start justify-center w-full h-full"
        >
          <h4 className="text-sm font-semibold text-white">{name}</h4>
          <p className="text-xs text-zinc-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

SidebarAvatar.displayName = "SidebarAvatar";
export default Sidebar;

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a Sidebar");
  }
  return context;
};
