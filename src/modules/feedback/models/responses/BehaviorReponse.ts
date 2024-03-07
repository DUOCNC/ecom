export interface BehaviorResponse {
  code: string | null;
  createdBy: string;
  createdDate: string;
  createdName: string;
  deleted: boolean;
  id: number;
  updatedBy: string;
  updatedDate: string;
  updatedName: string;
  value: string;
  keyBehaviors: BehaviorResponse;
  keyBehavior: BehaviorResponse;
  quantity: number;
}
