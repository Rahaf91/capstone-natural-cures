import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styled from "styled-components";

export default function LoginView() {
  const { query } = useRouter();
  const callbackUrl = query.callbackUrl || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = res.url || callbackUrl;
    }
  };

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl });
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledButton type="submit" variant="credentials">
          Sign in with Credentials
        </StyledButton>
      </Form>
      <StyledButton
        variant="google"
        onClick={() => handleOAuthSignIn("google")}
      >
        Sign in with Google
      </StyledButton>
      <StyledButton
        variant="github"
        onClick={() => handleOAuthSignIn("github")}
      >
        Sign in with GitHub
      </StyledButton>
    </Container>
  );
}

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffdde1, #b5fffc);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background-color: ${({ variant }) =>
    variant === "google"
      ? "#4285f4"
      : variant === "github"
      ? "#333"
      : "#4caf50"};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "google"
        ? "#357ae8"
        : variant === "github"
        ? "#444"
        : "#45a049"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 20px;
`;
