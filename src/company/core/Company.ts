import { Account } from '@account/core';
import { CompanyError } from './Error';
import { CreatedAt, CUIT, ID, Name, Type } from './params';

export interface CompanyRaw {
  id?: string;
  createdAt?: string | Date;
  cuit?: string;
  name?: string;
  type?: string;
}

interface ICompany {
  id?: ID;
  createdAt?: CreatedAt;
  cuit?: CUIT;
  name?: Name;
  type?: Type;
}

export class Company {
  private _id: ID;
  private _createdAt: CreatedAt;
  private _cuit: CUIT;
  private _name: Name;
  private _type: Type;

  private _account: Account;

  constructor({ id, cuit, name, type, createdAt }: ICompany) {
    if (!id) throw new CompanyError('Company Id should be exist');
    this._id = id;
    this._createdAt = createdAt!;
    this._cuit = cuit!;
    this._name = name!;
    this._type = type!;
  }

  /** Setters */
  setCreatedAt(createdAt: CreatedAt): Company {
    if (this._createdAt)
      throw new CompanyError('Company CreatedAt Already defined');
    this._createdAt = createdAt;
    return this;
  }

  setCUIT(cuit: CUIT): Company {
    if (this._cuit) throw new CompanyError('Company CUIT Already defined');
    this._cuit = cuit;
    return this;
  }

  setName(name: Name): Company {
    if (this._name) throw new CompanyError('Company Name Already defined');
    this._name = name;
    return this;
  }

  setType(type: Type): Company {
    if (this._type) throw new CompanyError('Company Type Already defined');
    this._type = type;
    return this;
  }

  setAccount(account: Account): Company {
    if (this._account) throw new CompanyError('Account Already defined');
    this._account = account;
    return this;
  }

  /** Getters */
  get id(): ID {
    return this._id;
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get cuit(): CUIT {
    return this._cuit;
  }

  get name(): Name {
    return this._name;
  }

  get type(): Type {
    return this._type;
  }

  getRaw(): CompanyRaw {
    return {
      id: this.id.value,
      createdAt: this.createdAt.value.format(),
      cuit: this.cuit.value,
      name: this.name.value,
      type: this.type.value,
    };
  }
}
