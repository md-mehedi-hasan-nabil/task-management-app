export default function Avatar({
  src = "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
}) {
  return (
    <img
      className="w-10 h-10 rounded-full border-4 border-white"
      src={src}
      alt="avatar"
    />
  );
}


