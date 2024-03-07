import {ProductResponse} from '../responses';
import AttributeEntity from './AttributeEntity';
import {MaterialEntity} from './MaterialEntity';
import VariantEntity from './VariantEntity';

export default class ProductEntity {
  private id: number;
  private careLabels: Array<string>;
  private material: string | null;
  private materialAdvantages: string | null;
  private materialApplication: string | null;
  private materialComponent: string | null;
  private materialDefect: string | null;
  private materialId: number | null;
  private variants: Array<VariantEntity>;
  private attributes: Array<AttributeEntity> | null;

  private constructor(
    id: number,
    careLabels: Array<string>,
    material: string | null,
    materialAdvantages: string | null,
    materialApplication: string | null,
    materialComponent: string | null,
    materialDefect: string | null,
    materialId: number | null,
    variants: Array<VariantEntity>,
    attributes: Array<AttributeEntity> | null,
  ) {
    this.id = id;
    this.material = material;
    this.materialAdvantages = materialAdvantages;
    this.materialApplication = materialApplication;
    this.materialComponent = materialComponent;
    this.materialDefect = materialDefect;
    this.materialId = materialId;
    this.variants = variants;
    this.careLabels = careLabels;
    this.attributes = attributes;
  }

  static createFromResponse(response: ProductResponse) {
    let variants = response.variants.map(variant =>
      VariantEntity.create(variant),
    );
    let attributes = response.attributes.map(att =>
      AttributeEntity.create(att),
    );
    let careLabelTxt = '';
    if (response.careLabels !== null) {
      careLabelTxt = response.careLabels;
    }
    let careLabels = careLabelTxt.split(';');
    return new ProductEntity(
      response.id,
      careLabels,
      response.material,
      response.materialAdvantages,
      response.materialApplication,
      response.materialComponent,
      response.materialDefect,
      response.materialId,
      variants,
      attributes,
    );
  }

  getId() {
    return this.id;
  }

  getVariantById(id: number) {
    let index = this.variants.findIndex(variant => variant.getId() === id);
    if (index !== -1) {
      return this.variants[index];
    }
    return null;
  }

  isEmptyApplication() {
    return this.material == null;
  }

  getMaterialAdvantages() {
    return this.materialAdvantages;
  }

  getMaterial() {
    return this.material;
  }

  getMaterialApplication() {
    return this.materialApplication;
  }

  getMaterialComponent() {
    return this.materialComponent;
  }

  getMaterialDefect() {
    return this.materialDefect;
  }

  getMaterialId() {
    return this.materialId;
  }

  getCareLabels() {
    return this.careLabels;
  }

  getVariants() {
    return this.variants;
  }

  private compare = (a: AttributeEntity, b: AttributeEntity) => {
    if (a.getType() < b.getType()) {
      return -1;
    }
    if (a.getType() > b.getType()) {
      return 1;
    }
    return 0;
  };

  getAttributes() {
    if (!this.attributes) {
      return [];
    }
    return this.attributes.sort(this.compare);
  }

  isEmptyAttribute() {
    return this.attributes == null || this.attributes.length === 0;
  }

  getFirstAttributeId() {
    if (this.attributes === null || this.attributes.length === 0) {
      return 0;
    }
    return this.attributes[0].getAttributeId();
  }
  getAttributeIds() {
    if (this.attributes === null || this.attributes.length === 0) {
      return '';
    }
    return this.attributes.map(e => e.getAttributeId()).toString();
  }

  getMaterialMain(materials: MaterialEntity[]) {
    let material = materials[0];
    if (this.isEmptyAttribute()) {
      return material;
    }
    const attribute = this.attributes?.find(e => e.getType() === 'material1');
    if (!attribute) {
      return material;
    }

    const materialMain = materials.find(
      e => e.getId() === attribute.getAttributeId(),
    );
    if (materialMain) {
      material = materialMain;
    }
    return material;
  }
}
