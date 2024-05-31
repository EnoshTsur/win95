import { ButtonProps } from "components/Button/Button";
import PanelButton from "components/PanelButton/PanelButton";
import { useRef } from "react";
import { UserBackgroundUpload } from "store/types";
import styled from "styled-components";

const HiddenInput = styled.input`
    display: none
`

interface BrowseProps extends ButtonProps {
    readonly saveImage: (userUpload: UserBackgroundUpload)=> void
}

const BrowseImage = ({ children, saveImage, ...rest }: BrowseProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files && target.files[0]) {
            saveImage({
                fileName: target.files[0].name.slice(0, 15),
                url: URL.createObjectURL(target.files[0])
            })
        }
    }

    const handleClick = () => {
        inputRef?.current?.click()
    }

    return (
        <>
            <HiddenInput type="file" ref={inputRef} onChange={handleChange}/>
            <PanelButton {...rest} onClick={handleClick}>
                { children }
            </PanelButton>
        </>
    )
}

export default BrowseImage