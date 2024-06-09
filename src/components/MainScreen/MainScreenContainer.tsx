
import styled from "styled-components";
import useMainScreenItems from "./hooks/useMainScreenItems";
import FileItem from "components/FileExplorer/FileItem/FileItem";

const MainScreenWrapper = styled.div`
    padding: 0 0.2rem;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    gap: 1.5rem;
`

const MainScreenContainer = () => {

    const { items } = useMainScreenItems()

    return (
        <MainScreenWrapper>
            {items.map(({ label, icon, onClick, onDoubleClick, iconStyle, path, isActive }) => (
                <FileItem 
                    path={path}
                    hasNext={false}
                    editable={true}
                    key={label+icon} 
                    isActive={isActive} 
                    icon={icon}
                    iconStyle={iconStyle}
                    label={label}
                    onClick={() => {
                        if (onClick) {
                            onClick()                            
                        }
                    }}
                    onDoubleClick={() => {
                        onDoubleClick && onDoubleClick()
                    }}
                    />
            ) )}
        </MainScreenWrapper>
    )
}

export default MainScreenContainer