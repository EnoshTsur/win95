import { useFileSystemStore } from 'components/FileExplorer/store/store';
import { useMemo } from 'react';

const useMainScreenItems = () => {

    const { fileSystem } = useFileSystemStore(({ fileSystem }) => ({ fileSystem }))

    const items = useMemo(() => Object.values(fileSystem['Main Screen']?.next ?? {}), [fileSystem])

    return {
        items,
    }

}

export default useMainScreenItems