import driverIcon from '../../../assets/driver.png'
import floppyIcon from '../../../assets/floppy-driver.png'
import folderIcon from '../../../assets/folder.png'
import { useWindowsFileSystemStore } from "../store/store"
import { useEffect, useMemo } from "react"

const useFileExplorer = () => {

    const { setWindowsFileSystem } = useWindowsFileSystemStore(({ setWindowsFileSystem }) => ({ 
        setWindowsFileSystem, 
    }))

    const fs = useMemo(() => ({
        root: {
            "A": {
                label: "3¹⁄₂ Floppy [A:]",
                icon: floppyIcon,
                isFolder: true,
                items: {},
            },

            "C": {
                label: "[C:]",
                icon: driverIcon,
                isFolder: true,
                items: { 
                    "Program Files": {
                        label: "Program Files",
                        icon: folderIcon,
                        isFolder: true,
                        items: {}
                    },

                    "Games": {
                        label: "Games",
                        icon: folderIcon,
                        isFolder: true,
                        items: {}
                    },

                    "Windows": {
                        label: "Windows",
                        isFolder: true,
                        icon: folderIcon,
                        items: {

                            "Desktop": {
                                label: "Desktop",
                                isFolder: true,
                                icon: folderIcon,
                                items: {

                                    "Online Services": {
                                        label: "Online Services",
                                        icon: folderIcon,
                                        isFolder: true,
                                        items: {},
                                    }
                                }
                            }
                        },
                    },
                }
            },

            "D": {
                label: "[D:]",
                icon: driverIcon,
                isFolder: true,
                items: {}
            },
        }
    }), [])

    useEffect(() => {
        setWindowsFileSystem(fs)
    }, [])
}

export default useFileExplorer