
import React from 'react';
import styled from 'styled-components';
import useTooltip from './hooks/useTooltip';

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TooltipText = styled.div<{ visible: string, top: number, left: number}>`
    visibility: ${({ visible }) => (visible == 'true' ? 'visible' : 'hidden')};
    background-color: ${({ theme }) => theme.colors.tooltipBg};
    color: black;
    text-align: center;
    padding: 5px;
    position: absolute;
    z-index: 9999;
    border: 1px solid black;
    opacity: ${({ visible }) => (visible === 'true' ? 1 : 0)};
    white-space: nowrap;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
`;

export type Placement = 'top'| 'bottom' | 'left'  | 'right'

interface TooltipProps {
    readonly placement?: Placement
    readonly children: React.ReactNode
    readonly title: string
}

const Tooltip = ({ children, title, placement = 'top' }: TooltipProps) => {

    const { handleMouseEnter, handleMouseLeave, tooltipRef, visible, position} = useTooltip(placement)

    return (
        <TooltipContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            { visible && <TooltipText ref={tooltipRef} visible={`${visible}`} top={position.top} left={position.left}>{title}</TooltipText> }
        </TooltipContainer>
    );
};

export default Tooltip;