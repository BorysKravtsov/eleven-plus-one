import Image from "next/image";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #17111d;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
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
  font-family: "Kanit", sans-sherif;
  font-weigh: 500;
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
  li a svg path {
    transition: stroke 0.3s;
  }

  li a:hover svg path {
    stroke: #00bfb2;
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
  & svg path {
    transition: stroke 0.3s;
  }
  &:hover svg path {
    stroke: #00bfb2;
  }
`;

export default function Header() {
  return (
    <>
      <StyledHeader className="header">
        <Container>
          <HeaderInner>
            <a href="#">
              <Image
                src="/football-256.png"
                alt="logo"
                width={30}
                height={30}
              />
            </a>
            <Navbar className="navbar">
              <NavbarButtons className="navbuttons">
                <li className="navbar__leagues">
                  <a href="#">Leagues</a>
                </li>
                <li className="navbar__favorites">
                  <a href="#">Favorites</a>
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              </NavbarButtons>
              <NavbarSignup href="#" className="navbar__signup">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L12 9M12 9L9 6M12 9H1M6 4.24859V4.2002C6 3.08009 6 2.51962 6.21799 2.0918C6.40973 1.71547 6.71547 1.40973 7.0918 1.21799C7.51962 1 8.08009 1 9.2002 1H13.8002C14.9203 1 15.4796 1 15.9074 1.21799C16.2837 1.40973 16.5905 1.71547 16.7822 2.0918C17 2.5192 17 3.07899 17 4.19691V13.8036C17 14.9215 17 15.4805 16.7822 15.9079C16.5905 16.2842 16.2837 16.5905 15.9074 16.7822C15.48 17 14.921 17 13.8031 17H9.19691C8.07899 17 7.5192 17 7.0918 16.7822C6.71547 16.5905 6.40973 16.2839 6.21799 15.9076C6 15.4798 6 14.9201 6 13.8V13.75"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p>Sign up</p>
              </NavbarSignup>
            </Navbar>
          </HeaderInner>
        </Container>
      </StyledHeader>
    </>
  );
}
