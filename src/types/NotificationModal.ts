export interface NotificationModalImperative {
    uid: string,
    isOpen: boolean,
    open: () => void,
    close: () => void,
    toggle: () => void,
    changeProps: (props: object) => void,
}

export interface NotificationModalRef {
    current: NotificationModalImperative
}