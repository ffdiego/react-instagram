import Skeleton from "react-loading-skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg border-gray-primary border-b pb-4">
      <div className="container flex justify-center">
        <Skeleton height={160} width={160} circle={true} />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">
            <Skeleton width={300} />
          </p>
          <Skeleton width={100} />
        </div>
        <div className="container flex mt-4">
          <Skeleton width={300} />
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            <Skeleton width={300} />
          </p>
        </div>
      </div>
    </div>
  );
}
