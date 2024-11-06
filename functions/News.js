import React, { useEffect, useState } from "react";
import Newsitems from "../pages/Newsitems";
import Loader from "../components/Common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Common/Header";

import TopButton from "../components/Common/TopButton";

export default function News() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/everything?q=bitcoin&sortBy=popularity,publishAt&language=en&sortBy=publishedAt&apiKey=d4bc7b9933834781ae98e7f71b593ee1&pageSize=100`;
      const response = await fetch(url);
      const parsedData = await response.json();

      // Filter out articles with [Removed] values
      const filteredArticles = parsedData.articles.filter(
        (article) =>
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage !== "[Removed]"
      );

      setData(filteredArticles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    };

    fetchNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreNews = async () => {
    const url = `https://newsapi.org/v2/everything?q=headline&language=en&sortBy=publishedAt&apiKey=d4bc7b9933834781ae98e7f71b593ee1&pageSize=12&page=${
      page + 1
    }`;

    const response = await fetch(url);
    const parsedData = await response.json();

    if (parsedData.articles.length > 0) {
      const filteredArticles = parsedData.articles.filter(
        (article) =>
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage !== "[Removed]"
      );

      setData((prevData) => prevData.concat(filteredArticles));
      setTotalResults(parsedData.totalResults);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-fluid mt-3">
            <div
              id="scrollableDiv"
              style={{
                height: "76vh",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreNews}
                hasMore={data.length < totalResults}
                scrollableTarget="scrollableDiv"
              >
                <div className="container-fluid h-10 w-full my-3 rounded-3">
                  <div className="row">
                    {!loading && data.length
                      ? data.map((element, index) => (
                          <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                            key={[element.url, index]}
                          >
                            <Newsitems
                              title={
                                element.title
                                  ? element.title.length >= 60
                                    ? element.title.slice(0, 60) + "..."
                                    : element.title
                                  : ""
                              }
                              description={
                                element.description
                                  ? element.description.length > 90
                                    ? element.description.slice(0, 90)
                                    : element.description
                                  : ""
                              }
                              imageUrl={
                                element.urlToImage
                                  ? element.urlToImage
                                  : "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                              }
                              articleUrl={element.url}
                              publishedDate={element.publishedAt}
                              sourceName={
                                element.source.name
                                  ? element.source.name.length > 20
                                    ? element.source.name.slice(0, 20)
                                    : element.source.name
                                  : ""
                              }
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </>
      )}
      <TopButton />
    </>
  );
}
