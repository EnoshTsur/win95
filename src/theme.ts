import { DefaultTheme } from 'styled-components'

const windows95Theme: DefaultTheme = {
    colors: {
        white: '#FFFFFF',
        black: '#000000',
        buttonFace: '#C0C0C0',
        buttonDisabledColor: 'light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))',
        buttonShadow: '#808080',
        darkShadow: '#313131;',
        menu: '#c4c4c4',
        menuTitle: '#939393',
        windowsBg: '#1f9789',
        alertTitleBar: '#00006F',
        tooltipBg: '#f7eedc',

    },
    regular: {
        fileItem: {
            label: {
                desktop: (isActive: string) => `
                    background-color: ${isActive === 'true' ? '#00006F' : '#1f9789'};
                    border: 1px ${isActive === 'true' ? 'dashed' : 'solid'} ${isActive === 'true' ? '#FFFFFF' : '#1f9789'};
                    color: white;
                `,

                fileExplorer: (isActive: string) => `
                background-color: ${isActive === 'true' ? '#00006F' : '#FFFFFF'};
                border: 1px ${isActive === 'true' ? 'dashed' : 'solid'} #FFFFFF;
                color: ${isActive === 'true' ? '#FFFFFF' : '#000000'};
            `,

            }
        }
    }
}

export default windows95Theme

export type Theme = typeof windows95Theme