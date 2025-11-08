import { CloudRegion } from '@/types/topology';


export const CLOUD_REGIONS: CloudRegion[] = [
// GCP sample
{ id: 'asia-south1', name: 'Mumbai (GCP)', provider: 'GCP', lat: 19.076, lng: 72.8777 },
{ id: 'europe-west4', name: 'Netherlands (GCP)', provider: 'GCP', lat: 52.3676, lng: 4.9041 },
{ id: 'us-east4', name: 'N. Virginia (GCP)', provider: 'GCP', lat: 38.8462, lng: -77.3064 },
// AWS sample
{ id: 'ap-south-1', name: 'Mumbai (AWS)', provider: 'AWS', lat: 19.076, lng: 72.8777 },
{ id: 'eu-central-1', name: 'Frankfurt (AWS)', provider: 'AWS', lat: 50.1109, lng: 8.6821 },
{ id: 'us-east-1', name: 'N. Virginia (AWS)', provider: 'AWS', lat: 38.8462, lng: -77.3064 },
// Azure sample
{ id: 'central-india', name: 'Central India (Azure)', provider: 'Azure', lat: 22.7196, lng: 75.8577 },
{ id: 'westeurope', name: 'West Europe (Azure)', provider: 'Azure', lat: 52.3105, lng: 4.7683 },
{ id: 'eastus2', name: 'East US 2 (Azure)', provider: 'Azure', lat: 36.8529, lng: -75.9780 },
];