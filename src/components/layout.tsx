import { type PropsWithChildren } from "react"
import Navbar from "./navbar"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-background py-8">{children}</div>
    </>
  )
}

export default Layout
