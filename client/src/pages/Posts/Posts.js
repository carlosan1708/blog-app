import React from "react";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";
import { Button, Navbar, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { error, loading, data } = useQuery(GET_POSTS,{
    fetchPolicy: 'network-only'
  });
  const navigate = useNavigate();

  if (error) return <div>Error Page</div>;

  if (loading) return <div>Spinner...</div>;
  
  const routeChange = (routePath) =>{ 
    navigate(routePath);
  }

  const { posts } = data;

  return (
    <>
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">Blog test graphql</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse  className="justify-content-end" style={{padding:"1rem"}} >
            <Row>
            <Col>
              <Button as="input" type="button" value="SignIn"
              onClick={() => routeChange('signin')} />
              </Col>
              <Col>
              <Button as="input" type="button" value="SignUp" 
              onClick={() => routeChange('signup')}/></Col>
              </Row>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        {posts.map((post, index) => {
          return (
            <Post
              key={index}
              title={post.title}
              content={post.content}
              date={post.createdAt}
              id={post.id}
              user={post.user.name}
            />
          );
        })}
      </div>
    </>
  );
}
