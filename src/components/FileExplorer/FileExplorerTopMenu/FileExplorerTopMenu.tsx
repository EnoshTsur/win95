import { ButtonProps } from "components/Button/Button";
import styled from "styled-components";

const FileExplorerMenuWrapper = styled.div`
    display: flex;
    gap: 0.3rem;
    background-color: ${({ theme }) => theme.colors.menu};
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    `
    
    const FileExplorerMenuItem = styled.span`
    font-family: mslevi;
    padding: 0.4rem;
    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.alertTitleBar};
        color: ${({ theme }) => theme.colors.white};
    }
`

interface FileExplorerMenuProps {
    readonly menuItems: ReadonlyArray<ButtonProps>
}

const FileExplorerMenu = ({ menuItems  }: FileExplorerMenuProps) => {

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