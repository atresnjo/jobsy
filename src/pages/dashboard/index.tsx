import JobCard from "@/components/job-card"
import Layout from "@/components/layout"
import { api } from "@/utils/api"
import { useAuth } from "@clerk/nextjs"
import { buildClerkProps, clerkClient, getAuth } from "@clerk/nextjs/server"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { userId } = getAuth(ctx.req)
    const user = userId ? await clerkClient.users.getUser(userId) : undefined;
    if (!user) {
        return {
            redirect: {
                destination: '/auth/sign-in',
                permanent: false,
            },
        }
    }

    return { props: { ...buildClerkProps(ctx.req, { user }) } }
}

const DashboardPage = () => {
    const auth = useAuth()
    const getLikedJobs = api.userRouter.getLikedJobs.useQuery()

    return (
        <div className="p-2 justify-center space-y-10 flex flex-col pt-10 ">
            <div className="flex flex-row  text-center justify-center">
                <h1 className="text-center text-2xl ">
                    Hey {auth?.userId}. You currently have {getLikedJobs.data?.length} liked
                    jobs.
                </h1>
            </div>
            <div className="mx-auto mt-2 max-w-screen-md w-full flex-row md:px-8">
                {getLikedJobs?.data?.map((likedJob) => {
                    return <JobCard onLikeUpdate={() => {
                        getLikedJobs.refetch()
                    }} isLiked={true} job={likedJob.job} key={likedJob.jobId} />
                })}
            </div>
        </div>
    )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default DashboardPage