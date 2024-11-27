import * as cdk from 'aws-cdk-lib';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

interface OutputStackProps extends cdk.StackProps {
  stackName: string;
  alb: ecsPatterns.ApplicationLoadBalancedFargateService;
}

export default class OutputStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: OutputStackProps) {
    const { stackName, alb } = props;

    super(scope, id, {
      ...props,
      stackName,
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: alb.loadBalancer.loadBalancerDnsName,
    });
  }
}
