export interface TrainingResponse {
  id: number;
  name: string;
  content: string;
  mimetype: string;
  applyTime: Date;
  expireTime: Date;
  minimumStudyTime: number;
}
