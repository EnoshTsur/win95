import emptyTrashIcon from '../../../assets/empty-trash.png';
import emptyTrashActive from '../../../assets/empty-trash-active.png'
import myComputerIcon from '../../../assets/my-computer.png';
import myComputerActiveIcon from '../../../assets/my-computer-active.png';
import networkNeighborhoodIcon from '../../../assets/network-neighborhood.png'
import networkNeighborhoodActive from '../../../assets/network-neighborhood-active.png'
import inboxIcon from '../../../assets/inbox.png'
import inboxActive from '../../../assets/inbox-active.png'
import { getFileSystem, useFileExplorerStore, useFileSystemStore } from 'components/FileExplorer/store/store';
import { useCallback, useMemo, useState } from 'react';
import freecellIcon from '../../../svg/freecell.svg'
import { useFreecellWindowStore } from 'components/Freecell/store/store';
import { FileSystemItem } from 'components/FileExplorer/store/types';
import { useNavigate } from 'react-router-dom';

interface MainScreenFileSystemItem extends FileSystemItem {
    readonly onClick?: () => void
    readonly onDoubleClick?: () => void
    readonly iconStyle?: React.CSSProperties
}

const useMainScreenItems = () => {

    const [activeIndex, setActiveIndex] = useState(-1)

    const { fileSystem } = useFileSystemStore(({ fileSystem }) => ({ fileSystem }))

    const path = useMemo(() => ['My Computer','C', 'Windows', 'Desktop'], [])

    const desktopItems = useMemo(() => getFileSystem(path)(fileSystem), [fileSystem])

    const {isFreecellOpen, setFreecellOpen} = useFreecellWindowStore(({ isFreecellOpen, setFreecellOpen }) => ({ isFreecellOpen, setFreecellOpen }))

    const {isExplorerOpen, setExplorerOpen } = useFileExplorerStore(({ isExplorerOpen, setExplorerOpen }) => ({ isExplorerOpen, setExplorerOpen }))

    const navigate = useNavigate()

    const handleOpenExplorer = useCallback((path: ReadonlyArray<string>) => {
        if (path.length > 0) {
            if (!isExplorerOpen) {
                setExplorerOpen(true)
                navigate(`/${path.join('/')}`)
            }
        }
    }, [isExplorerOpen, navigate])

    const toggleActiveIndex = useCallback((index: number) => {
        setActiveIndex((pre) => pre === index ? -1 : index)
    }, [])

    const initialScreenItems: ReadonlyArray<MainScreenFileSystemItem> = useMemo(() => [
        {
            icon: { regular: myComputerIcon, active: myComputerActiveIcon },
            label: 'My Computer',
            path: ['My Computer'],
            isActive: activeIndex === 0,
            onClick: () => toggleActiveIndex(0),
        },
        {
            path: [],
            icon: { regular: networkNeighborhoodIcon, active: networkNeighborhoodActive },
            label: 'Network Neighborhood',
            isActive: activeIndex === 1,
            onClick: () => toggleActiveIndex(1),
        },
        {
            path: [],
            icon: { regular: inboxIcon, active: inboxActive},
            label: 'Inbox',
            isActive: activeIndex === 2,
            onClick: () => toggleActiveIndex(2),
        },
        {
            path: [],
            icon: { regular: emptyTrashIcon, active: emptyTrashActive},
            label: 'Recycle Bin',
            isActive: activeIndex === 3,
            onClick: () => toggleActiveIndex(3),
        },
        {
            icon: { regular: freecellIcon, active: freecellIcon},
            label: 'FreeCell',
            isActive: activeIndex === 4,
            onClick: () => toggleActiveIndex(4),
            path: [],
            iconStyle: { width: '45px', filter: 'drop-shadow(1px 1px 2px black)'},
            onDoubleClick: () => {
                if (!isFreecellOpen) {
                    setFreecellOpen(true)
                }
            }
        },
    ], [fileSystem, activeIndex])

    const items: ReadonlyArray<MainScreenFileSystemItem> = desktopItems.found 
        ? [
            ...initialScreenItems, 
            ...Object.values(desktopItems.result).map(({ icon, label, path, next }, index ) => ({
                icon,
                label,
                path: next ? path : [],
                isActive: (index + 5 ) === activeIndex,
                onClick: () => toggleActiveIndex(index + 5),
                }))
          ] 
        : initialScreenItems

    return {
        items,
        handleOpenExplorer,
    }

}

export default useMainScreenItems