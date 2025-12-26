export interface Service {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export type ServiceCategory =
  | "terrassement"
  | "maçonnerie"
  | "couverture"
  | "isolation"
  | "carrelage"
  | "menuiserie";