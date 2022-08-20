import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface TopPagePropsComponentProps  {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}
