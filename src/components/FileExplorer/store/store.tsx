import { create } from "zustand";
import { FileExplorerRoute, FileExplorerRouteStore, FileExplorerStore, FileSystemStore, FileSystemStructure } from "./types";
import driverIcon from '../../../assets/driver.png'
import floppyIcon from '../../../assets/floppy-driver.png'
import folderIcon from '../../../assets/folder.png'
import historyIcon from '../../../assets/history-icon.png'
import printersIcon from '../../../assets/printers.png'
import FolderItem from "../FolderItem/FolderItem";

const generateRoutesFromFileSystem = (fileSystem: FileSystemStructure, basePath: string = ''): ReadonlyArray<FileExplorerRoute> => 
    Object.keys(fileSystem).reduce<ReadonlyArray<FileExplorerRoute>>((acc, key) => {
        const item = fileSystem[key]
        const path = `${basePath}/${item.label}`

        const route = {
            path,
            component: () => (<>
            {Object.values(item.items).map(({ label, icon, items }) => (
                <FolderItem 
                    key={path + label} 
                    label={label} 
                    icon={icon} 
                    nextNavigation={Object.values(items).length > 0 ? `${path}/${label}`: undefined}
                    onClick={() => {}} 
                    onDoubleClick={() => {}} 
                    isActive={false}
                />
            )) }
            </>)
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
        icon: '',
        items: {
            
            "A": {
                label: "3¹⁄₂ Floppy [A:]",
                icon: floppyIcon,
                items: {},
            },
            
            "C": {
                label: "[C:]",
                icon: driverIcon,
                items: { 
                
                    "Games": {
                        label: "Games",
                        icon: folderIcon,
                        items: {}
                    },

                    "Program Files": {
                        label: "Program Files",
                        icon: folderIcon,
                        items: {}
                    },
                
                    "Windows": {
                        label: "Windows",
                        icon: folderIcon,
                        items: {
                            "Command": {
                                label: "Command",
                                icon: folderIcon,
                                items: {}
                            },

                            "Config": {
                                label: "Config",
                                icon: folderIcon,
                                items: {}
                            },

                            "Cookies": {
                                label: "Cookies",
                                icon: folderIcon,
                                items: {}
                            },

                            "Cursors": {
                                label: "Cursors",
                                icon: folderIcon,
                                items: {}
                            },

                            "Desktop": {
                                label: "Desktop",
                                icon: folderIcon,
                                items: {
                                    
                                    "Online Services": {
                                        label: "Online Services",
                                        icon: folderIcon,
                                        items: {},
                                    }
                                }
                            },

                            "Fonts": {
                                label: "Fonts",
                                icon: folderIcon,
                                items: {}
                            },

                            "Forms": {
                                label: "Forms",
                                icon: folderIcon,
                                items: {}
                            },

                            "Help": {
                                label: "Help",
                                icon: folderIcon,
                                items: {}
                            },

                            "History": {
                                label: "History",
                                icon: historyIcon,
                                items: {}
                            },

                            "System": {
                                label: "System",
                                icon: folderIcon,
                                items: {}
                            },
                        
                    },
                },
            }
        },
        
        "D": {
            label: "[D:]",
            icon: driverIcon,
            items: {}
        },
        "Printers": {
            label: "Printers",
            icon: printersIcon,
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
            [folderName]: { label: folderName, icon: folderIcon, items: {} }
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
    addRoute: (route) => set((pre) => ({
        routes: [...pre.routes, route]
    })),
    removeRoute: (path) => set((pre) => ({
        routes: pre.routes.filter((route) => route.path !== path)
    }))
}))