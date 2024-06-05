import { useMainScreenItemsStore } from "components/MainScreen/store/store";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import MainScreenItem from "./MainScreenItem";

const MainScreenWrapper = styled.div`
    padding: 0 2px;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    gap: 15px;
`

const MainScreenContainer = () => {

    const ref = useRef(null)

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

    const isActiveItem = useCallback((index: number) => mainScreenActiveItem === index, [mainScreenActiveItem])

    useEffect(() => {
        console.log({ mainScreenActiveItem });
        
    }, [mainScreenActiveItem])


    return (
        <MainScreenWrapper ref={ref} onClick={(e) =>{
            if (e.target === ref.current) {
                setMainScreenActiveItem(-1)
            }
            
        }}>
            {mainScreenItems.map(({ label, icon, onClick }, index) => (
                <MainScreenItem 
                    key={label+icon} 
                    isActive={isActiveItem(index)} 
                    icon={isActiveItem(index) ? icon.activeIcon : icon.icon}
                    label={label}
                    onClick={(e) => {
                        onClick(e)
                        handleClick(index)
                    }}
                />
            ) )}
        </MainScreenWrapper>
    )
}

export default MainScreenContainer