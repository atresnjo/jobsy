import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 ">
      <div className="container mx-auto flex h-16 items-center">
        <div className="hidden items-center md:flex">
          <a className="animate-bounce" href="https://twitter.com/atresnjo1">
            💘
          </a>
        </div>
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
        <a href="#">
          <Button variant={"outline"}>Post a Job</Button>
        </a>
      </div>
    </header>
  )
}

export default Navbar
