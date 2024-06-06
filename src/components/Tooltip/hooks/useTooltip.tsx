import { useCallback, useEffect, useRef, useState } from "react";
import { Placement } from "../Tooltip";

const getPosition = (tooltipRect: DOMRect, containerRect: DOMRect, placement: Placement) => {
    const getTop = () => {
        switch (placement) {
            case 'top':
                return containerRect.top - tooltipRect.height - 5 < 0
                    ? containerRect.height + 5
                    : -tooltipRect.height - 5;
            case 'bottom':
                return containerRect.bottom + tooltipRect.height + 5 > window.innerHeight
                    ? -tooltipRect.height - 5
                    : containerRect.height + 5;
            case 'left':
            case 'right':
                return (containerRect.height - tooltipRect.height) / 2;
            default:
                return 0;
        }
    };

    const getLeft = () => {
        switch (placement) {
            case 'left':
                return containerRect.left - tooltipRect.width - 5 < 0
                    ? containerRect.width + 5
                    : -tooltipRect.width - 5;
            case 'right':
                return containerRect.right + tooltipRect.width + 5 > window.innerWidth
                    ? -tooltipRect.width - 5
                    : containerRect.width + 5;
            case 'top':
            case 'bottom':
                return (containerRect.width - tooltipRect.width) / 2;
            default:
                return 0;
        }
    };

    const top = getTop();
    const left = getLeft();

    const adjustedLeft = containerRect.left + left < 0
    ? -containerRect.left
    : containerRect.left + left + tooltipRect.width > window.innerWidth
        ? window.innerWidth - containerRect.left - tooltipRect.width
        : left;

    return { top, left: adjustedLeft };
}

const useTooltip = (placement: Placement) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updatePosition = useCallback(() => {
        if (tooltipRef.current && tooltipRef.current.parentElement) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const containerRect = tooltipRef.current.parentElement.getBoundingClientRect();
            const newPosition = getPosition(tooltipRect, containerRect, placement);
            setPosition(newPosition);
        }
    }, [tooltipRef.current, placement]);

    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, 1500);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            setVisible(false);
        }
    };

    useEffect(() => {
        if (visible) {
            updatePosition();
        }
    }, [visible, updatePosition]);

    return {
        visible,
        position,
        tooltipRef,
        handleMouseEnter,
        handleMouseLeave,
    }
}

export default useTooltip