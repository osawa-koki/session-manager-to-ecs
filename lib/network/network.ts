import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface NetworkStackProps extends cdk.StackProps {
  stackName: string;
}

export default class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    const { stackName } = props;

    super(scope, id, {
      ...props,
      stackName,
    });

    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'private-with-egress-subnet',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    const sg = new ec2.SecurityGroup(this, 'SSMEndpointSecurityGroup', {
      vpc,
      allowAllOutbound: true,
      description: 'Security group for SSM endpoint',
    });
    sg.addIngressRule(
      ec2.Peer.ipv4(vpc.vpcCidrBlock),
      ec2.Port.tcp(443)
    );

    new ec2.InterfaceVpcEndpoint(this, 'SSMEndpoint', {
      vpc,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      service: ec2.InterfaceVpcEndpointAwsService.SSM,
      securityGroups: [sg],
    });

    new ec2.InterfaceVpcEndpoint(this, 'EC2MessagesEndpoint', {
      vpc,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      service: ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES,
      securityGroups: [sg],
    });

    new ec2.InterfaceVpcEndpoint(this, 'SSMMessageEndpoint', {
      vpc,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      service: ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES,
      securityGroups: [sg],
    });

    this.vpc = vpc;
  }
}
