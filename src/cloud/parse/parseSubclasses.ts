import {EcommerceSubClasses, SubClass, USER_CLASSNAME, User} from 'lib_cloud';

export const SubClasses: SubClass[] = [
  ...EcommerceSubClasses,
  {
    className: USER_CLASSNAME,
    class: User as any,
  },
];
