import { type NextPage } from "next"
import Head from "next/head"
import Layout from "@/components/layout"
import type { ReactElement, ReactNode } from 'react';

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

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const LayoutWrapper: NextPageWithLayout = Home;

LayoutWrapper.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export default Home
