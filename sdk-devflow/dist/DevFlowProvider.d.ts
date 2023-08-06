import { ReactNode } from 'react';
import React from 'react';
import { DevFlow } from './DevFlow';
export declare const DevFlowContext: React.Context<DevFlow | undefined>;
export declare const DevFlowProvider: React.FC<{
    apiKey: string;
    children: ReactNode;
}>;
