import { create } from "zustand";
import { FileExplorerStore, WindowsFileSystemRoot, WindowsFileSystemStore } from "./types";

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
    root: {}
}

export const useWindowsFileSystemStore = create<WindowsFileSystemStore>((set) => ({
    windowsFileSystem: fileSystemRoot,
    openFileSystem: fileSystemRoot.root,
    setOpenFileSystem: (fs) => set((pre) => ({...pre, openFileSystem: fs})),
    setWindowsFileSystem: (fileSystem) => set((pre) => ({ ...pre, windowsFileSystem: fileSystem })),
    addWindowsFileSysteItem: () => {}
}))