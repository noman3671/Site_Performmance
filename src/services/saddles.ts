import { generateClient } from 'aws-amplify/api';
// @ts-ignore
import * as mutations from 'app-graphql/mutations.ts';
// @ts-ignore
import * as queries from 'app-graphql/queries.ts';
// @ts-ignore
// @ts-ignore
import {
    CreateSaddleInput, ListUserHorsesQueryVariables,
    SaddleStatus,
    SaddleType,
    SeatMaterial, UpdateSaddleInput,
    // @ts-ignore
} from "../API.ts";
import AmplifyInit from "aws/aws-api";
import {dateToExtendedISODate} from "aws-date-utils";
// @ts-ignore
import {TestImageKey} from "./horses.ts";
import uniqueId from "lodash/uniqueId"
import random from "lodash/random"
import sample from "lodash/sample"
import testImageSaddle from "assets/test/saddle_test.png"
import {saddle} from "../graphql/queries";

AmplifyInit()

const client = generateClient();

export const createSaddle = (input: CreateSaddleInput) => {
    return client.graphql({
        query: mutations.createSaddle,
        variables: { input: input }
    })
};

export const updateSaddle = (input: UpdateSaddleInput) => {
    return client.graphql({
        query: mutations.updateSaddle,
        variables: { input: input }
    })
};

