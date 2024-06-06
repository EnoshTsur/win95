import Underline from "components/Underline/Underline";
import { useMemo } from "react";
import styled from "styled-components";

const FileExplorerMenuWrapper = styled.div`
    display: flex;
    gap: 5px;
    background-color: ${({ theme }) => theme.colors.menu};
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    `
    
    const FileExplorerMenuItem = styled.span`
    font-family: mslevi;
    padding: 5px;
    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.alertTitleBar};
        color: ${({ theme }) => theme.colors.white};
    }
`



const FileExplorerMenu = () => {
    const menuItems = useMemo(() => [
        { 
            children: <><Underline>F</Underline>ile</>,
            onClick: () => {}
        },
        { 
            children: <><Underline>E</Underline>dit</>,
            onClick: () => {}
        },
        { 
            children: <><Underline>V</Underline>iew</>,
            onClick: () => {}
        },
        { 
            children: <><Underline>H</Underline>elp</>,
            onClick: () => {}
        },
    ], [])

    return (
        <FileExplorerMenuWrapper>
            { menuItems.map(({ children, onClick }, index) => (
                <FileExplorerMenuItem onClick={onClick} key={`${children}${onClick}${index}`}>
                    { children }
                </FileExplorerMenuItem>
            ))}
        </FileExplorerMenuWrapper>
    )
}

export default FileExplorerMenu