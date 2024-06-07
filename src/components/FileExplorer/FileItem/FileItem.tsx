import React, { useEffect } from "react";
import styled from "styled-components";
import useFileItem from "../hooks/useFileItem";
import Tooltip from "components/Tooltip/Tooltip";
import { FileIcon } from "../store/types";
import { useFileSystemStore } from "../store/store";

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
        cursor: ${({ editable }) => editable === 'true' ? 'text' : 'pointer'};
        border: ${({ theme, isactive }) => isactive === 'true' ? `1px dashed ${theme.colors.white}` : `1px solid ${theme.colors.windowsBg}` };
        background-color: ${({ theme, isactive }) => isactive === 'true' ? theme.colors.alertTitleBar : theme.colors.windowsBg};
        color: white;
        letter-spacing: 1px;
        max-width: 7rem;

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
    readonly path: ReadonlyArray<string>
    readonly hasNext: boolean
    readonly isActive?: boolean
    readonly editable?: boolean
    readonly spanStyle?: React.CSSProperties
    readonly iconStyle?: React.CSSProperties
    readonly onClick?: () => void
    readonly onDoubleClick?: () => void
}

const FileItem = ({ 
    icon, 
    label, 
    hasNext, 
    path,
    isActive = false, 
    editable = false,
    onClick,
    onDoubleClick, 
    spanStyle = {},
    iconStyle = {},
}: FileItemProps) => {

    const { ref, handleBlur, handleNext } = useFileItem()

    const { toggleActive, setEditable } = useFileSystemStore(({ toggleActive, setEditable  }) => ({
        toggleActive, 
        setEditable
    }))


    return (
        <Tooltip placement="bottom" title={label} >
            <FileItemWrapper 
                isactive={`${isActive}`} 
                onClick={(e) => {
                    if (onClick) {
                        onClick()
                    } else {
                        toggleActive(path);
                    }
                }} 
                editable={`${editable}`}
            >
                <img 
                    src={isActive ? icon.active : icon.regular} 
                    alt={label} 
                    onDoubleClick={() => {
                        if (onDoubleClick) {
                            onDoubleClick();
                        } else {
                            handleNext(hasNext, path)
                        }
                    }}
                    style={iconStyle}
                />
                <span 
                    style={spanStyle}
                    ref={ref}
                    onBlur={handleBlur} 
                    onDoubleClick={() => { setEditable(path, true); }}
                    contentEditable={editable}
                    suppressContentEditableWarning={true}
                >
                    {label}
                </span>
            </FileItemWrapper>
        </Tooltip>
    )
}

export default FileItem