import { Handler, APIGatewayEvent } from 'aws-lambda';
import { WebhooksConfig, Webhooks, WebhookHandler } from '../../../types/src';
import { createWebhooks } from '../webhooks';

type AWSWebhooks ={
  onCollectionCreate: Handler,
  onCollectionUpdate: Handler,
  onCollectionDelete: Handler,
  onProductCreate: Handler,
  onProductUpdate: Handler,
  onProductDelete: Handler,
}

export const createAWSWebhooks = ({
  config,
  onError,
}: WebhooksConfig): AWSWebhooks => {
  const webhooks = createWebhooks({ config, onError });

  const createAWSWebhook = (webhook: WebhookHandler) => async (
    event: APIGatewayEvent,
  ) => {
    if (!event.body) {
      if (onError) onError(new Error('No body received from webhook event'));
      return;
    }
    console.log('createAWSWebhook  ----- event.body  - ', event.body)
    const nodeInfo = JSON.parse(event.body);
    const { id } = nodeInfo;
    await webhook({ id });
  };

  return {
    onCollectionCreate: createAWSWebhook(webhooks.onCollectionCreate),
    onCollectionUpdate: createAWSWebhook(webhooks.onCollectionUpdate),
    onCollectionDelete: createAWSWebhook(webhooks.onCollectionDelete),
    onProductCreate: createAWSWebhook(webhooks.onProductCreate),
    onProductUpdate: createAWSWebhook(webhooks.onProductUpdate),
    onProductDelete: createAWSWebhook(webhooks.onProductDelete),
  };
};
