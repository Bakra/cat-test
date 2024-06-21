export const fetchRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api");
  if (!response.ok) {
    throw new Error("Failed to fetch random user");
  }
  const data = await response.json();
  return data.results[0];
};

export const fetchCatFacts = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const response = await fetch(
    `https://catfact.ninja/facts?page=${pageParam}&limit=50`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cat facts");
  }
  const data = await response.json();
  return data;
};
