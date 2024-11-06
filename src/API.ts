/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSaddleInput = {
  type: SaddleType,
  material: SeatMaterial,
  price: number,
  brandName: string,
  size: number,
  color: string,
  model: string,
  condition: Condition,
  yearOfManufacture: number,
  maker?: string | null,
  makerLocation?: string | null,
  finishedSeatSize?: number | null,
  newOrUsed?: NewOrUsed | null,
  serialNumber?: string | null,
  amountOfTooling?: string | null,
  unTooledPortionsTexture?: string | null,
  typeOfTooling?: string | null,
  weight?: number | null,
  skirtLength?: number | null,
  treeType?: TreeType | null,
  treeWarranty?: string | null,
  gulletWidth?: number | null,
  swellWidth?: number | null,
  cantleHeight?: number | null,
  finishedHornHeight?: number | null,
  hornCapWidth?: number | null,
  riggingType?: RiggingType | null,
  fleece?: Fleece | null,
  fendersLeathersCutLength?: boolean | null,
  cantle?: number | null,
  conchoType?: string | null,
  hardwareType?: string | null,
  strings?: string | null,
  stirrups?: string | null,
  frontCinch?: boolean | null,
  frontBilletLatigo?: string | null,
  rearCinch?: boolean | null,
  backBilletLatigo?: string | null,
  style?: string | null,
  gullet?: number | null,
  saddleFitNumber?: number | null,
  photo?: string | null,
  description?: string | null,
  availability?: string | null,
};

export enum SaddleType {
  WESTERN = "WESTERN",
  ENGLISH = "ENGLISH",
  OTHER = "OTHER",
}


export enum SeatMaterial {
  PADDED = "PADDED",
  GEL = "GEL",
  LEATHER = "LEATHER",
  OTHER = "OTHER",
}


export enum Condition {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
}


export enum NewOrUsed {
  NEW = "NEW",
  USED = "USED",
}


export enum TreeType {
  QUARTER_HOUSE = "QUARTER_HOUSE",
  ARABIAN = "ARABIAN",
  OTHER = "OTHER",
}


export enum RiggingType {
  FULL = "FULL",
  SEMI_QUARTER = "SEMI_QUARTER",
  QUARTER = "QUARTER",
  OTHER = "OTHER",
}


export enum Fleece {
  REAL = "REAL",
  SYNTHETIC = "SYNTHETIC",
}


export type Saddle = {
  __typename: "Saddle",
  id: string,
  userId: string,
  type: SaddleType,
  material: SeatMaterial,
  // is this should be seat material?
  price: number,
  brandName: string,
  // brand name not found in figma
  size: number,
  color: string,
  model: string,
  // not found in figma
  status: SaddleStatus,
  condition: Condition,
  yearOfManufacture: number,
  // not found in figma
  maker?: string | null,
  // is this should be brand name
  makerLocation?: string | null,
  finishedSeatSize?: number | null,
  newOrUsed?: NewOrUsed | null,
  serialNumber?: string | null,
  amountOfTooling?: string | null,
  unTooledPortionsTexture?: string | null,
  typeOfTooling?: string | null,
  weight?: number | null,
  skirtLength?: number | null,
  treeType?: TreeType | null,
  treeWarranty?: string | null,
  gulletWidth?: number | null,
  swellWidth?: number | null,
  cantleHeight?: number | null,
  finishedHornHeight?: number | null,
  hornCapWidth?: number | null,
  riggingType?: RiggingType | null,
  fleece?: Fleece | null,
  fendersLeathersCutLength?: boolean | null,
  cantle?: number | null,
  conchoType?: string | null,
  hardwareType?: string | null,
  strings?: string | null,
  stirrups?: string | null,
  frontCinch?: boolean | null,
  frontBilletLatigo?: string | null,
  rearCinch?: boolean | null,
  backBilletLatigo?: string | null,
  style?: string | null,
  gullet?: number | null,
  saddleFitNumber?: number | null,
  photo?: string | null,
  description?: string | null,
  availability?: string | null,
  // ?
  saddleMeasurements?:  Array<Coordinate > | null,
  scannedAt?: number | null,
  createdAt: number,
  updatedAt: number,
  objLocations?: Array< string > | null,
};

