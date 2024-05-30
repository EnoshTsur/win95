import programsIcon from '../../assets/pgms.png'
import documentsIcon from '../../assets/dox.png'
import settingsIcon from '../../assets/settings.png'
import searchIcon from '../../assets/search.png'
import helpIcon from '../../assets/help.png'
import runIcon from '../../assets/run.png'

export const items = Object.freeze([
    {
        title: 'Programs',
        icon: programsIcon,
        hasCaret: true,
    },
    {
        title: 'Documents',
        icon: documentsIcon,
        hasCaret: true,
    },
    {
        title: 'Settings',
        icon: settingsIcon,
        hasCaret: true,
    },
    {
        title: 'Find',
        icon: searchIcon,
        hasCaret: true,
    },
    {
        title: 'Help',
        icon: helpIcon,
        hasCaret: false,
    },
    {
        title: 'run',
        icon: runIcon,
        hasCaret: false,
    }
])