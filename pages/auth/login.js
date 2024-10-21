import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styled from "styled-components";
import { StyledLinks } from "@/components/StyledLinks";
import Image from "next/image";
export default function LoginView() {
  const { query } = useRouter();
  const callbackUrl = query.callbackUrl || "/";
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { email, password } = data;

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (response?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = response.url || callbackUrl;
    }
  }

  function handleOAuthSignIn(provider) {
    signIn(provider, { callbackUrl });
  }

  return (
    <Container>
      <BackButtonWrapper>
        <StyledLinks $variant="back" href="/">
          <Image src="/back.svg" alt="back icon" width={60} height={60} />
        </StyledLinks>
      </BackButtonWrapper>
      <h1>LOGIN</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">
          Email:<span>*</span>
        </Label>
        <Input type="email" name="email" required />
        <Label htmlFor="password">
          Password:<span>*</span>
        </Label>
        <Input type="password" name="password" required />
        <StyledButton type="submit" variant="credentials">
          Sign in with Credentials
        </StyledButton>
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
      </Form>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  box-shadow: var(--box-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

const Label = styled.label`
  align-self: flex-start;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
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
  border-radius: var(--border-radius);
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  text-align: center;

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
  margin-bottom: 1rem;
  text-align: center;
`;
const BackButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;
