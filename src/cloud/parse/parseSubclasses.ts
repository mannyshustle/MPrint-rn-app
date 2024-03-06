import {
  EcommerceSubClasses,
  PRODUCT_CLASSNAME,
  Product,
  SubClass,
  USER_CLASSNAME,
  User,
} from 'lib_cloud/parse';
import {
  PRINTABLE_CLASSNAME,
  Printable,
} from '../../../../lib/lib-react-native/src/cloud/parse/class/ecommerce/printable';

export const SubClasses: SubClass[] = [
  ...EcommerceSubClasses,
  {
    className: USER_CLASSNAME,
    class: User as any,
  },
  {
    className: PRINTABLE_CLASSNAME,
    class: Printable as any,
  },
  {
    className: PRODUCT_CLASSNAME,
    class: Product as any,
  },
];
