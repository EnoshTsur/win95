import styled from "styled-components";

const MainScreenWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const ScreenItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 3px;
    text-align: center;
    align-items: center;
    font-family: mslevi;

    &:hover{
        cursor: pointer;    
    }

    img {
        width: 3rem;
    }

    span {
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 2px;
    }
`

interface MainScreenContainerProps {
    readonly list: ReadonlyArray<{
        label: string,
        icon: string,
    }>
}

const MainScreenContainer = ({ list }: MainScreenContainerProps) => {
    return (
        <MainScreenWrapper>
            {list.map(({ label, icon }) => (
                <ScreenItem key={label+icon}>
                    <img src={icon} />
                    <span>{label}</span>
                </ScreenItem>
            ) )}
        </MainScreenWrapper>
    )
}

export default MainScreenContainer