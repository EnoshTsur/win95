import driverIcon from '../../../assets/driver.png'
import driveActiveIcon from '../../../assets/active-drive-icon.png'
import floppyIcon from '../../../assets/floppy-driver.png'
import floppyActiveIcon from '../../../assets/floppy-active-drive-icon.png'
import folderIcon from '../../../assets/folder.png'
import myComputerIcon from '../../../assets/my-computer.png'
import myComputerActiveIcon from '../../../assets/my-computer-active.png'
import networkIcon from '../../../assets/network-neighborhood.png'
import networkActiveIcon from '../../../assets/network-neighborhood-active.png'
import inboxIcon from '../../../assets/inbox.png'
import inboxActiveIcon from '../../../assets/inbox-active.png'
import freecellIcon from '../../../svg/freecell.svg'
import folderActiveIcon from '../../../assets/folder-active.png'
import recycleIcon from '../../../assets/empty-trash.png'
import recycleActiveIcon from '../../../assets/empty-trash-active.png'
import historyIcon from '../../../assets/history-icon.png'
import historyActiveIcon from '../../../assets/history-icon.png'
import printersIcon from '../../../assets/printers.png'
import printersActiveIcon from '../../../assets/printers-active-icon.png'
import freecellActiveIcon from '../../../svg/freecell.png'
import { FileSystemStructure } from "../store/types";
import { useEffect, useMemo, useState } from 'react'
import { useFreecellWindowStore } from 'components/Freecell/store/store'
import { useFileExplorerRoutesStore, useFileExplorerStore, useFileSystemStore } from '../store/store'
import { useNavigate } from 'react-router-dom'

const useFileSystemInit = () => {

    const [isActiveMainScreen, setActiveMainScreen] = useState(-1)


    const navigate = useNavigate()

    const { isExplorerOpen, setExplorerOpen} = useFileExplorerStore(({ isExplorerOpen, setExplorerOpen }) => ({ isExplorerOpen, setExplorerOpen }))

    const  {isFreecellOpen, setFreecellOpen} = useFreecellWindowStore(({ isFreecellOpen, setFreecellOpen }) => ({ isFreecellOpen, setFreecellOpen }))
    
    const initialFileSystem: FileSystemStructure = useMemo(() => ({
        "Main Screen": {
            label: "Main Screen",
            icon: { regular: '', active: ''},
            path: ["Main Screen"],
            next: {
                "My Computer": {
                    label: "My Computer",
                    icon: { regular: myComputerIcon, active: myComputerActiveIcon },
                    path: ["Main Screen", "My Computer"],
                    isActive: isActiveMainScreen === 0,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 0 ? -1 : 0)
                    },
                    onDoubleClick: () => {
                        if(!isExplorerOpen) {
                            setExplorerOpen(true)
                            navigate('/My Computer')
                        }
                    },
                    editable: false
                },
                "Network Neighborhood": {
                    label: "Network Neighborhood",
                    icon: { regular: networkIcon, active: networkActiveIcon },
                    path: ["Main Screen", "Network Neighborhood"],
                    isActive: isActiveMainScreen === 1,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 1 ? -1 : 1)
                    },
                    editable: false
                },
                "Inbox": {
                    label: "Inbox",
                    icon: { regular: inboxIcon, active: inboxActiveIcon },
                    path: ["Main Screen", "Inbox"],
                    isActive: isActiveMainScreen === 2,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 2 ? -1 : 2)
                    },
                    editable: false
                },
                "Recycle Bin": {
                    label: "Recycle Bin",
                    icon: { regular: recycleIcon, active: recycleActiveIcon },
                    path: ["Main Screen", "Recycle Bin"],
                    isActive: isActiveMainScreen === 3,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 3 ? -1 : 3)
                    },
                    editable: false
                },
                "FreeCell": {
                    label: "FreeCell",
                    icon: { regular: freecellIcon, active: freecellActiveIcon },
                    path: ["Main Screen", "FreeCell"],
                    isActive: isActiveMainScreen === 4,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 4 ? -1 : 4)
                    },
                    onDoubleClick: () => {
                        if (!isFreecellOpen) {
                            setFreecellOpen(true)
                        }
                    },
                    iconStyle: { width: '45px'},
                    editable: true,
                },
                "Online Services": {
                    label: "Online Services",
                    icon: { regular: folderIcon, active: folderActiveIcon },
                    path: ["Main Screen", "Online Services"],
                    isActive: isActiveMainScreen === 5,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 5 ? -1 : 5)
                    },
                    onDoubleClick: () => {
                        if(!isExplorerOpen) {
                            setExplorerOpen(true)
                            navigate('/My Computer/Windoes/Desktop/Online Services')
                        }
                    },
                    editable: false
                },
                
            }
        },
        "My Computer": {
            label: "My Computer",
            icon: { regular: '', active: '' },
            path: ["My Computer"],
            editable: false,
            next: {
                "A": {
                    label: "3½ Floppy [A:]",
                    icon: { regular: floppyIcon, active: floppyActiveIcon },
                    path: ["My Computer", "A"],
                    editable: false
                },
                "C": {
                    label: "[C:]",
                    icon: { regular: driverIcon, active: driveActiveIcon },
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
                                    icon: { regular: freecellIcon, active: freecellActiveIcon },
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
                                    icon: {regular : historyIcon, active: historyActiveIcon },
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
                    icon: { regular: driverIcon, active: driveActiveIcon },
                    path: ["My Computer", "D"],
                    next: {},
                },
                "Printers": {
                    label: "Printers",
                    editable: false,
                    icon: { regular: printersIcon, active: printersActiveIcon },
                    path: ["My Computer", "Printers"]
                },
            },
        },
    }), [isFreecellOpen, isActiveMainScreen])


    const { setFileSystem } = useFileSystemStore(({ setFileSystem }) => ({ setFileSystem }))
    const { setRoutesFromFileSystem } = useFileExplorerRoutesStore(({ setRoutesFromFileSystem }) => ({ setRoutesFromFileSystem }))

    useEffect(() => {
        setFileSystem(initialFileSystem)
        setRoutesFromFileSystem(initialFileSystem)
    }, [initialFileSystem])
}

export default useFileSystemInit
