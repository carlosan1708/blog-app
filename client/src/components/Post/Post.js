import React from "react";
import "./Post.css";
import { gql, useMutation } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation unpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;

export default function Post({
  refetchPost,
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, { loadingP, errorP }] = useMutation(PUBLISH_POST);
  const [unpublishPost,  { loadingU, errorU }] =
    useMutation(UNPUBLISH_POST);


  if (loadingP || loadingU) return 'Submitting...';
  if (errorP ) return `Submission error! ${errorP.message}`;
  if (errorU) return `Submission error! ${errorU.message}`;

  const formatedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={async () => {
            await publishPost({
              variables: {
                postId: id,
              },
            });
            refetchPost();
          }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={async () => {
            await unpublishPost({
              variables: {
                postId: id,
              },
            });
            refetchPost();
          }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
