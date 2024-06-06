export interface FileSystemStructure {
    readonly [key: string]: FileSystemItem;
}

export interface FileSystemItem {
    readonly label: string;
    readonly icon: string;
    readonly items: FileSystemStructure
}

export interface FileSystemStore {
    readonly fileSystem: FileSystemStructure
    readonly setFileSystem: (newFileSystem: FileSystemStructure) => void
    readonly addFolder: (path: ReadonlyArray<string>, folderName: string, folderIcon: string) => void
    readonly removeFolder: (path: ReadonlyArray<string>, folderName: string) => void
}

export interface FileExplorerStore {
    readonly isExplorerOpen: boolean 
    readonly setExplorerOpen: (value: boolean) => void
}

export interface FileExplorerRoute {
    readonly path: string,
    readonly component: React.ComponentType
}

export interface FileExplorerRouteStore {
    readonly routes: ReadonlyArray<FileExplorerRoute>
    readonly setRoutesFromFileSystem: (fileSystem: FileSystemStructure) => void
}