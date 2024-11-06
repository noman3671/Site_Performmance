import { signIn, signUp, autoSignIn } from 'aws-amplify/auth';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';

type SignUpParameters = {
    username: string;
    password: string;
    email: string;
    phone_number: string;
};

// export async function handleSignUp(form) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { isSignUpComplete, userId, nextStep } = await signUp({
//                 username: form.email,
//                 password: form.password,
//                 options: {
//                     userAttributes: {
//                         email: form.email,
//                         given_name: form.given_name,
//                         family_name: form.family_name,
//                         phone_number: form.phone_number,
//                         picture: form.picture,
//                         address: form.address,
//                         'custom:city': form['custom:city'],
//                         'custom:state': form['custom:state'],
//                         'custom:country': form['custom:country'],
//                     },
//                     // optional
//                     autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
//                 }
//             });

//             resolve({ isSignUpComplete, userId, nextStep })
//         } catch (error) {
//             reject(error)
//         }
//     })
// }


export async function handleSignUp(form) {

    return new Promise(async (resolve, reject) => {
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: form.email,
                password: form.password,
                options: {
                    userAttributes: {
                        email: form.email,
                        given_name: form.given_name,
                        family_name: form.family_name,
                    },
                    // optional
                    autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
                }
            });

            resolve({ isSignUpComplete, userId, nextStep })
        } catch (error) {
            reject(error)
        }
    })
}



export async function handleSignUpConfirmation({
    username,
    confirmationCode
}: ConfirmSignUpInput) {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await confirmSignUp({
                username,
                confirmationCode
            });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}

export async function handleAutoSignIn() {
    try {
        const signInOutput = await autoSignIn();
        // handle sign-in steps
    } catch (error) {
    }
}

export async function handleSignIn({ username, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await signIn({ username, password });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}