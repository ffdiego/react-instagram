export default function Photo({ photo }) {
  return (
    <span className="bg-black-light flex justify-center max-w-2xl">
      <img
        className="self-center h-auto max-h-full object-cover w-auto"
        src={photo?.imageSrc}
        alt={photo?.caption}
      />
    </span>
  );
}
