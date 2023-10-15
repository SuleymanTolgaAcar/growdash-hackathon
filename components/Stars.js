import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function Stars({ rating }) {
  return (
    <div className="flex flex-row gap-1 text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i}>{i < rating ? <AiFillStar /> : <AiOutlineStar />}</div>
      ))}
    </div>
  );
}
