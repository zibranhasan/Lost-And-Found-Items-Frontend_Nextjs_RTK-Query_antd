import Link from "next/link";
import Image from "next/image";

const LostItemCard = ({ item }: any) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md transition-transform transform hover:scale-105">
      <div className="flex flex-col md:flex-row items-center">
        <Image
          src={item.photo}
          height={150}
          width={150}
          alt="item's photo"
          className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {item.name}
          </h2>
          <p className="text-sm overflow-hidden text-ellipsis max-h-12 line-clamp-2">
            {item.description}
          </p>
          <p className="text-xs text-gray-600">Location: {item.location}</p>
          <Link
            href={`/dashboard/user/components/edit/${item.id}`}
            className="mt-2 text-blue-500 font-bold transition-colors hover:text-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LostItemCard;
