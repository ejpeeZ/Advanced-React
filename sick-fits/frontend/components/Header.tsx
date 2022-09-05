import Link from "next/link";
import Nav from "./Nav";
import styled from "styled-components";

const HeaderLogo = styled.h1`
    background: red;
    font-size: 4rem;
    margin-left: 2rem;
    transform: skew(-7deg);
    z-index: 2;
    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
    }
`;

const StyledHeader = styled.header`
    .bar {
        border-bottom: 10px solid var(--black, black);
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: center;
    }

    .sub-bar {
        border-bottom: 1px solid var(--black, black);
        display: grid;
        grid-template-columns: 1fr auto;
    }
`

export default function Header() {
    return (
        <StyledHeader>
            <div className="bar">
                <HeaderLogo>
                    <Link
                        href="/"
                    >
                        Sick fits
                    </Link>
                </HeaderLogo>
            </div>
            <Nav />
            <div className="sub-bar">
                <p>search</p>
            </div>
        </StyledHeader>
    );
}