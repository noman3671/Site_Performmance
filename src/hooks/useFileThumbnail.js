import {useEffect, useState} from "react";

const useFileThumbnail = (imgFile) => {
    const [pictureThumbnail, setPictureThumbnail] = useState();

    useEffect(() => {
        if (!imgFile) {
            setPictureThumbnail(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imgFile)

        setPictureThumbnail(objectUrl)

        return () => {
            URL.revokeObjectURL(objectUrl)
        }
    }, [imgFile])

    return pictureThumbnail;
}

export default useFileThumbnail;