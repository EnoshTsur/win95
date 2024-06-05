import emptyTrashIcon from '../../../assets/empty-trash.png';
import emptyTrashActive from '../../../assets/empty-trash-active.png'
import myComputerIcon from '../../../assets/my-computer.png';
import myComputerActiveIcon from '../../../assets/my-computer-active.png';
import networkNeighborhoodIcon from '../../../assets/network-neighborhood.png'
import networkNeighborhoodActive from '../../../assets/network-neighborhood-active.png'
import folderIcon from '../../../assets/folder.png'
import folderActive from '../../../assets/folder-active.png'
import inboxIcon from '../../../assets/inbox.png'
import inboxActive from '../../../assets/inbox-active.png'
import { ScreenItem } from "../store/types";
import { useFileExplorerStore, useWindowsFileSystemStore } from 'components/FileExplorer/store/store';
import { useEffect, useMemo } from 'react';
import { useMainScreenItemsStore } from '../store/store';

const useMainScreenItemsInit = () => {
    
    const { addOpenExplorer, setActiveExplorer } = useFileExplorerStore(({ addOpenExplorer, setActiveExplorer }) => ({ addOpenExplorer, setActiveExplorer }))
    
    const { setMainScreenItems } = useMainScreenItemsStore(({ setMainScreenItems }) => ({ setMainScreenItems }))

    const { windowsFileSystem, setOpenFileSystem } = useWindowsFileSystemStore(({ windowsFileSystem, setOpenFileSystem }) => ({ windowsFileSystem, setOpenFileSystem }))

    const initialScreenItems: ReadonlyArray<ScreenItem> = useMemo(() => [
        {
            icon: { icon: myComputerIcon, activeIcon: myComputerActiveIcon },
            label: 'My Computer',
            onClick: (e) => {
                e.preventDefault()
                
            },
            onDoubleClick: () => {
                addOpenExplorer({ id: 'my-computer' , path: 'root'})
                setActiveExplorer('my-computer')
                setOpenFileSystem(windowsFileSystem.root)
            }
        },
        {
            icon: { icon: networkNeighborhoodIcon, activeIcon: networkNeighborhoodActive },
            label: 'Network Neighborhood',
            onClick: (e) => {
                e.preventDefault()
            },
            onDoubleClick: () => {
                
            }
        },
        {
            icon: { icon: inboxIcon, activeIcon: inboxActive},
            label: 'Inbox',
            onClick: (e) => {
                e.preventDefault()
            },
            onDoubleClick: () => {
                
            }
        },
        {
            icon: { icon: emptyTrashIcon, activeIcon: emptyTrashActive},
            label: 'Recycle Bin',
            onClick: (e) => {
                e.preventDefault()
            },
            onDoubleClick: () => {
                
            }
        },
        {
            icon: { icon: folderIcon, activeIcon: folderActive},
            label: 'Online Services',
            onClick: (e) => {
                e.preventDefault()
            },
            onDoubleClick: () => {
                
            }
        }
    ], [windowsFileSystem])

    useEffect(() => {
        setMainScreenItems(initialScreenItems)
    }, [windowsFileSystem])
}

export default useMainScreenItemsInit