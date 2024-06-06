import { useMainScreenItemsStore } from "components/MainScreen/store/store";
import { useCallback } from "react";
import styled from "styled-components";
import useMainScreenItemsInit from "./hooks/useMainScreenItemsInit";
import FileItem from "components/FileExplorer/FileItem/FileItem";

const MainScreenWrapper = styled.div`
    padding: 0 2px;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    gap: 15px;
`

const MainScreenContainer = () => {

    useMainScreenItemsInit()

    const { mainScreenItems, mainScreenActiveItem, setMainScreenActiveItem } = useMainScreenItemsStore(({ 
        mainScreenItems, 
        mainScreenActiveItem, 
        setMainScreenActiveItem 
    }) => ({ 
        mainScreenItems, 
        mainScreenActiveItem,
        setMainScreenActiveItem 
    }))
    
    const handleClick = (index: number) => {
        setMainScreenActiveItem(index)
    }

    const isActiveItem = useCallback((index: number) => mainScreenActiveItem === index, [mainScreenActiveItem, mainScreenItems])


    return (
        <MainScreenWrapper>
            {mainScreenItems.map(({ label, icon, onClick, onDoubleClick }, index) => (
                <FileItem 
                    key={label+icon} 
                    isActive={isActiveItem(index)} 
                    icon={isActiveItem(index) ? icon.activeIcon : icon.icon}
                    label={label}
                    onClick={(e) => {
                        onClick(e)
                        handleClick(index)
                    }}
                    onDoubleClick={onDoubleClick}
                    />
            ) )}
        </MainScreenWrapper>
    )
}

export default MainScreenContainer