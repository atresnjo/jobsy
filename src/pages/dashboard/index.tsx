import Layout from "@/components/layout"
import { useAuth } from "@clerk/nextjs"
import { ReactElement } from "react"


const DashboardPage = () => {
    const auth = useAuth()

    return (
        <h1>hi {auth.userId}</h1>
    )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default DashboardPage