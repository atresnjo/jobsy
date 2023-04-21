import Layout from "@/components/layout"
import { ReactElement } from "react"

const CompaniesPage = () => {
    return (
        <h1>hi</h1>
    )
}

CompaniesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default CompaniesPage
