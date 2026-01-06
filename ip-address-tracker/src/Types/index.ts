export interface IPData {
  ip: string;
  isp: string;
  location: {
    region: string;
    city: string;
    lat: number;
    lng: number;
    timezone: string;
  };
 
}

export interface NavbarProps {
  onSearch: (searchTerm: string) => void;
}
export interface SearchbarProps {
  onSearch: (value: string) => void;
  isLoading: boolean;
}

export interface InfoDisplayProps {
  data: IPData | null; // Ideally, use your IPData interface here
  isLoading: boolean;
}
export interface MapContainerProps {
  data: IPData | null;
}