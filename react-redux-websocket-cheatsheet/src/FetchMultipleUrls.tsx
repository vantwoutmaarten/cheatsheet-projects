import { useEffect, useState } from "react";

interface Post {
  title: string;
}
interface Photo {
  title: string;
}

const FetchMultipleUrls = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const requestArr: Promise<Response>[] = [
      fetch("https://jsonplaceholder.typicode.com/posts"),
      //   Promise.reject(),
      fetch("https://jsonplaceholder.typicode.com/comments"),
      fetch("https://jsonplaceholder.typicode.com/photos"),
    ];

    const requestAll = async () => {
      try {
        const responses = await Promise.allSettled(requestArr);
        const succesArr: Response[] = [];
        responses.map((response) => {
          if (response.status === "fulfilled") {
            succesArr.push(response.value);
          }
        });

        if (succesArr.length === 0) {
          throw new Error("All fetches failed");
        }
        const results = await Promise.all(
          succesArr.map((item) => {
            if (item) {
              return item.json();
            }
          })
        );
        console.log(results);
        setPosts(results[0]);
        setComments(results[1]);
        setPhotos(results[2]);
      } catch (error) {
        console.log("Multiple Fetch Failed");
      }
    };
    requestAll();
  }, []);

  //   Alternatively do something like this, its similar to Promise.allSettled
  // axios
  //   .all([get1, get2])
  //   .then(
  //     axios.spread((response1, response2) => {
  //     axios.spread((...allData) => {
  //       // Both requests are completed
  //       console.log("Posts:", response1.data);
  //       console.log("Comments:", response2.data);
  //     })
  //   )
  //   .catch((error) => {
  //     console.error("One or more requests failed:", error);
  //   });

  return (
    <>
      {/* {posts.map((post: Post, index: number) => (
        <p key={index}>{post.title}</p>
      ))} */}
      {photos.map((photo: Photo, index: number) => {
        return <p key={index}>{photo.title}</p>;
      })}
    </>
  );
};

export default FetchMultipleUrls;
