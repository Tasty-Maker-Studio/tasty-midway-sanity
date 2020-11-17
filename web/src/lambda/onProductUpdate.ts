import { webhooks } from './helper/shopify-sane-sync';

exports.handler = webhooks.onProductUpdate;
