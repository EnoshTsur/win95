import { create } from "zustand";
import { FileExplorerRoute, FileExplorerRouteStore, FileExplorerStore, FileSystemItem, FileSystemStore, FileSystemStructure } from "./types";
import driverIcon from '../../../assets/driver.png'
import floppyIcon from '../../../assets/floppy-driver.png'
import folderIcon from '../../../assets/folder.png'
import folderActiveIcon from '../../../assets/folder-active.png'
import historyIcon from '../../../assets/history-icon.png'
import printersIcon from '../../../assets/printers.png'
import FileItemContainer from "../FileItem/FileItemContainer";

export const getFileSystem = (path: ReadonlyArray<string>) => (fileSystem: FileSystemStructure) => {
    return path.reduce((acc, nextPath) => acc.result[nextPath] 
    ? { ...acc, result: acc.result[nextPath].items }  
    : { ...acc, found: false } , { result: fileSystem, found: true })
}

const generateRoutesFromFileSystem = (fileSystem: FileSystemStructure, basePath: string = ''): ReadonlyArray<FileExplorerRoute> => 
    Object.keys(fileSystem).reduce<ReadonlyArray<FileExplorerRoute>>((acc, key) => {
        const item = fileSystem[key]
        const path = `${basePath}/${item.label}`

        const route = {
            path,
            component: () => <FileItemContainer items={Object.values(item.items)} path={path} /> 
        }

        return [
            ...acc,
            route,
            ...generateRoutesFromFileSystem(item.items, path)
        ]
    }, [])


const initialFileSystem: FileSystemStructure = {
    "My Computer": {
        label: "My Computer",
        icon: {regular: '', active: ''},
        items: {
            
            "[A:]": {
                label: "3¹⁄₂ Floppy [A:]",
                icon: { regular: floppyIcon, active: floppyIcon },
                items: {},
            },
            
            "[C:]": {
                label: "[C:]",
                icon: {regular: driverIcon, active: driverIcon },
                items: { 
                
                    "Games": {
                        label: "Games",
                        icon: {regular: folderIcon, active: folderActiveIcon },
                        items: {}
                    },

                    "Program Files": {
                        label: "Program Files",
                        icon: {regular: folderIcon, active: folderActiveIcon },
                        items: {}
                    },
                
                    "Windows": {
                        label: "Windows",
                        icon: {regular: folderIcon, active: folderActiveIcon },
                        items: {
                            "Command": {
                                label: "Command",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "Config": {
                                label: "Config",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "Cookies": {
                                label: "Cookies",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "Cursors": {
                                label: "Cursors",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "Desktop": {
                                label: "Desktop",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {
                                    
                                    "Online Services": {
                                        label: "Online Services",
                                        icon: {regular: folderIcon, active: folderActiveIcon },
                                        items: {},
                                    }
                                }
                            },

                            "Fonts": {
                                label: "Fonts",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "Forms": {
                                label: "Forms",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "Help": {
                                label: "Help",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },

                            "History": {
                                label: "History",
                                icon: {regular : historyIcon, active: historyIcon },
                                items: {}
                            },

                            "System": {
                                label: "System",
                                icon: {regular: folderIcon, active: folderActiveIcon },
                                items: {}
                            },
                        
                    },
                },
            }
        },
        
        "[D:]": {
            label: "[D:]",
            icon: {regular: driverIcon, active: driverIcon },
            items: {}
        },
        "Printers": {
            label: "Printers",
            icon: {regular: printersIcon, active: printersIcon },
            items: {}
        }
    }
}
}

const initialRoutes = generateRoutesFromFileSystem(initialFileSystem)

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
            items: updateFileSystem(fileSystem[currentKey].items, restPath, updateFn)
        }   
    }
}

export const useFileSystemStore = create<FileSystemStore>((set) => ({
    fileSystem: initialFileSystem,
    setFileSystem: (newFileSystem) => set({ fileSystem: newFileSystem }),
    addFolder: (path, folderName, folderIcon) => set((pre) => ({
        fileSystem: updateFileSystem(pre.fileSystem, path, (currentItems) => ({
            ...currentItems,
            [folderName]: { label: folderName, icon: {regular: folderIcon, active: folderIcon }, items: {} }
        }))
    })),
    removeFolder: (path, folderName) => set((pre) => ({
        fileSystem: updateFileSystem(pre.fileSystem, path, (currentItems) => {
            const { [folderName]: _, ...rest } = currentItems
            return rest
        })
    }))
}))

export const useFileExplorerRoutesStore = create<FileExplorerRouteStore>((set) => ({
    routes: initialRoutes,
    setRoutesFromFileSystem: (fileSystem) => set({ routes: generateRoutesFromFileSystem(fileSystem) }),
}))