import Underline from "components/Underline/Underline";
import styled from "styled-components";

const OptionsItemWrapper = styled.div`
    position: relative;
    flex-basis: 50%;
    border-top: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-left: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 2px solid ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
`

const OptionsContentItemWrapper = styled.div`
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    height: 100%;

`

const OptionsItemTitle = styled.div`
    position: absolute;
    top: -11px;
    left: 11px;
    background-color: ${({ theme }) => theme.colors.menu };
`

interface OptionsItemProps {
    readonly title: string;
    readonly children: React.ReactNode
}

const DisplayBackgorundOptionsItem = ({ title, children }: OptionsItemProps) => {
    return (
        <OptionsItemWrapper>
            <OptionsItemTitle>
                <Underline>
                    {title.charAt(0)}
                </Underline>
                <span>
                    {title.slice(1)}
                </span>
            </OptionsItemTitle>
            <OptionsContentItemWrapper>
            { children }
            </OptionsContentItemWrapper>
        </OptionsItemWrapper>
    )
}

export default DisplayBackgorundOptionsItem