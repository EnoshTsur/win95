import React, { useMemo } from "react";
import styled from "styled-components";
import useFileItem from "../hooks/useFileItem";
import Tooltip from "components/Tooltip/Tooltip";
import { FileIcon } from "../store/types";
import { useFileSystemStore } from "../store/store";

const FileItemWrapper = styled.div`
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
`

const FileItemLabel = styled.span<{ 
    editable: string, 
    isactive: string, 
    itemlocation: 'desktop' | 'fileExplorer' 
}>`
    font-family: mslevi;
    letter-spacing: 1px;
    max-width: 7rem;
    cursor: ${({ editable }) => editable === 'true' ? 'text' : 'pointer'};
    ${({ theme, isactive, itemlocation }) => theme.regular.fileItem.label[itemlocation](isactive)}  
    &:focus {
        outline: none;
        background-color: white;
        color: black;
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
    readonly onTouchEnd?: () => void
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
    onTouchEnd,
    spanStyle = {},
    iconStyle = {},
}: FileItemProps) => {

    const { ref, handleBlur, handleNext } = useFileItem()

    const { toggleActive, setEditable } = useFileSystemStore(({ toggleActive, setEditable  }) => ({
        toggleActive, 
        setEditable
    }))

    const itemLocation: 'desktop' | 'fileExplorer' = useMemo(() => path[0].includes('Main Screen') ? 'desktop' : 'fileExplorer', [path])

    return (
        <Tooltip placement="bottom" title={label} >
            <FileItemWrapper 
                onClick={() => {
                    if (onClick) {
                        onClick()
                    } else {
                        toggleActive(path);
                    }
                }} 
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
                    onTouchEnd={() => {
                        if (onTouchEnd) {
                            onTouchEnd()
                        } else {
                            handleNext(hasNext, path)
                        }   
                    }}
                    style={iconStyle}
                />
                <FileItemLabel 
                    style={spanStyle}
                    editable={`${editable}`}
                    isactive={`${isActive}`}
                    itemlocation={itemLocation}
                    ref={ref}
                    onBlur={handleBlur} 
                    onDoubleClick={() => { setEditable(path, true); }}
                    contentEditable={editable}
                    suppressContentEditableWarning={true}
                >
                    {label}
                </FileItemLabel>
            </FileItemWrapper>
        </Tooltip>
    )
}

export default FileItem