import styled from "styled-components";
import { FaCaretRight } from "react-icons/fa";
import { items } from "./menu-items";
import shutIcon from '../../assets/shut.png'

const MenuItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 1rem;
    gap: 10px;
    &:hover {
        background-color: darkblue;
        color: white;
    }

    span {
        width: 100%;
        text-align: left;
    }

`

const Icon = ({ icon }: { icon: string }) => (
    <img src={icon} alt={icon}/>
)

const StarMenuWrapper = styled.div`
    position: absolute;
    border-bottom: 3px solid ${({ theme }) => theme.colors.black};
    border-right: 3px solid ${({ theme }) => theme.colors.black};
    border-left: 3px solid ${({ theme }) => theme.colors.white};
    border-top: 3px solid ${({ theme }) => theme.colors.white};
    z-index: 10;
    top: -280px;
    left: -3px;
    background-color: ${({ theme }) => theme.colors.menu };
    display: flex;

    .windows95 {
        display: flex;
        gap: 5px;
        padding: 5px 0;
        color: ${({ theme }) => theme.colors.menu};
        font-size: 22px;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        flex-basis: 2%;
        background-color: ${({ theme }) => theme.colors.menuTitle};

        div {
            flex-basis: 50%;
        }

        .nf {
            color: ${({ theme }) => theme.colors.white };
        }
    }

    .menu {
        flex-basis: 98%;
    }

    ul {
        font-family: mslevi;
    }
`

const StartMenu = () => {

    return (
        <StarMenuWrapper>
            <div className="windows95">
                <span>
                    Windows
                </span>
                <span className="nf">
                    95
                </span>
            </div>
            <div className="menu">
                {
                    items.map(({ title , icon, hasCaret }) => (
                        <MenuItem key={title}>
                            <Icon icon={icon} />
                            <span>{title}</span>
                            { hasCaret && <FaCaretRight /> }
                        </MenuItem>
                    ))
                }
                <hr />
                <MenuItem>
                <Icon icon={shutIcon}/>
                    <span>Shut down</span>
                </MenuItem>
            </div>
        </StarMenuWrapper>
    )
}

export default StartMenu