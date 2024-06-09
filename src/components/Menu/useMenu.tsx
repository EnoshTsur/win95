import { useEffect, useRef, useState, useCallback } from "react";

interface MenuPosition {
    readonly x: number;
    readonly y: number;
}

type MenuDirection = 'left' | 'right'

const useMenu = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = useState<{ row: number; col: number } | null>(null);
    const [menuPosition, setMenuPosition] = useState<MenuPosition>({ x: 0, y: 0 });
    const [xDirection, setXDirection] = useState<MenuDirection>('right')

    const adjustPosition = useCallback((x: number, y: number) => {
        const menuWidth = ref.current?.offsetWidth || 0;
        const menuHeight = ref.current?.offsetHeight || 0;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        setXDirection((x + menuWidth * 2 > screenWidth) ? 'left' : 'right')
        const adjustedX = (x + menuWidth > screenWidth) ? x - menuWidth : x;
        const adjustedY = (y + menuHeight > screenHeight) ? y - menuHeight : y;

        setMenuPosition({ x: adjustedX, y: adjustedY });
    }, []);

    const computeSubMenuX = useCallback((direction: MenuDirection) => {
        if (ref.current != null) {
            const { width } = ref.current.getBoundingClientRect()
            return direction === 'left' ? -(width - 10) : width - 10;
        }
        return 0
    }, [ref.current]);

    return { ref, xDirection, hoveredItem, setHoveredItem, menuPosition, adjustPosition, computeSubMenuX };
};

export default useMenu;


/* 
import { useMemo, useRef, useState } from "react"

const useMenu = () => {
    const [hoveredItem, setHoveredItem] = useState<{ row: number, col: number } | null>(null)

    const ref = useRef<HTMLDivElement | null>(null)

    const computedX = useMemo(() => {
        if (ref.current != null) {
            const { width } = ref.current.getBoundingClientRect()
            return width - 10
        }
        return 0;
    }, [ref.current])

    return {
        ref,
        hoveredItem,
        setHoveredItem,
        computedX,
    }
}

export default useMenu
*/