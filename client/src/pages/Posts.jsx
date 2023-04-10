import React, { useEffect, useRef, useState } from "react";
import MongoClient from "mongodb";
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import MySelect from "../components/UI/select/MySelect";
import Pagination from "../components/UI/pagination/Pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearhedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const uri = "mongodb+srv://solarcoasterst:d3dx12.dll@cluster0.eiej6fc.mongodb.net/local_library?retryWrites=true&w=majority";

  useEffect(() => {
    const fetchPosts = async () => {
      const client = MongoClient(uri);
      await client.connect();
      //await listDatabases(client);
      const db = client.db("local_library");
      const posts = await db.collection("posts").find({}).toArray();
      setPosts(posts);
      console.log(posts);
      await client.close();
    };

    fetchPosts();
  }, []);

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.data.length;
      //console.log(totalCount);
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.item.title !== post.item.title));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 15 }} onClick={() => setModal(true)}>
        Create Post
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <div style={{ display: "flex" }}>
        <MySelect
          value={filter.sort}
          onChange={(selectedSort) =>
            setFilter({ ...filter, sort: selectedSort })
          }
          defaultValue="Sort"
          options={[
            { value: "creator", name: "By Author" },
            { value: "title", name: "By Title" },
          ]}
        />

        <MySelect
          value={limit}
          onChange={(value) => setLimit(value)}
          defaultValue="Number of elements on page"
          options={[
            { value: 5, name: "5" },
            { value: 10, name: "10" },
            { value: 25, name: "25" },
            { value: -1, name: "Show all" },
          ]}
        />
      </div>

      {postError && <h1>An error has occurred ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearhedPosts}
        title="Posts"
      />

      <div ref={lastElement} /*style={{height: 20, background: 'red'}}*/></div>

      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
};

export default Posts;