export const listSaddlesForStore = (horseId) => {
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve({
    //             data: {
    //                 listHorseSaddleFit: new Array(20).fill({
    //                     __typename: "SaddleFit",
    //                     horseId: horseId,
    //                     createdAt: dateToExtendedISODate(new Date("2011-10-02T23:25:42Z")),
    //                     updatedAt: dateToExtendedISODate(new Date("2011-10-02T23:25:42Z")),
    //
    //                 }).map((i, k) => { return {...i,
    //                     saddleId: uniqueId('horse_'),
    //                     userId: uniqueId('user_'),
    //                     name:  "Horse: " + k,
    //                     score: random(40, 100),
    //                     saddle:  {
    //                         id: uniqueId('saddle_'),
    //                         userId: uniqueId('user_'),
    //                         type: sample(Object.values(SaddleType)),
    //                         material: sample(Object.values(SeatMaterial)),
    //                         // is this should be seat material?
    //                         price: random(3000, 10000),
    //                         brandName: 'Martin Saddlery Stingray Barrel Racing Saddle',
    //                         // brand name not found in figma
    //                         size: random(10, 20),
    //                         color: 'orange',
    //                         model: 'model',
    //                         // not found in figma
    //                         status: SaddleStatus.LIVE,
    //                         // condition: Condition,
    //                         // yearOfManufacture: number,
    //                         // // not found in figma
    //                         // maker?: string | null,
    //                         // // is this should be brand name
    //                         // makerLocation?: string | null,
    //                         // finishedSeatSize?: number | null,
    //                         // newOrUsed?: NewOrUsed | null,
    //                         // serialNumber?: string | null,
    //                         // amountOfTooling?: string | null,
    //                         // unTooledPortionsTexture?: string | null,
    //                         // typeOfTooling?: string | null,
    //                         // weight?: number | null,
    //                         // skirtLength?: number | null,
    //                         // treeType?: TreeType | null,
    //                         // treeWarranty?: string | null,
    //                         // gulletWidth?: number | null,
    //                         // swellWidth?: number | null,
    //                         // cantleHeight?: number | null,
    //                         // finishedHornHeight?: number | null,
    //                         // hornCapWidth?: number | null,
    //                         // riggingType?: RiggingType | null,
    //                         // fleece?: Fleece | null,
    //                         // fendersLeathersCutLength?: number | null,
    //                         // cantle?: number | null,
    //                         // conchoType?: string | null,
    //                         // hardwareType?: string | null,
    //                         // strings?: string | null,
    //                         // stirrups?: string | null,
    //                         // frontCinch?: boolean | null,
    //                         // frontBilletLatigo?: string | null,
    //                         // rearCinch?: boolean | null,
    //                         // backBilletLatigo?: string | null,
    //                         // style?: string | null,
    //                         // gullet?: number | null,
    //                         // saddleFitNumber?: number | null,
    //                         photo: new TestImageKey(testImageSaddle),
    //                         // description?: string | null,
    //                         // availability?: string | null,
    //                         // scannedAt?: number | null,
    //                         // createdAt: number,
    //                         // updatedAt: number,
    //                     },
    //                 }})
    //             }
    //         })
    //     }, 1500)
    // })
    return client.graphql({
        query: queries.listHorseSaddleFit,
        variables: { horseId: horseId }
    })
};

export const listUserSaddles = (params) => {
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve({
    //             data: {
    //                 listUserSaddles: new Array(15).fill({
    //                     createdAt: dateToExtendedISODate(new Date("2011-10-02T23:25:42Z")),
    //                     lastScan: dateToExtendedISODate(new Date("2011-10-02T23:25:42Z")),
    //                     updatedAt: dateToExtendedISODate(new Date("2011-10-02T23:25:42Z")),
    //
    //                 }).map((i, k) => { return {...i,
    //                     ...{
    //                         id: uniqueId('saddle_'),
    //                         userId: uniqueId('user_'),
    //                         type: sample(Object.values(SaddleType)),
    //                         material: sample(Object.values(SeatMaterial)),
    //                         // is this should be seat material?
    //                         price: random(3000, 10000),
    //                         brandName: 'Martin Saddlery Stingray Barrel Racing Saddle',
    //                         // brand name not found in figma
    //                         size: random(10, 20),
    //                         color: 'orange',
    //                         model: 'model',
    //                         // not found in figma
    //                         status: [SaddleStatus.BLOCKED, SaddleStatus.LIVE, SaddleStatus.SOLD, SaddleStatus.SCAN][random(0,3)],
    //                         // condition: Condition,
    //                         // yearOfManufacture: number,
    //                         // // not found in figma
    //                         // maker?: string | null,
    //                         // // is this should be brand name
    //                         // makerLocation?: string | null,
    //                         // finishedSeatSize?: number | null,
    //                         // newOrUsed?: NewOrUsed | null,
    //                         // serialNumber?: string | null,
    //                         // amountOfTooling?: string | null,
    //                         // unTooledPortionsTexture?: string | null,
    //                         // typeOfTooling?: string | null,
    //                         // weight?: number | null,
    //                         // skirtLength?: number | null,
    //                         // treeType?: TreeType | null,
    //                         // treeWarranty?: string | null,
    //                         // gulletWidth?: number | null,
    //                         // swellWidth?: number | null,
    //                         // cantleHeight?: number | null,
    //                         // finishedHornHeight?: number | null,
    //                         // hornCapWidth?: number | null,
    //                         // riggingType?: RiggingType | null,
    //                         // fleece?: Fleece | null,
    //                         // fendersLeathersCutLength?: number | null,
    //                         // cantle?: number | null,
    //                         // conchoType?: string | null,
    //                         // hardwareType?: string | null,
    //                         // strings?: string | null,
    //                         // stirrups?: string | null,
    //                         // frontCinch?: boolean | null,
    //                         // frontBilletLatigo?: string | null,
    //                         // rearCinch?: boolean | null,
    //                         // backBilletLatigo?: string | null,
    //                         // style?: string | null,
    //                         // gullet?: number | null,
    //                         // saddleFitNumber?: number | null,
    //                         photo: new TestImageKey(testImageSaddle),
    //                         // description?: string | null,
    //                         // availability?: string | null,
    //                         // scannedAt?: number | null,
    //                         // createdAt: number,
    //                         // updatedAt: number,
    //                     },
    //                 }})
    //             }
    //         })
    //     }, 1500)
    // })


    let variables: ListUserHorsesQueryVariables = {};
    //
    // if (params.limit) {
    //     variables.limit = params.limit;
    // }
    //
    // if (params.nextToken) {
    //     variables.nextToken = params.nextToken;
    // }

    return client.graphql({
        query: queries.listUserSaddles,
        variables
    })
};


export const deleteSaddle = (id) => {
    return client.graphql({
        query: mutations.deleteSaddle,
        variables: { id }
    })
};

export const findSaddle = (id) => {
    return client.graphql({
        query: queries.saddle,
        variables: { id }
    })
}

export const cancelRequest = (promise, msg = 'cancel request') => client.cancel(promise, msg);