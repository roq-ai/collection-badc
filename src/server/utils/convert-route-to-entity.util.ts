const mapping: Record<string, string> = {
  organizations: 'organization',
  'performance-assessments': 'performance_assessment',
  reservations: 'reservation',
  'usage-trackings': 'usage_tracking',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
