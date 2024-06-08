import driveIcon from '../../../assets/driver.png'
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
import historyActiveIcon from '../../../assets/history-active-icon.png'
import printersIcon from '../../../assets/printers.png'
import printersActiveIcon from '../../../assets/printers-active-icon.png'
import freecellActiveIcon from '../../../svg/freecell.png'
import { FileIcon, FileSystemStructure } from "../store/types";
import { useEffect, useMemo, useState } from 'react'
import { useFreecellWindowStore } from 'components/Freecell/store/store'
import { useFileExplorerRoutesStore, useFileExplorerStore, useFileSystemStore } from '../store/store'
import { useNavigate } from 'react-router-dom'

type IconName = 'drive' | 'floppy' | 'folder' | 'myComputer' | 'network' | 'inbox' | 'freecell' | 'recycle' | 'history' | 'printers' | 'none'

type IconsSources = Readonly<Record<IconName, FileIcon>>

const iconSourcesMap: IconsSources = {
    none: { regular: '', active: ''},
    myComputer: { regular: myComputerIcon, active: myComputerActiveIcon },
    network: { regular: networkIcon, active: networkActiveIcon },
    inbox: { regular: inboxIcon, active: inboxActiveIcon },
    recycle: { regular: recycleIcon, active: recycleActiveIcon },
    freecell: { regular: freecellIcon, active: freecellActiveIcon },
    folder: { regular: folderIcon, active: folderActiveIcon },
    floppy: { regular: floppyIcon, active: floppyActiveIcon },
    history: {regular : historyIcon, active: historyActiveIcon },
    printers: { regular: printersIcon, active: printersActiveIcon },
    drive: { regular: driveIcon, active: driveActiveIcon },
}

const useFileSystemInit = () => {

    const [isActiveMainScreen, setActiveMainScreen] = useState(-1)


    const navigate = useNavigate()

    const { isExplorerOpen, setExplorerOpen} = useFileExplorerStore(({ isExplorerOpen, setExplorerOpen }) => ({ isExplorerOpen, setExplorerOpen }))

    const  {isFreecellOpen, setFreecellOpen} = useFreecellWindowStore(({ isFreecellOpen, setFreecellOpen }) => ({ isFreecellOpen, setFreecellOpen }))
    
    const initialFileSystem: FileSystemStructure = useMemo(() => ({
        "Main Screen": {
            label: "Main Screen",
            icon: iconSourcesMap.none,
            path: ["Main Screen"],
            next: {
                "My Computer": {
                    label: "My Computer",
                    icon: iconSourcesMap.myComputer,
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
                    icon: iconSourcesMap.network,
                    path: ["Main Screen", "Network Neighborhood"],
                    isActive: isActiveMainScreen === 1,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 1 ? -1 : 1)
                    },
                    editable: false
                },
                "Inbox": {
                    label: "Inbox",
                    icon: iconSourcesMap.inbox,
                    path: ["Main Screen", "Inbox"],
                    isActive: isActiveMainScreen === 2,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 2 ? -1 : 2)
                    },
                    editable: false
                },
                "Recycle Bin": {
                    label: "Recycle Bin",
                    icon: iconSourcesMap.recycle,
                    path: ["Main Screen", "Recycle Bin"],
                    isActive: isActiveMainScreen === 3,
                    onClick: () => {
                        setActiveMainScreen((pre) => pre === 3 ? -1 : 3)
                    },
                    editable: false
                },
                "FreeCell": {
                    label: "FreeCell",
                    icon: iconSourcesMap.freecell,
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
                    icon: iconSourcesMap.folder,
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
            icon: iconSourcesMap.none,
            path: ["My Computer"],
            editable: false,
            next: {
                "A": {
                    label: "3½ Floppy [A:]",
                    icon: iconSourcesMap.floppy,
                    path: ["My Computer", "A"],
                    editable: false
                },
                "C": {
                    label: "[C:]",
                    icon: iconSourcesMap.drive,
                    path: ["My Computer", "C"],
                    editable: false,
                    next: {
                        "Games": {
                            label: "Games",
                            icon: iconSourcesMap.folder,
                            path: ["My Computer", "C", "Games"],
                            editable: true,
                            next: {
                                "FreeCell": {
                                    label: "FreeCell",
                                    icon: iconSourcesMap.freecell,
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
                            icon: iconSourcesMap.folder,
                            editable: true,
                            path: ["My Computer", "C", "Program Files"],
                            next: {}
                        },
                        "Windows": {
                            label: "Windows",
                            icon: iconSourcesMap.folder,
                            editable: true,
                            path: ["My Computer", "C", "Windows"],
                            next: {
    
                                "Command": {
                                    label: "Command",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Command"],
                                    next: {},
                                },
    
                                "Config": {
                                    label: "Config",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Config"],
                                    next: {},
                                },
    
                                "Cookies": {
                                    label: "Cookies",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Cookies"],
                                    next: {},
                                },
    
                                "Cursors": {
                                    label: "Cursors",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Cursors"],
                                    next: {},
                                },
    
                                "Desktop": {
                                    label: "Desktop",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Desktop"],
                                    next: {
                                    
                                        "Online Services": {
                                            label: "Online Services",
                                            icon: iconSourcesMap.folder,
                                            editable: true,
                                            path: ["My Computer", "C", "Windows", "Desktop", "Online Services"],
                                            next: {},
                                        }
                                    }
                                },
    
                                "Fonts": {
                                    label: "Fonts",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Fonts"],
                                    next: {},
                                },
    
                                "Forms": {
                                    label: "Forms",
                                    icon: iconSourcesMap.folder,
                                    editable: true,
                                    path: ["My Computer", "C", "Windows", "Forms"],
                                    next: {},
                                },
    
                                "Help": {
                                    label: "Help",
                                    editable: true,
                                    icon: iconSourcesMap.folder,
                                    path: ["My Computer", "C", "Windows", "Help"],
                                    next: {},
                                },
    
                                "History": {
                                    label: "History",
                                    editable: true,
                                    icon: iconSourcesMap.history,
                                    path: ["My Computer", "C", "Windows", "History"],
                                },
    
                                "System": {
                                    label: "System",
                                    editable: true,
                                    icon: iconSourcesMap.folder,
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
                    icon: iconSourcesMap.drive,
                    path: ["My Computer", "D"],
                    next: {},
                },
                "Printers": {
                    label: "Printers",
                    editable: false,
                    icon: iconSourcesMap.printers,
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
