import { useQuery } from "react-query";
import { fetchRandomUser } from "../services";

export const ItemLoader = () => (
  <div className="animate-pulse ">
    <div className="flex items-center justify-start">
      <div className="rounded-full bg-slate-500 h-12 w-12"></div>
      <div className="h-4 w-1/6 bg-slate-500 ml-4 rounded"></div>
    </div>
    <div className="h-4 w-4/6 bg-slate-500 ml-4 rounded mt-2"></div>
  </div>
);

const Item = ({ fact }: { fact: string }) => {
  const {
    isLoading,
    data,
  }: {
    isLoading: boolean;
    data: any;
  } = useQuery({
    queryKey: [fact?.slice(0, 10)],
    queryFn: fetchRandomUser,
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      {isLoading ? (
        <ItemLoader />
      ) : (
        <div className="">
          <div className="flex items-center justify-start">
            <img
              alt={data?.email}
              className="rounded-full h-12 w-12 mr-4"
              src={data?.picture?.medium}
            />
            <span className="font-semibold text-lg">
              {`${data?.name?.title} ${data?.name?.first} ${data?.name?.last}`}{" "}
            </span>
          </div>
          <p className="mt-4">{fact}</p>
        </div>
      )}
    </div>
  );
};

export default Item;
