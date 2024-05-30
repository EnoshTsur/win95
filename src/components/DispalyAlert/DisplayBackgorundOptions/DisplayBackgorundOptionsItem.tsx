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

const OptionsItemWrapper2 = styled.div`
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
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
            <OptionsItemWrapper2>
            { children }
            </OptionsItemWrapper2>
        </OptionsItemWrapper>
    )
}

export default DisplayBackgorundOptionsItem