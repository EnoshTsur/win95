import { useLocation } from "react-router-dom"
import myComputerIcon from '../../../assets/my-computer-small-icon.png'
import driveIcon from '../../../assets/driver.png'
import folderIcon from '../../../assets/folder.png'
import { useMemo } from "react"

const useFileExplorerLocation = () => {

    const location = useLocation()

    const icon = useMemo(() => {
        switch(location.pathname) {
            case '/My Computer':
                return myComputerIcon
            case '/':
                return ''
            case '/My Computer/[C:]':
            case '/My Computer/[D:]':
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

    return {
        isRouting,
        title,
        icon
    }

}

export default useFileExplorerLocation