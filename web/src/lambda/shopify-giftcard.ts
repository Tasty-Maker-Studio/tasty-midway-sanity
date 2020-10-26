import { APIGatewayEvent } from "aws-lambda"
import crypto from 'crypto'

var postmark = require('postmark')

const {
  SHOPIFY_SECRET
} = process.env;

exports.handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      body: ''
    };
  }

  let data;
  const hmac = event.headers['x-shopify-hmac-sha256']

  try {
    data = JSON.parse(event.body);
    const generatedHash = crypto
        .createHmac('sha256', SHOPIFY_SECRET)
        .update(event.body)
        .digest('base64')
    if (generatedHash !== hmac) {
      return {
        statusCode: 400, 
        body: JSON.stringify({ error: 'Invalid Webhook' })
      }
    }
  } catch (error) {
    console.error('JSON parsing error:', error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Bad request body'
      })
    };
  }
  

  console.log(data)

  var client = new postmark.ServerClient("e49f3b85-533f-4100-9b2e-aaa39841cf28");
  client.sendEmail({
    "From": "undo@ctrlaltdel.world",
    "To": "kevin@ctrlaltdel.world",
    "Subject": "Hello from Postmark",
    "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
    "TextBody": "Hello from Postmark!",
    "MessageStream": "outbound"
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };

  // const {
  //   customer,
  //   line_items,
  //   total_price,
  //   note_attributes
  // } = data

  // const customerData = {
  //   _type: 'customer',
  //   _id: customer.id.toString()
  // }

  // return client
  //   .transaction()
  //   .createIfNotExists(customerData)
  //   .commit()
  //   .then(res => {
  //     console.log(`Successfully updated/patched Customer ${customer.id} in Sanity`);

  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(res)
  //     };
  //   }).catch(error => {
  //     console.error('Sanity error:', error);

  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify({
  //         error: 'An internal server error has occurred',
  //       })
  //     };
  //   });
};