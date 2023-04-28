import { useState, type ReactElement, useEffect } from "react"
import Layout from "@/components/layout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GetServerSideProps } from "next"
import { prisma } from "../../server/db"
import { Job, JobType, Location, RemoteType } from "@prisma/client"
import { api } from "@/utils/api"
import React from "react"
import JobCard from "@/components/job-card"
import { X } from "lucide-react"
import { useInView } from "react-intersection-observer"

type PageProps = {
  jobs: Job[]
  currentCursor: number | undefined
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const jobs = await prisma.job.findMany({ take: 5, cursor: { id: 0 } })
  return {
    props: {
      jobs,
      currentCursor: jobs.pop()?.id,
    },
  }
}

const JobsPage = (props: PageProps) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>()
  const [cachedSearchTerm, setCachedSearchTerm] = useState<string | undefined>()
  const [jobType, setJobType] = useState<JobType | undefined>()
  const [remoteType, setRemoteType] = useState<RemoteType | undefined>()
  const { inView, ref } = useInView()
  const [location, setLocation] = useState<Location | undefined>()
  const [currentCursor, setCurrentCursor] = useState(props.currentCursor)
  const [initialJobs, setInitialJobs] = useState(props.jobs)

  const jobCountQuery = api.jobRouter.getTotalJobCount.useQuery()
  const {
    data: jobs,
    fetchNextPage,

    hasNextPage,
  } = api.jobRouter.getInfiniteJobs.useInfiniteQuery(
    {
      searchTerm: cachedSearchTerm,
      jobType: jobType,
      location: location,
      remoteType: remoteType,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
      initialCursor: currentCursor,
      refetchOnWindowFocus: false,
    }
  )

  const refetchJobs = () => {
    setCurrentCursor(undefined)
    setInitialJobs([])
    setCachedSearchTerm(searchTerm)
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className="flex flex-col">
      <div className="bg-background">
        <div className="pb-6 sm:pb-8">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <section className="flex flex-col items-center">
              <div className="flex max-w-screen-md flex-col items-center pt-0 pb-0 text-center sm:pt-6 sm:pb-8 lg:pb-16">
                <h2 className="tracking- mb-6 mt-2 text-3xl font-bold sm:text-5xl sm:leading-none">
                  The first job board that specializes on jobs that require
                  <span className="relative mt-2 inline-block px-2 py-2">
                    <span className="gradient-text ml-1 animate-text bg-gradient-to-r from-teal-500 via-slate-400 to-red-500 bg-clip-text font-semibold uppercase text-transparent dark:from-teal-500 dark:via-red-100 dark:to-red-300">
                      no degree!
                    </span>
                    🎓
                  </span>
                </h2>

                <p className="text-md leading-relaxed xl:text-2xl">
                  {jobCountQuery.data} Hand picked jobs. We take our time,
                  quality over quantity. 💓
                </p>

                <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                  <a
                    href="#"
                    className="group relative inline-block focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-gray-900/25 transition group-hover:rotate-0" />
                  </a>
                </div>
              </div>
            </section>
          </div>
          <div className="mx-auto mt-2 max-w-screen-md px-4 md:px-8">
            <div className="border-1 relative border border-black">
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className="h-14 w-full "
                placeholder="Search by job title..."
                required
              />
              <Button
                variant={"secondary"}
                type="submit"
                size={"sm"}
                onClick={refetchJobs}
                className="absolute right-4 bottom-2.5 shadow-button"
              >
                Search
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-2 max-w-screen-md flex-row space-y-2 px-4 md:px-8">
            <Select
              key={jobType}
              value={jobType}
              onValueChange={async (e) => {
                setInitialJobs([])
                setCurrentCursor(undefined)
                setJobType(e as JobType)
              }}
            >
              <SelectTrigger className="border-1 rounded-none border border-black">
                <SelectValue placeholder="What kind of job?" />
              </SelectTrigger>
              <SelectContent className="bg-[#F6EEE9]">
                <SelectItem value={JobType.Engineering}>
                  👨🏿‍💻 Engineering
                </SelectItem>
                <SelectItem value={JobType.Design}>🎨 Design</SelectItem>
                <SelectItem value={JobType.DevOps}>👩‍💻 DevOps</SelectItem>
                <SelectItem value={JobType.Marketing}>📣 Marketing</SelectItem>
                <SelectItem value={JobType.Support}>🎧 Support</SelectItem>
              </SelectContent>
            </Select>

            <Select
              key={remoteType}
              value={remoteType}
              onValueChange={(e) => {
                setInitialJobs([])
                setCurrentCursor(undefined)
                setRemoteType(e as RemoteType)
              }}
            >
              <SelectTrigger className="border-1 rounded-none border border-black">
                <SelectValue placeholder="What kind of remote are you after?" />
              </SelectTrigger>
              <SelectContent className="bg-[#F6EEE9]">
                <SelectItem value={RemoteType.Full}>🏖️ Full</SelectItem>
                <SelectItem value={RemoteType.Hybrid}>🏘️🏖️ Hybrid</SelectItem>
                <SelectItem value={RemoteType.None}>🏘️ None</SelectItem>
              </SelectContent>
            </Select>

            <Select
              key={location}
              value={location}
              onValueChange={(e) => {
                setInitialJobs([])
                setCurrentCursor(undefined)
                setLocation(e as Location)
              }}
            >
              <SelectTrigger className="border-1 rounded-none border border-black">
                <SelectValue placeholder="Where do you wanna work from?" />
              </SelectTrigger>
              <SelectContent className="bg-[#F6EEE9]">
                <SelectItem value={Location.Worldwide}>🌍 Worldwide</SelectItem>
                <SelectItem value={Location.Europe}>🌍 Europe</SelectItem>
                <SelectItem value={Location.NorthAmerica}>
                  🌍 North America
                </SelectItem>
                <SelectItem value={Location.SouthAmerica}>
                  🌍 South America
                </SelectItem>
                <SelectItem value={Location.Africa}>🌍 Africa</SelectItem>
                <SelectItem value={Location.Asia}>🌍 Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mx-auto mt-2 max-w-screen-md flex-row md:px-8">
          <div className="mb-10 flex">
            {jobType ? (
              <div
                onClick={() => {
                  setJobType(undefined)
                }}
                className="flex items-center"
              >
                <span className="mr-2 inline-flex cursor-pointer rounded bg-green-300 px-3.5 py-1 text-xs font-medium  ">
                  👨🏿‍💻
                  <span className="ml-1"> {jobType}</span>
                  <X className={"ml-2"} width={16} height={16} />
                </span>
              </div>
            ) : (
              <h1></h1>
            )}
            {remoteType ? (
              <div
                onClick={() => setRemoteType(undefined)}
                className="flex items-center"
              >
                <span className="mr-2 inline-flex cursor-pointer rounded bg-blue-200 px-3.5 py-1 text-xs font-medium  ">
                  🌍
                  <span className="ml-1">{remoteType}</span>
                  <X className={"ml-2"} width={16} height={16} />
                </span>
              </div>
            ) : (
              <h1></h1>
            )}
            {location ? (
              <div
                onClick={() => setLocation(undefined)}
                className="flex items-center"
              >
                <span className="mr-2 inline-flex cursor-pointer rounded bg-blue-200 px-3.5 py-1 text-xs font-medium  ">
                  🌍
                  <span className="ml-1">{location}</span>
                  <X className={"ml-2"} width={16} height={16} />
                </span>
              </div>
            ) : (
              <h1></h1>
            )}
          </div>

          {initialJobs.map((job) => {
            return <JobCard job={job} key={job.id} />
          })}
          {jobs &&
            jobs.pages?.flatMap((page, i) => {
              return (
                <div key={i}>
                  {page.jobs.map((job) => {
                    return <JobCard job={job} key={job.id} />
                  })}
                </div>
              )
            })}
          {!hasNextPage && jobs?.pages[0]?.jobs.length === 0 && initialJobs.length === 0 ? (
            <h1 className="text-center text-lg text-destructive">
              Sorry, no jobs found. 😞
            </h1>
          ) : (
            <h1 className="mt-3 text-center text-lg tracking-wide text-destructive">
              You've reached the end! 🎖️
            </h1>
          )}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}

JobsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default JobsPage
