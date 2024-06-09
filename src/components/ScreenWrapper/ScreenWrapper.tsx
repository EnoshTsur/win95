import useBackgrounInit from "hooks/useBackgroundsInit";
import styled from "styled-components";
import loadingBackground from '../../assets/loading-screen.jpg'
import MainScreen from "components/MainScreen/MainScreen";
import StartContainer from "components/StartContainer/StartContainer";
import { useEffect, useState } from "react";

const Screen = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
`

const ImageBg = styled.img<{ isloading: string }>`
    position: absolute;
    object-fit: fill;
    height: 100%;
    width: 100%;
    opacity: ${({ isloading }) => isloading === 'true' ? 1 : 0 };
    transition: opacity 1s ease-out;
`

const Replacement = styled.div<{ isfading: string }>`
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: ${({ isfading }) => isfading === "true" ? 0: 1 };
    transition: opacity 1s ease-out;
`

const ScreenWrapper = () => {
    const { isLoading } = useBackgrounInit()
    const [isFading, setIsFading] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setIsFading(false)
            }, 200)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [isLoading])

    return (
        <Screen>
            <ImageBg src={loadingBackground} isloading={`${isLoading}`} />
            { !isLoading &&  ( 
                <Replacement isfading={`${isFading}`}>
                    <MainScreen />
                    <StartContainer />
                </Replacement> 
            )}
        </Screen>
    )
}

export default ScreenWrapper