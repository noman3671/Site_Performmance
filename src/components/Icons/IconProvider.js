import { IconsProvider } from '@aws-amplify/ui-react';

export default ({children}) => {
    return (
        <IconsProvider>
            {children}
        </IconsProvider>
    );
}