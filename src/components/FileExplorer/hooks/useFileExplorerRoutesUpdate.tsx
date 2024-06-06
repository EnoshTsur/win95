import { useEffect } from "react"
import { useFileExplorerRoutesStore, useFileSystemStore } from "../store/store"

const useFileExplorerRoutesUpdate = () => {

    const { fileSystem } = useFileSystemStore(({ fileSystem }) => ({ fileSystem }))
    const { setRoutesFromFileSystem } = useFileExplorerRoutesStore(({ setRoutesFromFileSystem }) => ({ setRoutesFromFileSystem }))

    useEffect(() => {
        setRoutesFromFileSystem(fileSystem)
    }, [fileSystem])
}

export default useFileExplorerRoutesUpdate