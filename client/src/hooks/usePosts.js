import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    //console.log("Sorting just worked out");
    if (sort) {
      return [...posts].sort((a, b) => a.item[sort].localeCompare(b.item[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  //searching by Title
  const sortedAndSearhedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearhedPosts;
};
