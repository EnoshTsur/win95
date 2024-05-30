import styled from "styled-components";

const UnderlineWrapper = styled.span<{ color?: string }>`
    text-decoration: solid underline ${({ color }) => color ? color : 'black'} 2px;
`
interface UnderlineProps {
    readonly style?: React.CSSProperties;
    readonly color?: string;
    readonly children: React.ReactNode | string;
}

const Underline = ({ children, ...rest }: UnderlineProps) => {
    return (
        <UnderlineWrapper {...rest} >
            { children }
        </UnderlineWrapper>
    )
}

export default Underline