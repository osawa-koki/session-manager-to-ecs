#!/bin/bash

source .env

echo "Getting task arns..."
ECS_TASK_ARNS=$(aws ecs list-tasks --cluster EcsCluster --query 'taskArns' --output json)

echo "Getting task ids..."
ECS_TASK_IDS=$(echo $ECS_TASK_ARNS | jq -r '[.[] | split("/")[-1]]')

echo "Select task id:"
echo $ECS_TASK_IDS

while true; do
  read -p "Enter task id: " ECS_TASK_ID
  if echo "$ECS_TASK_IDS" | jq -e "index(\"$ECS_TASK_ID\") != null" > /dev/null; then
    break
  fi
  echo "Invalid task id"
done

echo "Connecting to task..."
aws ecs execute-command \
  --cluster $ECS_CLUSTER_NAME \
  --task $ECS_TASK_ID \
  --container $ECS_CONTAINER_NAME \
  --command "/bin/sh" \
  --interactive
