import { type NextPage } from "next"
import Head from "next/head"
import Layout from "../components/layout"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>jobby</title>
        <meta name="description" content="jobby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

//@ts-ignore
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
