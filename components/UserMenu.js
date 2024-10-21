import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <UserMenuContainer>
      <UserDetails>
        {session ? (
          <>
            {session.user.image ? (
              <Avatar src={session.user.image} alt={session.user.name} />
            ) : (
              <InitialAvatar>{session.user.name.charAt(0)}</InitialAvatar>
            )}
            <FullName>{session.user.name}</FullName>
            <SignInButton onClick={() => signOut()}>Sign Out</SignInButton>
          </>
        ) : (
          <SignInButton
            onClick={() =>
              signIn("credentials", { callbackUrl: router.asPath })
            }
          >
            Sign In
          </SignInButton>
        )}
      </UserDetails>
    </UserMenuContainer>
  );
}

const UserMenuContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #fff;
`;

const InitialAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff7e5f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
`;

const FullName = styled.p`
  color: #333;
  margin-right: 20px;
  font-size: 16px;
`;

const SignInButton = styled.button`
  background: #ff7e5f;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #feb47b;
    transform: scale(1.05);
  }
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 1rem;
  padding: 1rem;
`;
