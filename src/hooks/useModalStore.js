import {useEffect, useRef} from "react";
import ModalStore from "components/Modal/ModalStore";

/**
 * Represents a book.
 * @return ?NotificationModalRef
 */
export const useModal = (component) => {
    const ref = useRef();

    useEffect(() => {
        ModalStore.register(component).then((reft) => {
            ref.current = reft.current;
        })
    }, [])

    return ref;
}
