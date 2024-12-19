import { data } from "@/constants/sidebar-items";

export function searchNavMain(
  inputData: typeof data,
  searchQuery: string
): { title: string; url: string }[] | null {
  if (!searchQuery) return null;

  const query = searchQuery.toLowerCase();

  const results: { title: string; url: string }[] = [];

  inputData.navMain.forEach((nav) => {
    const filteredSubItems = nav.items.filter((item) =>
      item.title.toLowerCase().startsWith(query)
    );

    results.push(...filteredSubItems);
  });

  return results;
}
