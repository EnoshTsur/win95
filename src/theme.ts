import { DefaultTheme } from 'styled-components'

const windows95Theme: DefaultTheme = {
    colors: {
        white: '#FFFFFF',
        black: '#000000',
        buttonFace: '#C0C0C0',
        buttonShadow: '#808080',
        darkShadow: '#313131;',
        menu: '#C3C7CB',
        menuTitle: '#939393',
        windowsBg: '#1f9789',
        alertTitleBar: '#00006F',
    }
}

export default windows95Theme

export type Theme = typeof windows95Theme