import React from "react";
import { useInfiniteQuery } from "react-query";
import { fetchCatFacts } from "../services";
import Item, { ItemLoader } from "../components/Item";

type CatFact = {
  fact: string;
};

const CatApp: React.FC = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      "catFacts",
      ({ pageParam }) => fetchCatFacts({ pageParam }),
      {
        getNextPageParam: (lastPage, page) => {
          return lastPage.current_page !== lastPage.last_page
            ? lastPage?.current_page + 1
            : null;
        },
      }
    );

  React.useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 20 &&
        hasNextPage &&
        !isLoading
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, fetchNextPage, isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <ItemLoader />
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div>
          <h1>Error fetching data</h1>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page?.data?.map((fact: CatFact, index: number) => (
              <Item key={`${pageIndex}-${index}`} fact={fact?.fact} />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">{renderContent()}</div>
  );
};

export default CatApp;
