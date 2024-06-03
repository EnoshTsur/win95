import Alert from "components/Alert/Alert";
import { ButtonProps } from "components/Button/Button";
import PanelButton from "components/PanelButton/PanelButton";
import { useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Background } from "store/types";
import styled from "styled-components";
import { playErrorSound } from "utils/functions";

const HiddenInput = styled.input`
    display: none
`

interface BrowseProps extends ButtonProps {
    readonly saveImage: (userUpload: Background)=> void
}

const BrowseImage = ({ children, saveImage, ...rest }: BrowseProps) => {

    const [isFormatError, setFormatError] = useState(false)
    const [format, setFormat] = useState('')

    const inputRef = useRef<HTMLInputElement | null>(null)

    const imageEndings = useMemo(() => ['.png', '.jpg', '.jpeg', '.gif'], [])

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files && target.files[0]) {
            
            const fileName = target.files[0].name

            if (imageEndings.some((ending) => fileName.toLowerCase().includes(ending))) {
                saveImage({
                    fileName: fileName.slice(0, 15),
                    url: URL.createObjectURL(target.files[0])
                })
            } else {
                setFormat(fileName)
                setFormatError(true) 
                playErrorSound()
            }
        }
    }

    const handleClick = () => {
        inputRef?.current?.click()
    }

    return (
        <>
            {
                isFormatError && (
                    <Alert 
                        title="Format Error" 
                        titleButtons={[
                            { children: <IoMdClose />, onClick: () => { setFormat(''); setFormatError(false); }}
                        ]}
                        message={`File of format ${format} is not supported, try image format instead`}
                        status="WARNING"
                        panelButtons={[
                            { children: 'OK', onClick: () => { setFormat(''); setFormatError(false) }}
                        ]}
                    />
                )
            }
            <HiddenInput type="file" ref={inputRef} onChange={handleChange}/>
            <PanelButton {...rest} onClick={handleClick}>
                { children }
            </PanelButton>
        </>
    )
}

export default BrowseImage