export enum SaddleStatus {
  LIVE = "LIVE",
  SCAN = "SCAN",
  SOLD = "SOLD",
  BLOCKED = "BLOCKED",
  PENDING_SALE = "PENDING_SALE",
}


export type Coordinate = {
  __typename: "Coordinate",
  x: number,
  y: number,
  z: number,
};

export type UpdateSaddleInput = {
  id: string,
  type?: SaddleType | null,
  material?: SeatMaterial | null,
  price?: number | null,
  brandName?: string | null,
  size?: number | null,
  color?: string | null,
  model?: string | null,
  condition?: Condition | null,
  yearOfManufacture?: number | null,
  maker?: string | null,
  makerLocation?: string | null,
  finishedSeatSize?: number | null,
  newOrUsed?: NewOrUsed | null,
  serialNumber?: string | null,
  amountOfTooling?: string | null,
  unTooledPortionsTexture?: string | null,
  typeOfTooling?: string | null,
  weight?: number | null,
  skirtLength?: number | null,
  treeType?: TreeType | null,
  treeWarranty?: string | null,
  gulletWidth?: number | null,
  swellWidth?: number | null,
  cantleHeight?: number | null,
  finishedHornHeight?: number | null,
  hornCapWidth?: number | null,
  riggingType?: RiggingType | null,
  fleece?: Fleece | null,
  fendersLeathersCutLength?: boolean | null,
  cantle?: number | null,
  conchoType?: string | null,
  hardwareType?: string | null,
  strings?: string | null,
  stirrups?: string | null,
  frontCinch?: boolean | null,
  frontBilletLatigo?: string | null,
  rearCinch?: boolean | null,
  backBilletLatigo?: string | null,
  style?: string | null,
  gullet?: number | null,
  saddleFitNumber?: number | null,
  photo?: string | null,
  description?: string | null,
  availability?: string | null,
};

export type CreateHorseInput = {
  name: string,
  dob: string,
  color: string,
  photo?: string | null,
  weight?: number | null,
  objLocations?: Array< string > | null,
};

export type Horse = {
  __typename: "Horse",
  id: string,
  name: string,
  dob: string,
  color: string,
  photo?: string | null,
  status: HorseStatus,
  saddleMeasurements?:  Array<Coordinate > | null,
  scannedAt?: number | null,
  weight?: number | null,
  createdAt: number,
  updatedAt: number,
  objLocations?: Array< string > | null,
};

export enum HorseStatus {
  LIVE = "LIVE",
  SCAN = "SCAN",
  BLOCKED = "BLOCKED",
}


export type UpdateHorseInput = {
  id: string,
  name?: string | null,
  dob?: string | null,
  color?: string | null,
  photo?: string | null,
  weight?: number | null,
  objLocations?: Array< string > | null,
};

export type UpdateUserInput = {
  address?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phone?: string | null,
  photo?: string | null,
  saddlePreference?: SaddlePreferenceInput | null,
};

export type SaddlePreferenceInput = {
  style?: string | null,
  brandName?: string | null,
  size?: number | null,
  newOrUsed?: NewOrUsed | null,
  condition?: Condition | null,
  minFitScore?: number | null,
};

export type User = {
  __typename: "User",
  id: string,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  name?: string | null,
  phone?: string | null,
  photo?: string | null,
  email: string,
  createdAt: number,
  updatedAt: number,
  SaddlePreference?: SaddlePreference | null,
};

export type SaddlePreference = {
  __typename: "SaddlePreference",
  style?: string | null,
  brandName: string,
  size: number,
  newOrUsed?: NewOrUsed | null,
  condition: Condition,
  minFitScore?: number | null,
};

export type SaddleCheckoutInput = {
  saddleIds: Array< string >,
};

export type SaddleCheckout = {
  __typename: "SaddleCheckout",
  sessionURL: string,
};

export type HorseConnection = {
  __typename: "HorseConnection",
  items:  Array<Horse >,
  nextToken?: string | null,
  count?: number | null,
};

export type SaddleConnection = {
  __typename: "SaddleConnection",
  items:  Array<Saddle >,
  nextToken?: string | null,
  count?: number | null,
};

export type SaddleFitConnection = {
  __typename: "SaddleFitConnection",
  items:  Array<SaddleFit >,
  nextToken?: string | null,
  count?: number | null,
};

