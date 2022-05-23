import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import {
  useNavigate,
} from 'react-router-dom';
import { Button } from "react-bootstrap";
import {  Container, Row, Col } from "react-bootstrap";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        name
        posts {
          id
          title
          content
          createdAt
          published
        }
      }
    }
  }
`;

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const goToPostsPage = (id) => navigate(`/`);

  const { data, error, loading, refetch } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  if (loading) return <p>Loading....</p>
  if (error) return <p>Ops! Something went wrong</p>


  if (error) return <div>error page</div>;

  if (loading) return <div>Spinner...</div>;
  const { profile } = data
  return (
    <div>
      {profile &&
        <>
          <div
            style={{
              marginBottom: "2rem",
              display: "flex ",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1>{profile.user.name}</h1>
              <p>{profile.bio}</p>
            </div>
            <div>
              {profile.isMyProfile ? <>
                <Container>
                  <Row>
                    <Col>
                      <Button onClick={goToPostsPage}>Posts</Button>
                    </Col><Col>
                      <AddPostModal refetchPost={refetch}
                        handleClose={handleClose}
                        handleShow={handleShow}
                        show={show}
                      /> </Col>
                  </Row> </Container>
                <>
                </>
              </> : null
              }

            </div>
          </div>
          <div>

            {profile.user.posts.map((post, index) => {
              return (
                <Post
                  refetchPost={refetch}
                  key={index}
                  title={post.title}
                  content={post.content}
                  date={post.createdAt}
                  user={profile.user.name}
                  published={post.published}
                  isMyProfile={profile.isMyProfile}
                  id={post.id}
                />
              );
            })}
          </div>
        </>
      }
    </div>
  );
}
