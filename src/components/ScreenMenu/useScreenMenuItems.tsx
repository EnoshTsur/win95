import { useDisplayModalStore } from "components/DispalyProperties/store/store"
import { useMemo } from "react"
import { useStartMenuState } from "store/store"
import { ScreenMenuItem } from "./ScreenMenu"
import Underline from "components/Underline/Underline"

const useScreenMenuItems = () => {

    const { openDisplayProperties } = useDisplayModalStore(({ openDisplayProperties }) => ({ openDisplayProperties }))
    const { closeStartMenu } = useStartMenuState()

    const arrangeIcons = useMemo<ReadonlyArray<ReadonlyArray<ScreenMenuItem>>>(() => [
        [
            { 
                children: <>by <Underline>N</Underline>ame</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>by <Underline>T</Underline>ype</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>by <Underline>S</Underline>ize</>,
                hasCaret: false,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>by <Underline>D</Underline>ate</>,
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
                children: <>Arrange <Underline>I</Underline>cons</>,
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