export interface IWebsiteResponse {
  url: string;
  totalVisitors: number;
  totalPageviews: number;
  histogram?: IHistogramData[];
  start?: string;
  end?: string;
  device_types?: IDeviceType[];
  browser_names?: IBrowserName[];
  os_names?: IOSName[];
}

interface IHistogramData {
  date: string;
  pageviews: number;
  visitors: number;
}

interface IDeviceType {
  value: string;
  pageviews: number;
  visitors: number;
}

interface IBrowserName {
  value: string;
  pageviews: number;
  visitors: number;
}

interface IOSName {
  value: string;
  pageviews: number;
  visitors: number;
}
