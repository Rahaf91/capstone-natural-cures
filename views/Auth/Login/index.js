import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styled from "styled-components";

export default function LoginView() {
  const { query } = useRouter();
  const callbackUrl = query.callbackUrl || "/";

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Button
        bgColor="#4285f4"
        color="white"
        border="none"
        hoverBgColor="#357ae8"
        onClick={() => signIn("google", { callbackUrl })}
      >
        Sign up with Google
      </Button>
      <Button
        bgColor="#333"
        color="white"
        border="none"
        hoverBgColor="#444"
        onClick={() => signIn("github", { callbackUrl })}
      >
        Sign up with GitHub
      </Button>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
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

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor || "white"};
  color: ${({ color }) => color || "#333"};
  border: ${({ border }) => border || "2px solid #ccc"};
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor || "#f0f0f0"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
