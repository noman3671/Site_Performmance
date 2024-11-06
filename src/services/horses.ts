import { generateClient } from 'aws-amplify/api';
// @ts-ignore
import * as mutations from 'app-graphql/mutations.ts';
// @ts-ignore
import * as queries from 'app-graphql/queries.ts';
// @ts-ignore
import {CreateHorseInput} from "../API.ts";
import AmplifyInit from "aws/aws-api";
import uniqueId from "lodash/uniqueId"
import testImage from "assets/test/horse_my_horse_page.png"
import {dateToExtendedISODate} from "aws-date-utils";

AmplifyInit()

const client = generateClient();

export const createHorse = (input: CreateHorseInput) => {
    return client.graphql({
        query: mutations.createHorse,
        variables: { input: input }
    })
};

export class TestImageKey {
    public url;

    constructor(url) {
        this.url = url
    }

    getUrl() {
        return this.url;
    }
}

export const listHorses = () => {
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve({
    //             data: {
    //                 listUserHorses: new Array(3).fill({
    //                     dob: dateToExtendedISODate(new Date("2011-10-02T23:25:42Z")),
    //                     color: 'black',
    //                     photo: new TestImageKey(testImage),
    //                     scannedAt: null,
    //                 }).map((i, k) => { return {...i, id: uniqueId('horse_'), name:  "Horse: " + k}})
    //             }
    //         })
    //     }, 1500)
    // })
    return client.graphql({
        query: queries.listUserHorses,
    })
};

export const deleteHorse = (id) => {
    return client.graphql({
        query: mutations.deleteHorse,
        variables: {
            id
        }
    })
}

export const cancelRequest = (promise, msg = 'cancel request') => client.cancel(promise, msg);