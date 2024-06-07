import driverIcon from '../../../assets/driver.png'
import floppyIcon from '../../../assets/floppy-driver.png'
import folderIcon from '../../../assets/folder.png'
import freecellIcon from '../../../svg/freecell.svg'
import folderActiveIcon from '../../../assets/folder-active.png'
import historyIcon from '../../../assets/history-icon.png'
import printersIcon from '../../../assets/printers.png'
import { FileSystemStructure } from "./types";
import { useEffect, useMemo } from 'react'
import { useFreecellWindowStore } from 'components/Freecell/store/store'
import { useFileExplorerRoutesStore, useFileSystemStore } from './store'

const useInittialFileSystem = () => {

    const  {isFreecellOpen, setFreecellOpen} = useFreecellWindowStore(({ isFreecellOpen, setFreecellOpen }) => ({ isFreecellOpen, setFreecellOpen }))
    
    const initialFileSystem: FileSystemStructure = useMemo(() => ({
        "My Computer": {
            label: "My Computer",
            icon: { regular: '', active: '' },
            path: ["My Computer"],
            editable: false,
            next: {
                "A": {
                    label: "3½ Floppy [A:]",
                    icon: { regular: floppyIcon, active: floppyIcon },
                    path: ["My Computer", "A"],
                    editable: false
                },
                "C": {
                    label: "[C:]",
                    icon: { regular: driverIcon, active: driverIcon },
                    path: ["My Computer", "C"],
                    editable: false,
                    next: {
                        "Games": {
                            label: "Games",
                            icon: { regular: folderIcon, active: folderActiveIcon },
                            path: ["My Computer", "C", "Games"],
                            editable: true,
                            next: {
                                "FreeCell": {
                                    label: "FreeCell",
                                    icon: { regular: freecellIcon, active: freecellIcon },
                                    iconStyle: { width: '45px'},
                                    editable: true,
                                    onDoubleClick: () => {
                                        if (!isFreecellOpen) {
                                            setFreecellOpen(true)
                                        }
                                    },
                                    path: ["My Computer", "C", "Games", "FreeCell"],
                                },
                            },
                        },
                        "Program Files": {
                            label: "Program Files",
                            icon: { regular: folderIcon, active: folderActiveIcon },
                            editable: true,
                            path: ["My Computer", "C", "Program Files"],
                            next: {}
                        },
                        "Windows": {
                            label: "Windows",
                            icon: { regular: folderIcon, active: folderActiveIcon },
                            editable: true,
                            path: ["My Computer", "C", "Windows"],
                            next: {
    
                                "Command": {
                                    label: "Command",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Command"],
                                    next: {},
                                },
    
                                "Config": {
                                    label: "Config",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Config"],
                                    next: {},
                                },
    
                                "Cookies": {
                                    label: "Cookies",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Cookies"],
                                    next: {},
                                },
    
                                "Cursors": {
                                    label: "Cursors",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Cursors"],
                                    next: {},
                                },
    
                                "Desktop": {
                                    label: "Desktop",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Desktop"],
                                    next: {
                                    
                                        "Online Services": {
                                            label: "Online Services",
                                            icon: {regular: folderIcon, active: folderActiveIcon },
                                            editable: true,
                                            path: ["My Computer", "C", "Windows", "Desktop", "Online Services"],
                                            next: {},
                                        }
                                    }
                                },
    
                                "Fonts": {
                                    label: "Fonts",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Fonts"],
                                    next: {},
                                },
    
                                "Forms": {
                                    label: "Forms",
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Forms"],
                                    next: {},
                                },
    
                                "Help": {
                                    label: "Help",
                                    editable: true,
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    path: ["My Computer", "C", "Windows", "Help"],
                                    next: {},
                                },
    
                                "History": {
                                    label: "History",
                                    editable: true,
                                    icon: {regular : historyIcon, active: historyIcon },
                                    path: ["My Computer", "C", "Windows", "History"],
                                },
    
                                "System": {
                                    label: "System",
                                    editable: true,
                                    icon: {regular: folderIcon, active: folderActiveIcon },
                                    path: ["My Computer", "C", "Windows", "System"],
                                    next: {},
                                },
                        
                            },
                        },
                    },
                },
                "D": {
                    label: "[D:]",
                    editable: false,
                    icon: { regular: driverIcon, active: driverIcon },
                    path: ["My Computer", "D"],
                    next: {},
                },
                "Printers": {
                    label: "Printers",
                    editable: false,
                    icon: { regular: printersIcon, active: printersIcon },
                    path: ["My Computer", "Printers"]
                },
            },
        },
    }), [isFreecellOpen])


    const { setFileSystem } = useFileSystemStore(({ setFileSystem }) => ({ setFileSystem }))
    const { setRoutesFromFileSystem } = useFileExplorerRoutesStore(({ setRoutesFromFileSystem }) => ({ setRoutesFromFileSystem }))

    useEffect(() => {
        setFileSystem(initialFileSystem)
        setRoutesFromFileSystem(initialFileSystem)
    }, [initialFileSystem])
}

export default useInittialFileSystem
