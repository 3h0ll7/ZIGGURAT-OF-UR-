export interface AppState {
  sunAzimuth: number;   // 0 to 360
  sunElevation: number; // 0 to 90
  windSpeed: number;    // 0 to 10
  showHumans: boolean;  // Toggle archaeologists
}

export const INITIAL_STATE: AppState = {
  sunAzimuth: 85,
  sunElevation: 15, // Early morning low angle
  windSpeed: 2,
  showHumans: false,
};
