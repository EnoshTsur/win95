
import styled from "styled-components";
import useMainScreenItems from "./hooks/useMainScreenItems";
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

    const { items, activeItem } = useMainScreenItems()

    return (
        <MainScreenWrapper>
            {items.map(({ label, icon, onClick, onDoubleClick }, index) => (
                <FileItem 
                    editable
                    key={label+icon} 
                    isActive={activeItem === index} 
                    icon={icon}
                    label={label}
                    onClick={() => {
                        if (onClick) {
                            onClick()                            
                        }
                    }}
                    onDoubleClick={() => {
                        if (onDoubleClick) {
                            onDoubleClick()
                        }
                    }}
                    />
            ) )}
        </MainScreenWrapper>
    )
}

export default MainScreenContainer