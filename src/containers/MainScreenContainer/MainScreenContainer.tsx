import { useMainScreenItemsStore } from "components/MainScreen/store/store";
import { useCallback } from "react";
import styled from "styled-components";

const MainScreenWrapper = styled.div`
    padding: 0 2px;
    display: grid;
    grid-auto-columns: max-content;
`

const ScreenItem = styled.div<{ isactive: boolean }>`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    font-family: mslevi;

    &:hover{
        cursor: pointer;    
    }

    img {
        width: 80px;
    }


    span {
        border: ${({ theme, isactive }) => isactive ? `1px dashed ${theme.colors.white}` : `1px solid ${theme.colors.windowsBg}` };
        background-color: ${({ theme, isactive }) => isactive ? theme.colors.alertTitleBar : theme.colors.windowsBg};
        color: white;
        letter-spacing: 1px;
        max-width: 6rem;
    }
`

const MainScreenContainer = () => {

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
        setMainScreenActiveItem(mainScreenActiveItem === index ? -1 : index)
    }

    const isActiveItem = useCallback((index: number) => mainScreenActiveItem === index, [mainScreenActiveItem])


    return (
        <MainScreenWrapper>
            {mainScreenItems.map(({ label, icon, onClick }, index) => (
                <ScreenItem key={label+icon} isactive={isActiveItem(index)} onClick={(e) => {
                    onClick(e)
                    handleClick(index)
                }}>
                    <img src={isActiveItem(index) ? icon.activeIcon : icon.icon} alt={label} />
                    <span>{label}</span>
                </ScreenItem>
            ) )}
        </MainScreenWrapper>
    )
}

export default MainScreenContainer