import React from 'react';

export default class ExpectSalaryTabEntity {
  id: number;
  name: string;
  component: React.FC;

  constructor(id: number, name: string, component: React.FC) {
    this.id = id;
    this.name = name;
    this.component = component;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getComponent() {
    return this.component;
  }
}
