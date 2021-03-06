import React, { useState, useEffect , useCallback} from "react";
import {
  useNavigate,
} from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";
import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      userErrors {
        message
      }
      token
      userId
    }
  }
`;

export default function Signin() {
  const navigate = useNavigate();
  const [signup, { data}] = useMutation(SIGNUP);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToPostsPage = useCallback((id) => navigate(`/profile/${id}`),[navigate]);

  const handleClick = () => {
    signup({
      variables: {
        email,
        password,
      },
    });
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors[0].message);
      }
      if (data.signin.token && data.signin.userId) {
        localStorage.setItem("token", data.signin.token);
        goToPostsPage(data.signin.userId);
      }
    }
  }, [data, goToPostsPage]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
