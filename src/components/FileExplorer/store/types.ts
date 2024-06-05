export interface WindowsFileSystemItem {
    readonly label: string;
    readonly icon: string;
    readonly isFolder: boolean;
    readonly items: { [name: string]: WindowsFileSystemItem };
}

export interface WindowsFileSystem {
    readonly [drive: string]: WindowsFileSystemItem;
}

export interface WindowsFileSystemRoot {
    readonly root: WindowsFileSystem
}

export interface WindowsFileSystemStore {
    readonly windowsFileSystem: WindowsFileSystemRoot
    readonly openFileSystem: WindowsFileSystem
    readonly setOpenFileSystem: (path: WindowsFileSystem) => void
    readonly setWindowsFileSystem: (WindowsFileSystemRoot: WindowsFileSystemRoot) => void
    readonly addWindowsFileSysteItem: (windowsFileSystemItem: WindowsFileSystemItem) => void

}

export interface FileExplorer {
    readonly id: string
    readonly path: string
}

export interface FileExplorerStore {
    readonly openExplorers: ReadonlyArray<FileExplorer>
    readonly activeExplorer: string
    readonly addOpenExplorer: (explorer: FileExplorer) => void
    readonly removeExplorer: (id: string) => void
    readonly setActiveExplorer: (id: string) => void
}