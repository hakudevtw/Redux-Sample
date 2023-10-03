export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface RequestState {
  status: RequestStatus;
  error: string | null;
}
