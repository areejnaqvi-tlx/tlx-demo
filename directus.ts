import { createDirectus, rest } from '@directus/sdk';
import { environment } from './src/environments/environment';

type Home = {
  id: string;
  title: string;
  description: string;
  button_text: string;
  background_image: string;
};

type User = {
  cnic: string;
  given_name: string;
  last_name: string;
  email: string;
  mothers_name: string;
  address: string;
  marital_status: string;
  card: number;
};

type Card = {
  id: string;
  type: string;
  credit_limit: number;
  interest_rate: number;
  annual_fee: number;
  benefits: string;
};

type Theme = {
  id: string;
  base_style: string;
  form_style?: string;
  primary_color: string;
  secondary_color: string;
}

const directus = createDirectus(environment.directusApiUrl).with(rest());

export { directus, Home, User, Card, Theme };
