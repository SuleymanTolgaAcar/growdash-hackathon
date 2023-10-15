import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function Stars({ rating, setRating, criteria }) {
  return (
    <div className="flex flex-row gap-1 text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          onClick={() =>
            setRating((prev) => {
              return { ...prev, [criteria]: i + 1 };
            })
          }
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"
        >
          {i < rating ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      ))}
    </div>
  );
}
