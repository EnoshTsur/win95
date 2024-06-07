export interface FileIcon {
    readonly active: string
    readonly regular: string
}

export interface FileSystemStructure {
    readonly [key: string]: FileSystemItem;
}

export interface FileSystemItem {
    readonly label: string;
    readonly icon: FileIcon;
    readonly iconStyle?: React.CSSProperties
    readonly path: ReadonlyArray<string>
    readonly next?: FileSystemStructure
    readonly isActive?: boolean;
    readonly editable?: boolean;
    readonly onClick?: () => void
    readonly onDoubleClick?: () => void
}

export interface FileSystemStore {
    readonly fileSystem: FileSystemStructure;
    readonly setFileSystem: (newFileSystem: FileSystemStructure) => void;
    readonly addFolder: (path: ReadonlyArray<string>, folderName: string, fileSystemItem: FileSystemItem) => void;
    readonly toggleActive: (path: ReadonlyArray<string>) => void;
    readonly setEditable: (path: ReadonlyArray<string>, editable: boolean) => void;
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