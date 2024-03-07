import {
  MetaDataResponse,
  PersonnelResponse,
  SalaryResponse,
} from 'modules/personalize/models/responses/PersonnelResponse';
import {NumberUtils} from 'common';

export enum FormatValueSalary {
  price = 'price',
  percent = 'percent',
  number = 'number',
}

export default class PersonnelEntity {
  private accountCode: string;
  private accountName: string;
  private position: string;
  private totalSalary: number;
  private totalIncomeSalary: number;
  private totalDeductionSalary: number;
  private incomeSalaries: Array<SalaryEntity>;
  private deductionSalaries: Array<SalaryEntity>;
  private index: number;
  constructor(
    accountCode: string,
    accountName: string,
    position: string,
    totalSalary: number,
    totalIncomeSalary: number,
    totalDeductionSalary: number,
    incomeSalaries: Array<SalaryEntity>,
    deductionSalaries: Array<SalaryEntity>,
    index: number,
  ) {
    this.accountCode = accountCode;
    this.accountName = accountName;
    this.position = position;
    this.totalSalary = totalSalary;
    this.incomeSalaries = incomeSalaries;
    this.totalIncomeSalary = totalIncomeSalary;
    this.totalDeductionSalary = totalDeductionSalary;
    this.deductionSalaries = deductionSalaries;
    this.index = index;
  }

  static createFromResponse(
    response: PersonnelResponse,
    index: number,
  ): PersonnelEntity {
    const incomeSalaries = response.incomeSalaries.map(incomeSalaryResponse => {
      return SalaryEntity.createFromResponse(incomeSalaryResponse);
    });
    const deductionSalaries = response.deductionSalaries.map(
      deductionSalaryResponse => {
        return SalaryEntity.createFromResponse(deductionSalaryResponse);
      },
    );

    return new PersonnelEntity(
      response.accountCode,
      response.accountName,
      response.position,
      response.totalSalary,
      response.totalIncomeSalary,
      response.totalDeductionSalary,
      incomeSalaries,
      deductionSalaries,
      index,
    );
  }

  static createEmpty(): PersonnelEntity {
    return new PersonnelEntity('', '', '', 0, 0, 0, [], [], 0);
  }

  getAccountCode(): string {
    return this.accountCode;
  }

  setAccountCode(value: string) {
    this.accountCode = value;
  }

  getIndex(): number {
    return this.index + 1;
  }

  setIndex(value: number) {
    this.index = value;
  }

  getAccountName(): string {
    return this.accountName;
  }

  setAccountName(value: string) {
    this.accountName = value;
  }

  getPosition(): string {
    return this.position;
  }

  setPosition(value: string) {
    this.position = value;
  }

  getTotalSalary(): string {
    return NumberUtils.formatCurrency(this.totalSalary);
  }

  getTotalIncomeSalary(): string {
    return NumberUtils.formatCurrency(this.totalIncomeSalary);
  }

  getTotalDeductionSalary(): string {
    return NumberUtils.formatCurrency(this.totalDeductionSalary);
  }

  setTotalSalary(value: number) {
    this.totalSalary = value;
  }

  getIncomeSalaries(): Array<SalaryEntity> {
    if (this.incomeSalaries && this.incomeSalaries.length > 0) {
      return this.incomeSalaries;
    }
    return [];
  }

  setIncomeSalaries(value: Array<SalaryEntity>) {
    this.incomeSalaries = value;
  }

  getDeductionSalaries(): Array<SalaryEntity> {
    if (this.deductionSalaries && this.deductionSalaries.length > 0) {
      return this.deductionSalaries;
    }
    return [];
  }

  setDeductionSalaries(value: Array<SalaryEntity>) {
    this.deductionSalaries = value;
  }
}

export class SalaryEntity {
  private name: string;
  private value: number;
  private metaData: Array<MetaDataEntity>;
  private format: FormatValueSalary;

  constructor(
    name: string,
    value: number,
    metaData: Array<MetaDataEntity>,
    format: FormatValueSalary,
  ) {
    this.name = name;
    this.value = value;
    this.metaData = metaData;
    this.format = format;
  }

  static createFromResponse(response: SalaryResponse): SalaryEntity {
    let metaData = MetaDataEntity.createFromResponse(response.metaData);
    return new SalaryEntity(
      response.name,
      response.value,
      metaData,
      response.format,
    );
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getValue(): string {
    if (this.format === FormatValueSalary.price) {
      return NumberUtils.formatCurrency(this.value);
    }
    if (this.format === FormatValueSalary.number) {
      return String(this.value.toFixed(2));
    }
    if (this.format === FormatValueSalary.percent) {
      return String(this.value);
    }
    return '';
  }

  setValue(value: number) {
    this.value = value;
  }

  getMetaData(): Array<MetaDataEntity> {
    return this.metaData;
  }

  setMetaData(value: Array<MetaDataEntity>) {
    this.metaData = value;
  }
}

export class MetaDataEntity {
  private name: string;
  private value: number;
  private format: FormatValueSalary;

  constructor(name: string, value: number, format: FormatValueSalary) {
    this.name = name;
    this.value = value;
    this.format = format;
  }

  static createFromResponse(
    response: Array<MetaDataResponse>,
  ): MetaDataEntity[] {
    return response.map(metaDataResponse => {
      return new MetaDataEntity(
        metaDataResponse.name,
        metaDataResponse.value,
        metaDataResponse.format,
      );
    });
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getValue(): string {
    if (this.format === FormatValueSalary.price) {
      return NumberUtils.formatCurrency(this.value);
    }
    if (this.format === FormatValueSalary.number) {
      return String(this.value.toFixed(2));
    }
    if (this.format === FormatValueSalary.percent) {
      return String(this.value);
    }
    return '';
  }

  setValue(value: any) {
    this.value = value;
  }
}
