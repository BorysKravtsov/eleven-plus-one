import Image from "next/image";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const StyledHeader = styled.header`
  background-color: #17111d;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  font-size: 16px;
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

const LogoStyled = {
  width: "50px",
  height: "50px",

};

export default function Header() {
  const { data: session } = useSession();

  return (
    <StyledHeader className="header">
      <div className="container">
        <HeaderInner>
          <Link href="/">
           
              <Image
                src="/elevenPlusOneLogo.svg"
              alt="logo"
              width={50}
                height={50}
                style={LogoStyled}
                priority
              />
            
          </Link>
          <Navbar className="navbar">
            <NavbarButtons className="navbuttons">
              <li className="navbar__leagues">
                <Link href="/leagues">Leagues</Link>
              </li>
              <li className="navbar__favorites">
                <Link href="/favorites">Favorites</Link>
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
