import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Avatar, Card, Row, Col, Divider, Image } from "antd";
import moment from "moment";
function App() {
  const [page, setPage] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);

  const callApi = () => {
    axios
      .get("https://maqe.github.io/json/authors.json")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });

    axios
      .get("https://maqe.github.io/json/posts.json")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  };

  useEffect(() => {
    if (page === 1) {
      if (authors.length === 0 && posts.length === 0) {
        callApi();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const ForumList = () => {
    const getAuthor = (authorId) => {
      return authors.find((author) => author.id === authorId);
    };

    return (
      <>
        {posts.map((post) => {
          const author = getAuthor(post.author_id);
          return (
            <Row gutter={16} key={post.id} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Card>
                  <Row gutter={16}>
                    <Col span={24}>
                      <div className="author-info">
                        <Avatar src={author.avatar_url} />
                        <div className="author-details">
                          <span className="author-name">{author.name}</span>
                          <span className="post-date">
                            posted on
                            {moment(post.created_at).format(
                              "dddd, MMMM D, YYYY, HH:mm"
                            )}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={16}>
                    <Col span={6}>
                      <Image
                        alt="example"
                        src={post.image_url}
                        width="100%"
                        height="auto"
                        placeholder={<div className="image-loading" />}
                        className="image-fade-in"
                      />
                    </Col>
                    <Col span={18}>
                      <Card.Meta title={<h3>{post.title}</h3>} />
                      <div style={{ marginTop: 16 }}>{post.body}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          );
        })}
      </>
    );
  };

  return (
    <div className="App">
      {page === 0 ? (
        <div className="container">
          <div className="circle">
            <div className="letter">M</div>
          </div>
          <div className="circle">
            <div className="letter">A</div>
          </div>
          <div className="circle">
            <div className="letter rotate">Q</div>
          </div>
          <div className="circle">
            <div className="letter">E</div>
          </div>
          <div className="line"></div>
        </div>
      ) : (
        <div className="post-container">
          <div className="card-container">
            <Card
              title="MAQE Forum"
              bordered={false}
              styles={{ backgroundColor: "#eeeeee" }}
            >
              <p>Your current timezone is: Asia/Bangkok</p>
              <ForumList />
            </Card>
          </div>
        </div>
      )}

      {page === 0 ? (
        <button className="button" onClick={() => setPage(1)}>
          Go to CSS Styling Page
        </button>
      ) : (
        <button className="button" onClick={() => setPage(0)}>
          Go to Template and Styling Page
        </button>
      )}
    </div>
  );
}

export default App;