export type SaddleFit = {
  __typename: "SaddleFit",
  saddleId: string,
  horseId: string,
  createdAt: number,
  score: number,
  updatedAt: number,
  userId: string,
  saddle: Saddle,
};

export type CreateSaddleMutationVariables = {
  input: CreateSaddleInput,
};

export type CreateSaddleMutation = {
  createSaddle:  {
    __typename: "Saddle",
    id: string,
    userId: string,
    type: SaddleType,
    material: SeatMaterial,
    // is this should be seat material?
    price: number,
    brandName: string,
    // brand name not found in figma
    size: number,
    color: string,
    model: string,
    // not found in figma
    status: SaddleStatus,
    condition: Condition,
    yearOfManufacture: number,
    // not found in figma
    maker?: string | null,
    // is this should be brand name
    makerLocation?: string | null,
    finishedSeatSize?: number | null,
    newOrUsed?: NewOrUsed | null,
    serialNumber?: string | null,
    amountOfTooling?: string | null,
    unTooledPortionsTexture?: string | null,
    typeOfTooling?: string | null,
    weight?: number | null,
    skirtLength?: number | null,
    treeType?: TreeType | null,
    treeWarranty?: string | null,
    gulletWidth?: number | null,
    swellWidth?: number | null,
    cantleHeight?: number | null,
    finishedHornHeight?: number | null,
    hornCapWidth?: number | null,
    riggingType?: RiggingType | null,
    fleece?: Fleece | null,
    fendersLeathersCutLength?: boolean | null,
    cantle?: number | null,
    conchoType?: string | null,
    hardwareType?: string | null,
    strings?: string | null,
    stirrups?: string | null,
    frontCinch?: boolean | null,
    frontBilletLatigo?: string | null,
    rearCinch?: boolean | null,
    backBilletLatigo?: string | null,
    style?: string | null,
    gullet?: number | null,
    saddleFitNumber?: number | null,
    photo?: string | null,
    description?: string | null,
    availability?: string | null,
    // ?
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type UpdateSaddleMutationVariables = {
  input: UpdateSaddleInput,
};

export type UpdateSaddleMutation = {
  updateSaddle:  {
    __typename: "Saddle",
    id: string,
    userId: string,
    type: SaddleType,
    material: SeatMaterial,
    // is this should be seat material?
    price: number,
    brandName: string,
    // brand name not found in figma
    size: number,
    color: string,
    model: string,
    // not found in figma
    status: SaddleStatus,
    condition: Condition,
    yearOfManufacture: number,
    // not found in figma
    maker?: string | null,
    // is this should be brand name
    makerLocation?: string | null,
    finishedSeatSize?: number | null,
    newOrUsed?: NewOrUsed | null,
    serialNumber?: string | null,
    amountOfTooling?: string | null,
    unTooledPortionsTexture?: string | null,
    typeOfTooling?: string | null,
    weight?: number | null,
    skirtLength?: number | null,
    treeType?: TreeType | null,
    treeWarranty?: string | null,
    gulletWidth?: number | null,
    swellWidth?: number | null,
    cantleHeight?: number | null,
    finishedHornHeight?: number | null,
    hornCapWidth?: number | null,
    riggingType?: RiggingType | null,
    fleece?: Fleece | null,
    fendersLeathersCutLength?: boolean | null,
    cantle?: number | null,
    conchoType?: string | null,
    hardwareType?: string | null,
    strings?: string | null,
    stirrups?: string | null,
    frontCinch?: boolean | null,
    frontBilletLatigo?: string | null,
    rearCinch?: boolean | null,
    backBilletLatigo?: string | null,
    style?: string | null,
    gullet?: number | null,
    saddleFitNumber?: number | null,
    photo?: string | null,
    description?: string | null,
    availability?: string | null,
    // ?
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type DeleteSaddleMutationVariables = {
  id: string,
};

export type DeleteSaddleMutation = {
  deleteSaddle:  {
    __typename: "Saddle",
    id: string,
    userId: string,
    type: SaddleType,
    material: SeatMaterial,
    // is this should be seat material?
    price: number,
    brandName: string,
    // brand name not found in figma
    size: number,
    color: string,
    model: string,
    // not found in figma
    status: SaddleStatus,
    condition: Condition,
    yearOfManufacture: number,
    // not found in figma
    maker?: string | null,
    // is this should be brand name
    makerLocation?: string | null,
    finishedSeatSize?: number | null,
    newOrUsed?: NewOrUsed | null,
    serialNumber?: string | null,
    amountOfTooling?: string | null,
    unTooledPortionsTexture?: string | null,
    typeOfTooling?: string | null,
    weight?: number | null,
    skirtLength?: number | null,
    treeType?: TreeType | null,
    treeWarranty?: string | null,
    gulletWidth?: number | null,
    swellWidth?: number | null,
    cantleHeight?: number | null,
    finishedHornHeight?: number | null,
    hornCapWidth?: number | null,
    riggingType?: RiggingType | null,
    fleece?: Fleece | null,
    fendersLeathersCutLength?: boolean | null,
    cantle?: number | null,
    conchoType?: string | null,
    hardwareType?: string | null,
    strings?: string | null,
    stirrups?: string | null,
    frontCinch?: boolean | null,
    frontBilletLatigo?: string | null,
    rearCinch?: boolean | null,
    backBilletLatigo?: string | null,
    style?: string | null,
    gullet?: number | null,
    saddleFitNumber?: number | null,
    photo?: string | null,
    description?: string | null,
    availability?: string | null,
    // ?
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type CreateHorseMutationVariables = {
  input: CreateHorseInput,
};

export type CreateHorseMutation = {
  createHorse:  {
    __typename: "Horse",
    id: string,
    name: string,
    dob: string,
    color: string,
    photo?: string | null,
    status: HorseStatus,
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    weight?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type UpdateHorseMutationVariables = {
  input: UpdateHorseInput,
};

export type UpdateHorseMutation = {
  updateHorse:  {
    __typename: "Horse",
    id: string,
    name: string,
    dob: string,
    color: string,
    photo?: string | null,
    status: HorseStatus,
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    weight?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type DeleteHorseMutationVariables = {
  id: string,
};

export type DeleteHorseMutation = {
  deleteHorse:  {
    __typename: "Horse",
    id: string,
    name: string,
    dob: string,
    color: string,
    photo?: string | null,
    status: HorseStatus,
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    weight?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    name?: string | null,
    phone?: string | null,
    photo?: string | null,
    email: string,
    createdAt: number,
    updatedAt: number,
    SaddlePreference?:  {
      __typename: "SaddlePreference",
      style?: string | null,
      brandName: string,
      size: number,
      newOrUsed?: NewOrUsed | null,
      condition: Condition,
      minFitScore?: number | null,
    } | null,
  },
};

export type SaddleCheckoutMutationVariables = {
  input?: SaddleCheckoutInput | null,
};

export type SaddleCheckoutMutation = {
  saddleCheckout:  {
    __typename: "SaddleCheckout",
    sessionURL: string,
  },
};

export type ListUserHorsesQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserHorsesQuery = {
  listUserHorses:  {
    __typename: "HorseConnection",
    items:  Array< {
      __typename: "Horse",
      id: string,
      name: string,
      dob: string,
      color: string,
      photo?: string | null,
      status: HorseStatus,
      scannedAt?: number | null,
      weight?: number | null,
      createdAt: number,
      updatedAt: number,
      objLocations?: Array< string > | null,
    } >,
    nextToken?: string | null,
    count?: number | null,
  },
};

export type ListUserSaddlesQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserSaddlesQuery = {
  listUserSaddles:  {
    __typename: "SaddleConnection",
    items:  Array< {
      __typename: "Saddle",
      id: string,
      userId: string,
      type: SaddleType,
      material: SeatMaterial,
      // is this should be seat material?
      price: number,
      brandName: string,
      // brand name not found in figma
      size: number,
      color: string,
      model: string,
      // not found in figma
      status: SaddleStatus,
      condition: Condition,
      yearOfManufacture: number,
      // not found in figma
      maker?: string | null,
      // is this should be brand name
      makerLocation?: string | null,
      finishedSeatSize?: number | null,
      newOrUsed?: NewOrUsed | null,
      serialNumber?: string | null,
      amountOfTooling?: string | null,
      unTooledPortionsTexture?: string | null,
      typeOfTooling?: string | null,
      weight?: number | null,
      skirtLength?: number | null,
      treeType?: TreeType | null,
      treeWarranty?: string | null,
      gulletWidth?: number | null,
      swellWidth?: number | null,
      cantleHeight?: number | null,
      finishedHornHeight?: number | null,
      hornCapWidth?: number | null,
      riggingType?: RiggingType | null,
      fleece?: Fleece | null,
      fendersLeathersCutLength?: boolean | null,
      cantle?: number | null,
      conchoType?: string | null,
      hardwareType?: string | null,
      strings?: string | null,
      stirrups?: string | null,
      frontCinch?: boolean | null,
      frontBilletLatigo?: string | null,
      rearCinch?: boolean | null,
      backBilletLatigo?: string | null,
      style?: string | null,
      gullet?: number | null,
      saddleFitNumber?: number | null,
      photo?: string | null,
      description?: string | null,
      availability?: string | null,
      scannedAt?: number | null,
      createdAt: number,
      updatedAt: number,
      objLocations?: Array< string > | null,
    } >,
    nextToken?: string | null,
    count?: number | null,
  },
};

export type UserQueryVariables = {
};

export type UserQuery = {
  user:  {
    __typename: "User",
    id: string,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    country?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    name?: string | null,
    phone?: string | null,
    photo?: string | null,
    email: string,
    createdAt: number,
    updatedAt: number,
    SaddlePreference?:  {
      __typename: "SaddlePreference",
      style?: string | null,
      brandName: string,
      size: number,
      newOrUsed?: NewOrUsed | null,
      condition: Condition,
      minFitScore?: number | null,
    } | null,
  },
};

export type SaddleQueryVariables = {
  id: string,
};

export type SaddleQuery = {
  saddle:  {
    __typename: "Saddle",
    id: string,
    userId: string,
    type: SaddleType,
    material: SeatMaterial,
    // is this should be seat material?
    price: number,
    brandName: string,
    // brand name not found in figma
    size: number,
    color: string,
    model: string,
    // not found in figma
    status: SaddleStatus,
    condition: Condition,
    yearOfManufacture: number,
    // not found in figma
    maker?: string | null,
    // is this should be brand name
    makerLocation?: string | null,
    finishedSeatSize?: number | null,
    newOrUsed?: NewOrUsed | null,
    serialNumber?: string | null,
    amountOfTooling?: string | null,
    unTooledPortionsTexture?: string | null,
    typeOfTooling?: string | null,
    weight?: number | null,
    skirtLength?: number | null,
    treeType?: TreeType | null,
    treeWarranty?: string | null,
    gulletWidth?: number | null,
    swellWidth?: number | null,
    cantleHeight?: number | null,
    finishedHornHeight?: number | null,
    hornCapWidth?: number | null,
    riggingType?: RiggingType | null,
    fleece?: Fleece | null,
    fendersLeathersCutLength?: boolean | null,
    cantle?: number | null,
    conchoType?: string | null,
    hardwareType?: string | null,
    strings?: string | null,
    stirrups?: string | null,
    frontCinch?: boolean | null,
    frontBilletLatigo?: string | null,
    rearCinch?: boolean | null,
    backBilletLatigo?: string | null,
    style?: string | null,
    gullet?: number | null,
    saddleFitNumber?: number | null,
    photo?: string | null,
    description?: string | null,
    availability?: string | null,
    // ?
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type HorseQueryVariables = {
  id: string,
};

export type HorseQuery = {
  horse:  {
    __typename: "Horse",
    id: string,
    name: string,
    dob: string,
    color: string,
    photo?: string | null,
    status: HorseStatus,
    saddleMeasurements?:  Array< {
      __typename: "Coordinate",
      x: number,
      y: number,
      z: number,
    } > | null,
    scannedAt?: number | null,
    weight?: number | null,
    createdAt: number,
    updatedAt: number,
    objLocations?: Array< string > | null,
  },
};

export type ListHorseSaddleFitQueryVariables = {
  horseId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHorseSaddleFitQuery = {
  listHorseSaddleFit:  {
    __typename: "SaddleFitConnection",
    items:  Array< {
      __typename: "SaddleFit",
      saddleId: string,
      horseId: string,
      createdAt: number,
      score: number,
      updatedAt: number,
      userId: string,
    } >,
    nextToken?: string | null,
    count?: number | null,
  },
};
