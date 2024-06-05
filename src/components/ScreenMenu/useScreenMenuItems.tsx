import { useDisplayModalStore } from "components/DispalyProperties/store/store"
import { useMemo } from "react"
import { useStartMenuState } from "store/store"
import { ScreenMenuItem } from "./ScreenMenu"
import Underline from "components/Underline/Underline"
import styled from "styled-components"

const FlexWrapper = styled.div`
    display: flex;
    gap: 5px;
`

const useScreenMenuItems = () => {

    const { openDisplayProperties } = useDisplayModalStore(({ openDisplayProperties }) => ({ openDisplayProperties }))
    const { closeStartMenu } = useStartMenuState()

    const newIcons = useMemo<ReadonlyArray<ReadonlyArray<ScreenMenuItem>>>(() => [
        [
            { 
                children: <><Underline>F</Underline>older</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <><Underline>S</Underline>hortcut</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
        ],
        [
            { 
                children: <>Wave Sound</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>Text Document</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>WordPad Document</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>Bitmap Image</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>Briefcase</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
        ],
    ], [])

    const arrangeIcons = useMemo<ReadonlyArray<ReadonlyArray<ScreenMenuItem>>>(() => [
        [
            { 
                children: <FlexWrapper><span>by</span> <span><Underline>N</Underline>ame</span></FlexWrapper>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <FlexWrapper><span>by</span> <span><Underline>T</Underline>ype</span></FlexWrapper>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <FlexWrapper><span>by</span> <span><Underline>S</Underline>ize</span></FlexWrapper>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <FlexWrapper><span>by</span> <span><Underline>D</Underline>ate</span></FlexWrapper>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
        ],
        [
            { 
                children: <><Underline>A</Underline>uto Arrange</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
        ],
    ], [])

    const screenMenuItems = useMemo<ReadonlyArray<ReadonlyArray<ScreenMenuItem>>>(() => [
        [
            { 
                children: <FlexWrapper><span>Arrange</span> <span><Underline>I</Underline>cons</span></FlexWrapper>,
                hasCaret: true,
                disabled: false,
                onClick: () => {},
                next: arrangeIcons,
            },
            { 
                children: <>Lin<Underline>e</Underline> up Icons</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
        ],
        [
            { 
                children: <><Underline color="light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))">P</Underline>aste</>,
                hasCaret: false,
                disabled: true,
                onClick: () => {},
            },
            { 
                children: <>Paste <Underline color="light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))">S</Underline>hortcut</>,
                hasCaret: false,
                disabled: true,
                onClick: () => {},
            },
        ],
        [
            { 
                children: <>Ne<Underline>w</Underline></>,
                hasCaret: true,
                disabled: false,
                onClick: () => {},
                next: newIcons,
            }, 
        ],
        [
            { 
                children: <>P<Underline>r</Underline>operties</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {
                    openDisplayProperties()
                    closeStartMenu()
                },
            },
        ]
    ], [])

    return {
        screenMenuItems,
        arrangeIcons,
    }
}

export default useScreenMenuItems