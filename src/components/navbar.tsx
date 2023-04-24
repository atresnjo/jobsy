import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import { useAuth, useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Fingerprint, Key, LogOut, User } from "lucide-react"
import { useRouter } from "next/router"

const Navbar = () => {
  const clerkAuth = useAuth();
  const { user } = useUser()
  const router = useRouter()

  const renderMenu = () => {
    if (clerkAuth.isSignedIn) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://pbs.twimg.com/profile_images/1621252507052789768/-wirgAPa_400x400.jpg" />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuLabel>
              {user?.primaryEmailAddress?.emailAddress}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href={"/dashboard/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await clerkAuth.signOut()
                  await router.push("/auth/sign-in/[[...index]]")
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"> Account 🔒</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
          >
            <Fingerprint className="mr-2 items-center align-middle  h-4 w-4" />
            <Link href="/auth/sign-in/[[...index]]" >
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
          >
            <Key className="mr-2 items-center align-middle  h-4 w-4" />

            <Link href="/auth/sign-up/[[...index]]" >
              Create an Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 ">
      <div className="space-x-4 container mx-auto flex h-16 items-center">
        <a className="animate-bounce" href="https://twitter.com/atresnjo1">
          💘
        </a>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4 ">
            <NavigationMenuItem>
              <Link href="/jobs" legacyBehavior passHref>
                <NavigationMenuLink className="tracking-widest">
                  jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/companies" legacyBehavior passHref>
                <NavigationMenuLink className="tracking-widest">
                  companies
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {renderMenu()}
        <a href="#">
          <Button variant={"default"}>Post a Job</Button>
        </a>
      </div>
    </header >
  )
}

export default Navbar
