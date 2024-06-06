import { create } from "zustand";
import { FileExplorerStore, WindowsFileSystemRoot, WindowsFileSystemStore } from "./types";
import driverIcon from '../../../assets/driver.png'
import floppyIcon from '../../../assets/floppy-driver.png'
import folderIcon from '../../../assets/folder.png'

export const useFileExplorerStore = create<FileExplorerStore>((set) => ({
    openExplorers: [],
    activeExplorer: '',
    addOpenExplorer: (explorer) => set((pre) => ({
        ...pre,
        openExplorers: [...pre.openExplorers, explorer]
    })),
    removeExplorer: (id) => set((pre) => ({...pre, openExplorers: pre.openExplorers.filter(({ id: explorerId }) => explorerId !== id  )})),
    setActiveExplorer: (id) => set((pre) => ({...pre, activeExplorer: id }))
}))

const fileSystemRoot: WindowsFileSystemRoot = {
    root: {
        "A": {
            label: "3¹⁄₂ Floppy [A:]",
            icon: floppyIcon,
            items: {},
        },

        "C": {
            label: "[C:]",
            icon: driverIcon,
            items: { 
                "Program Files": {
                    label: "Program Files",
                    icon: folderIcon,
                    items: {}
                },

                "Games": {
                    label: "Games",
                    icon: folderIcon,
                    items: {}
            },

                "Windows": {
                    label: "Windows",
                    icon: folderIcon,
                    items: {

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
                        }
                    },
                },
            }
        },

        "D": {
            label: "[D:]",
            icon: driverIcon,
            items: {}
        },
    }
}

export const useWindowsFileSystemStore = create<WindowsFileSystemStore>((set) => ({
    windowsFileSystem: fileSystemRoot,
    openFileSystem: fileSystemRoot.root,
    setOpenFileSystem: (fs) => set((pre) => ({...pre, openFileSystem: fs})),
    setWindowsFileSystem: (fileSystem) => set((pre) => ({ ...pre, windowsFileSystem: fileSystem })),
    addWindowsFileSysteItem: () => {}
}))