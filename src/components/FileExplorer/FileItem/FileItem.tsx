import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useFileItem from "../hooks/useFileItem";
import Tooltip from "components/Tooltip/Tooltip";
import { FileIcon } from "../store/types";

const FileItemWrapper = styled.div<{ isactive: string, editable: string }>`
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

export interface FileItemProps {
    readonly icon: FileIcon
    readonly label: string
    readonly isActive?: boolean
    readonly nextNavigation?: string
    readonly editable?: boolean
    readonly spanStyle?: React.CSSProperties
    readonly onClick?: () => void
    readonly onDoubleClick?: () => void
}

const FileItem = ({ 
    icon, 
    label, 
    nextNavigation, 
    isActive = false, 
    editable = false,
    onClick = () => {}, 
    onDoubleClick = () => {}, 
    spanStyle = {} 
}: FileItemProps) => {

    const { ref, isEditable, setEditable, handleBlur} = useFileItem()

    const navigate = useNavigate()

    return (
        <Tooltip placement="bottom" title={label} >
            <FileItemWrapper 
                isactive={`${isActive}`} 
                onClick={(e) => {
                    e.preventDefault();
                    onClick()
                }} 
                editable={`${isEditable}`}
            >
                <img src={isActive ? icon.active : icon.regular} alt={label} onDoubleClick={() => {
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
            </FileItemWrapper>
        </Tooltip>
    )
}

export default FileItem