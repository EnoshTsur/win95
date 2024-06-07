import useFileItemContainer from "../hooks/useFileItemContainer"
import { FileSystemItem } from "../store/types"
import FileItem from "./FileItem"

interface FileItemContainerProps {
    readonly items: ReadonlyArray<FileSystemItem>
    readonly path: string
}

const FileItemContainer = ({ items, path }: FileItemContainerProps) => {

    const { active, toggleActive } = useFileItemContainer()

    return (
        <>
            { Object.values(items).map(({ label, icon, }, index) => (
                <FileItem
                    key={path + label} 
                    label={label} 
                    icon={icon} 
                    nextNavigation={Object.values(items).length > 0 ? `${path}/${label}`: undefined}
                    onClick={() => {
                        toggleActive(index)
                    }} 
                    onDoubleClick={() => {}} 
                    isActive={index === active}
                />
            ))}
        </>
    )
}

export default FileItemContainer