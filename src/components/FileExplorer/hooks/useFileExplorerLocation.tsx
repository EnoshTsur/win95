import { useLocation } from "react-router-dom"
import myComputerIcon from '../../../assets/my-computer-small-icon.png'
import driveIcon from '../../../assets/driver.png'
import folderIcon from '../../../assets/folder.png'
import { useEffect, useMemo } from "react"
import { getFileSystem, useFileSystemStore } from "../store/store"

const useFileExplorerLocation = () => {

    const location = useLocation()
    const { fileSystem } = useFileSystemStore(({ fileSystem }) => ({ fileSystem }))

    const icon = useMemo(() => {
        switch(location.pathname) {
            case '/My Computer':
                return myComputerIcon
            case '/':
                return ''
            case '/My Computer/C':
            case '/My Computer/D':
                return driveIcon
            default:
                return folderIcon
        }
    }, [location.pathname])

    const isRouting = useMemo(() => location.pathname !== '/', [location.pathname])

    const title = useMemo(() => {
        const fullPath = location.pathname.split('/')
        return fullPath[fullPath.length - 1]
    }, [location.pathname])

    const itemsAtLocation = useMemo(() => getFileSystem(location.pathname.split('/').filter((s) => s !== ''))(fileSystem)
    , [fileSystem, location.pathname])


    return {
        itemsAtLocation,
        isRouting,
        title,
        icon
    }

}

export default useFileExplorerLocation