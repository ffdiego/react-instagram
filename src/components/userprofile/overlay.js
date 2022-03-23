export default function Overlay() {
  return (
    <div className="bg-gray-overlay text-white h-screen w-screen top-0 left-0 fixed py-6 px-60">
      <div className="bg-white h-full mx-auto rounded-lg drop-shadow-2xl flex justify-between">
        <div className="container h-full">
          <img
            className="h-full rounded-l-lg"
            src="/images/users/raphael/4.jpg"
          />
        </div>
        <div className="w-500px">
          <h1>Hello!</h1>
        </div>
      </div>
    </div>
  );
}
