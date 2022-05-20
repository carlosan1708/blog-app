import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";

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
  const { id } = useParams();
  const [needsReload, setNeedsReload] = useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, error, loading, refetch } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });
  useEffect(() => {
    setNeedsReload(false);
  }, [needsReload])

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
            <div>{profile.isMyProfile ? <AddPostModal setNeedsReload={setNeedsReload}
              handleClose={handleClose}
              handleShow={handleShow}
              show={show}
            /> : null}</div>
          </div>
          <div>

            {profile.user.posts.map((post, index) => {
              return (
                <Post
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
