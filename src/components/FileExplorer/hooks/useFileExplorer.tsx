import { useWindowsFileSystemStore } from "../store/store"
import { useEffect, useMemo } from "react"

const useFileExplorer = () => {

    const { setWindowsFileSystem } = useWindowsFileSystemStore(({ setWindowsFileSystem }) => ({ 
        setWindowsFileSystem, 
    }))

}

export default useFileExplorer