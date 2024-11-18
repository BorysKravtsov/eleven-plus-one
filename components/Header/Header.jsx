import Image from "next/image";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

const StyledHeader = styled.header`
  background-color: #17111d;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  font-size: 18px;
`;

const NavbarButtons = styled.ul`
  display: flex;
  align-items: center;
  gap: 23px;
  line-height: 150%;
  li a {
    transition: color 0.3s;
  }

  li a:hover {
    color: #00bfb2;
  }
`;

const NavbarSignup = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 57px;
  transition: color 0.3s;
  &:hover {
    color: #00bfb2;
  }
`;

export default function Header() {
  const { data: session } = useSession();

  return (
    <StyledHeader className="header">
      <div className="container">
        <HeaderInner>
          <a href="/">
            <Image src="/elevenPlusOne-logo.svg" alt="logo" width={30} height={30} />
          </a>
          <Navbar className="navbar">
            <NavbarButtons className="navbuttons">
              <li className="navbar__leagues">
                <a href="/Leagues">Leagues</a>
              </li>
              <li className="navbar__favorites">
                <a href="/favorites">Favorites</a>
              </li>
              <li className="navbar__search">
                <a href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 13L19 19M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li className="navbar__signup">
                {session ? (
                  <NavbarSignup onClick={() => signOut()}>
                    Sign Out
                  </NavbarSignup>
                ) : (
                  <NavbarSignup onClick={() => signIn("github")}>
                    Sign Up with GitHub
                  </NavbarSignup>
                )}
              </li>
            </NavbarButtons>
          </Navbar>
        </HeaderInner>
      </div>
    </StyledHeader>
  );
}
