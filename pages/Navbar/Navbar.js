import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <NavbarContainer>
      <UserSection>
        {session ? (
          <>
            {session.user.image ? (
              <Avatar src={session.user.image} alt={session.user.name} />
            ) : (
              <InitialAvatar>
                {session.user.name.charAt(0)} {/* Display first letter */}
              </InitialAvatar>
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
      </UserSection>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #ffdde1, #ee9ca7);
  color: #333;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
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

const FullName = styled.div`
  color: #333;
  margin-right: 20px;
  font-size: 16px;
`;

const SignInButton = styled.button`
  background: #ff7e5f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #feb47b;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LoadingText = styled.div`
  color: #333;
  font-size: 16px;
  padding: 10px;
`;
