import { AxiosDefaults, AxiosInstance, HeadersDefaults } from 'axios';

interface HeadersProps extends HeadersDefaults {
  Authorization?: string;
}

interface DefaultsProps extends AxiosDefaults {
  headers: HeadersProps;
}

export interface AxiosProps extends AxiosInstance {
  defaults: DefaultsProps;
}
