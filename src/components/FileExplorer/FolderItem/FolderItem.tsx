import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useFileItem from "../hooks/useFileItem";
import Tooltip from "components/Tooltip/Tooltip";

const FolderItemWrapper = styled.div<{ isactive: string, editable: string }>`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    font-family: mslevi;

    &:hover{
        cursor: pointer;    
    }

    img {
        width: 80px;
    }


    span {
        cursor: ${({ editable }) => editable === 'true' ? 'text': 'pointer'};
        border: ${({ theme, isactive }) => isactive === 'true' ? `1px dashed ${theme.colors.white}` : `1px solid ${theme.colors.windowsBg}` };
        background-color: ${({ theme, isactive }) => isactive === 'true' ? theme.colors.alertTitleBar : theme.colors.windowsBg};
        color: white;
        letter-spacing: 1px;
        max-width: 6rem;

        &:focus {
            outline: none;
            background-color: white;
            color: black;
        }
    }
`

interface FolderItemProps {
    readonly icon: string
    readonly label: string
    readonly isActive?: boolean
    readonly nextNavigation?: string
    readonly editable?: boolean
    readonly spanStyle?: React.CSSProperties
    readonly onClick?: (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    readonly onDoubleClick?: () => void
}

const FolderItem = ({ 
    icon, 
    label, 
    nextNavigation, 
    isActive = false, 
    editable = false,
    onClick = () => {}, 
    onDoubleClick = () => {}, 
    spanStyle = {} 
}: FolderItemProps) => {

    const { ref, isEditable, setEditable, handleBlur} = useFileItem()

    const navigate = useNavigate()

    return (
        <Tooltip placement="bottom" title={label} >
            <FolderItemWrapper isactive={`${isActive}`} onClick={onClick} editable={`${isEditable}`}>
                <img src={icon} alt={label} onDoubleClick={() => {
                    onDoubleClick()
                    if (nextNavigation != null) {
                        navigate(nextNavigation)
                    }
                }}/>
                <span 
                    style={spanStyle}
                    ref={ref}
                    onBlur={handleBlur} 
                    onDoubleClick={() => setEditable(true)}
                    contentEditable={editable && isEditable}
                    suppressContentEditableWarning={true}
                >
                    {label}
                </span>
            </FolderItemWrapper>
        </Tooltip>
    )
}

export default FolderItem