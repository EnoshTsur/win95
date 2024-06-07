import emptyTrashIcon from '../../../assets/empty-trash.png';
import emptyTrashActive from '../../../assets/empty-trash-active.png'
import myComputerIcon from '../../../assets/my-computer.png';
import myComputerActiveIcon from '../../../assets/my-computer-active.png';
import networkNeighborhoodIcon from '../../../assets/network-neighborhood.png'
import networkNeighborhoodActive from '../../../assets/network-neighborhood-active.png'
import inboxIcon from '../../../assets/inbox.png'
import inboxActive from '../../../assets/inbox-active.png'
import { getFileSystem, useFileExplorerStore, useFileSystemStore } from 'components/FileExplorer/store/store';
import { useMemo, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { FileItemProps } from 'components/FileExplorer/FileItem/FileItem';

const useMainScreenItems = () => {

    const [activeItem, setActiveItem] = useState(-1)
    
    const { setExplorerOpen } = useFileExplorerStore(({ setExplorerOpen }) => ({ setExplorerOpen }))

    const navigate = useNavigate()

    const path = useMemo(() => ['My Computer','[C:]', 'Windows', 'Desktop'], [])

    const { fileSystem } = useFileSystemStore(({ fileSystem }) => ({ fileSystem }))

    const desktopItems = useMemo(() => getFileSystem(path)(fileSystem), [fileSystem])


    const initialScreenItems: ReadonlyArray<FileItemProps> = useMemo(() => [
        {
            icon: { regular: myComputerIcon, active: myComputerActiveIcon },
            label: 'My Computer',
            onDoubleClick: () => {
                setExplorerOpen(true)
                navigate('/My Computer')
            }
        },
        {
            icon: { regular: networkNeighborhoodIcon, active: networkNeighborhoodActive },
            label: 'Network Neighborhood',
        },
        {
            icon: { regular: inboxIcon, active: inboxActive},
            label: 'Inbox',
        },
        {
            icon: { regular: emptyTrashIcon, active: emptyTrashActive},
            label: 'Recycle Bin',
        },
    ], [fileSystem])

    const items: ReadonlyArray<FileItemProps> = (

        desktopItems.found 
            ? [
                ...initialScreenItems, 
                ...Object.values(desktopItems.result).map(({ icon, label }) => ({
                    icon,
                    label,
                }))
            ] 
            : initialScreenItems

    ).map(( itemProps, index) => ({...itemProps, onClick: () => {
                setActiveItem(index === activeItem ? -1: index)
    }}))

    return {
        activeItem,
        items
    }

}

export default useMainScreenItems