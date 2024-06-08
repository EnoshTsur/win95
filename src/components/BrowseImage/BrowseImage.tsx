import Alert from "components/Alert/Alert";
import { ButtonProps } from "components/Button/Button";
import { Background } from "components/MainScreen/store/types";
import PanelButton from "components/PanelButton/PanelButton";
import { useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { playErrorSound } from "utils/functions";

const HiddenInput = styled.input`
    visibility: hidden;
    width: 0;
    height: 0;
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
        console.log('handleClick triggered'); // Debug log
        console.log('inputRef.current:', inputRef.current); 
        inputRef?.current?.click()
    }

    return (
        <>
            {
                isFormatError && (
                    <Alert 
                        title={{ 
                            title: 'Format Error',
                            titleButtons: [
                                { children: <IoMdClose />, onClick: () => { setFormat(''); setFormatError(false); }}
                            ]
                        }}
                        message={`File of format ${format} is not supported, try image format instead`}
                        status="ERROR"
                        panelButtons={[
                            { children: 'OK', onClick: () => { setFormat(''); setFormatError(false) }}
                        ]}
                    />
                )
            }
            <HiddenInput type="file" ref={inputRef} onChange={handleChange} key="enosh"/>
            <PanelButton {...rest} onClick={handleClick}>
                { children }
            </PanelButton>
        </>
    )
}

export default BrowseImage