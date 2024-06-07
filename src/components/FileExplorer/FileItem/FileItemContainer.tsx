import { useState } from "react"
import { FileSystemItem } from "../store/types"
import FileItem from "./FileItem"

interface FileItemContainerProps {
    readonly items: ReadonlyArray<FileSystemItem>
}

const FileItemContainer = ({ items, }: FileItemContainerProps) => {

    const [isActiveIndex, setActiveIndex] = useState(-1)

    return (
        <>
            { items.map(({ label, icon, path, next, iconStyle, onDoubleClick }, index) => (
                <FileItem
                    key={path + label} 
                    label={label} 
                    icon={icon} 
                    iconStyle={iconStyle}
                    hasNext={next != null}
                    isActive={isActiveIndex === index}
                    path={path}
                    onDoubleClick={onDoubleClick}
                    onClick={() => { setActiveIndex((pre) => pre === index ? -1 : index) }}
                />
            ))}
        </>
    )
}

export default FileItemContainer