import { create } from "zustand";
import { FileExplorerRoute, FileExplorerRouteStore, FileExplorerStore, FileSystemItem, FileSystemStore, FileSystemStructure } from "./types";
import FileItemContainer from "../FileItem/FileItemContainer";

export const getFileSystem = (path: ReadonlyArray<string>) => (fileSystem: FileSystemStructure) => {
    return path.reduce((acc, nextPath) => (acc.result[nextPath] && acc.result[nextPath].next )
    ? { ...acc, result: acc.result[nextPath].next! }  
    : { ...acc, found: false } , { result: fileSystem, found: true })
}

export const generateRoutesFromFileSystem = (fileSystem: FileSystemStructure): ReadonlyArray<FileExplorerRoute> => {
    const traverseFileSystem = (items: FileSystemStructure): ReadonlyArray<FileExplorerRoute> => {
        return Object.keys(items).filter((key) => items[key].next != null).flatMap(key => {
            const item = items[key];
            const route: FileExplorerRoute = {
                path: item.path.join('/'),
                component: () => <FileItemContainer items={Object.values(item.next ?? {})}  />
            };
            return [route, ...traverseFileSystem(item.next || {})];
        });
    };
    return traverseFileSystem(fileSystem);
};


export const useFileExplorerStore = create<FileExplorerStore>((set) => ({
    isExplorerOpen: false,
    setExplorerOpen: (value) => set((pre) => ({ ...pre, isExplorerOpen: value }))
}))


const updateFileSystem = (
    fileSystem: FileSystemStructure, 
    path: ReadonlyArray<string>, 
    updateFn: (currentItems: FileSystemStructure) => FileSystemStructure
): FileSystemStructure => {
    if (path.length === 0) {
        return updateFn(fileSystem)
    }

    const [currentKey, ...restPath] = path

    return {
        ...fileSystem,
        [currentKey]: {
            ...fileSystem[currentKey],
            next: fileSystem[currentKey].next != undefined 
                ? updateFileSystem(fileSystem[currentKey].next!, restPath, updateFn) 
                : undefined
        }   
    }
}

export const useFileSystemStore = create<FileSystemStore>((set) => ({
    fileSystem: {},
    setFileSystem: (newFileSystem) => set({ fileSystem: newFileSystem }),
    addFolder: (path, folderName, item) => set(({ fileSystem }) => ({
        fileSystem: updateFileSystem(fileSystem, path, (currentItems) => ({
            ...currentItems,
            [folderName]: {
                ...item,
                path: [...path, folderName],
            },
        })),
    })),

    toggleActive: (path) => set(({ fileSystem }) => {
        const updateState = (items: FileSystemStructure): FileSystemStructure => {
            return Object.keys(items).reduce<FileSystemStructure>((acc, key) => {
                const item = items[key];
                const updatedItem = item.path.every((entry) => path.includes(entry))
                    ? { ...item, isActive: !item.isActive }
                    : { ...item, next: item.next != undefined ? updateState(item.next) : undefined };

                return { ...acc, [key]: updatedItem };
            }, {});
        };

        return { fileSystem: updateState(fileSystem) };
    }),

    setEditable: (path, editable) => set(({ fileSystem }) => {
        const updateState = (items: FileSystemStructure): FileSystemStructure => {
            return Object.keys(items).reduce<FileSystemStructure>((acc, key) => {
                const item = items[key];
                const updatedItem = item.path === path
                    ? { ...item, editable }
                    : { ...item, next: item.next != undefined ? updateState(item.next) : undefined };

                return { ...acc, [key]: updatedItem };
            }, {});
        };

        return { fileSystem: updateState(fileSystem) };
    }),
}));
export const useFileExplorerRoutesStore = create<FileExplorerRouteStore>((set) => ({
    routes: [],
    setRoutesFromFileSystem: (fileSystem) => set({ routes: generateRoutesFromFileSystem(fileSystem) }),
}))