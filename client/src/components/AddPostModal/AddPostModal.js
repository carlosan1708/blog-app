import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        title
        createdAt
        content
        user {
          name
        }
      }
    }
  }
`;

export default function AddPostModal(props) {

  const {refetchPost, handleClose, handleShow, show} = props;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [addPost, {data}] = useMutation(CREATE_POST);
  const handleClick = async () => {
    await addPost({
      variables: {
        title,
        content,
      },
    });
    if (data?.postCreate?.userErrors && data?.postCreate?.userErrors.length > 0) {
      alert( `Submission error! ${data.postCreate.userErrors[0].message}`)
    } 
    await refetchPost();
    handleClose()
  };



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  );
}
