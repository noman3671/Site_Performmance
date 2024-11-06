// mutation sellSeller{
//     sellSaddle(input:{
//       id:"eb385f14-726e-45bd-bd6e-86cfdfb3061e",
//       condition:EXCELLENT,
//       description:"test",
//           price: 100,
//       title: "Test sell saddle"
//     }){
//       id
//       condition
//       description
//       price
//       title
//     }
//   }

export const SELL_SADDLE = /* GraphQL */ `
  mutation sellSeller($input: SellSaddleInput!) {
    sellSaddle(input: $input) {
      id
      title
      condition
      description
      price
      brandName
      size
      discipline
     }
  }
`;
