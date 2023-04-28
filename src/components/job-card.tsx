import { Job } from "@prisma/client"
import { formatSalary } from "../lib/formatNumbers"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import { api } from "@/utils/api"
import toast from "react-hot-toast"
dayjs.extend(relativeTime)

type Props = {
  job: Job
  isLiked?: true
  onLikeUpdate?(): void
}

const JobCard = (props: Props) => {
  const likeJobMutation = api.userRouter.likeJob.useMutation()
  const unlikeJobMutation = api.userRouter.unlikeJob.useMutation()

  const updateLikeStatus = async () => {  
    if (!props.isLiked) {
      await toast.promise(
        likeJobMutation.mutateAsync({ jobId: props.job.id }),
        {
          loading: "Liking job...",
          success: "Successfully liked job",
          error: "There was an error liking the job",
        },
        {
          success: {
            duration: 1000,
            icon: '💗',
          },
        }
      )
    }
    else {
      await toast.promise(
        unlikeJobMutation.mutateAsync({ jobId: props.job.id }),
        {
          loading: "Unliking job...",
          success: "Successfully unliked job",
          error: "There was an error unliking the job",
        },
        {
          success: {
            duration: 1000,
            icon: '💗',
          },
        }
      )
    }

    if (props.onLikeUpdate)
      props.onLikeUpdate()
  }

  return (
    <div className="group flex  transform cursor-pointer border-2 border-black bg-background p-3 shadow-button transition duration-500 hover:bg-[#F6EEE9] sm:p-2">
      <div className="absolute flex -top-4 right-1/2 text-2xl ">        
        <button onClick={updateLikeStatus}>
          <span className="hidden group-hover:flex animate-bounce duration-1000">💗</span>
        </button>
      </div>
      <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <img
          className="aspect-square h-full w-full"
          loading="lazy"
          alt="company logo"
          src={
            "https://inaj.io/_next/image?url=https%3A%2F%2Ff005.backblazeb2.com%2Ffile%2Finaj-company-logos%2F964786342eaf739974297fb57636e34e.png&w=64&q=75"
          }
        />
      </div>

      <div className="mt-4 w-full sm:ml-8 sm:mt-0">
        <div className="flex flex-row">
          <a
            href={`job/${props.job.slug}`}
            className="text-ellipsis text-lg font-bold underline-offset-2 hover:underline"
          >
            {props.job.title}
          </a>
          <div className="flex flex-1 justify-end">
            <span className="mt-1 text-sm opacity-60">
              {dayjs(props.job.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <h1 className="text-lg font-medium">{props.job.companyName}</h1>

        <a
          href={props.job.applyLink}
          className="absolute right-2.5 hidden rounded-lg bg-yellow-200 px-4 py-2 text-sm font-bold shadow-button hover:bg-yellow-300 group-hover:block"
        >
          🏆 Apply now
        </a>

        <div className="mt-4 space-y-3 sm:flex sm:items-center sm:gap-2 sm:space-y-0">
          {props.job.remoteType && (
            <div className="flex items-center ">
              <span className="mr-2 inline-flex items-center rounded bg-blue-200 px-2.5 py-0.5 text-xs font-medium ">
                🏖️ <span className="ml-1">{props.job.remoteType} Remote </span>
              </span>
            </div>
          )}
          {props.job.location && (
            <div className="flex items-center">
              <span className="mr-2 inline-flex items-center rounded bg-blue-300 px-2.5 py-0.5 text-xs font-medium ">
                🌍 <span className="ml-1">{props.job.location}</span>
              </span>
            </div>
          )}
          {props.job.currency && (
            <div className="flex items-center">
              <span className="mr-2 inline-flex items-center rounded bg-green-200 px-2.5 py-0.5 text-xs font-medium ">
                💰
                <span className="ml-1">
                  {formatSalary(
                    Number(props?.job.fromSalary),
                    props?.job.currency
                  )}
                </span>
                <span>-</span>
                <span>
                  {formatSalary(
                    Number(props?.job.toSalary),
                    props?.job.currency
                  )}
                </span>
              </span>
            </div>
          )}
          <div className="flex items-center">
            <span className="mr-2 inline-flex items-center rounded bg-green-300 px-2.5 py-0.5 text-xs font-medium ">
              {props.job.jobType}
            </span>
          </div>
        </div>
      </div>
    </div >
  )
}

export default JobCard
