import { createAWSWebhooks } from '../../sane-server-sync/server/src/aws';
import { statusReturn } from '../requestConfig';
require('dotenv').config();

const setUpWebHook = () => {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const authToken = process.env.SANITY_API_TOKEN;
  const shopName = process.env.SHOPIFY_SHOP_NAME;
  const accessToken = process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;

  if (!projectId) throw new Error('You must provide a sanity project ID');
  if (!dataset) throw new Error('You must provide a sanity dataset');
  if (!authToken) throw new Error('You must provide a sanity auth token');
  if (!shopName) throw new Error('You must provide a shopify shop name');
  if (!accessToken) throw new Error('You must provide a shopify access token');

  const handleHooksError = (err: Error) => {
    console.log('[shopify-sane-sync.ts]   --- handleError  err  ', err);
    // const onError = Sentry.captureException(error)
    return  {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An internal server error has occurred',
      }),
    };
  };

  const config = {
    secrets: {
      sanity: {
        projectId,
        dataset,
        authToken,
      },
      shopify: {
        shopName,
        accessToken,
      },
    },
  };

  const onError = handleHooksError;

  return createAWSWebhooks({ config, onError });
};

export const webhooks = setUpWebHook();
