import { CustomerEntity } from './customer.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

export const entities = [UserEntity, CustomerEntity, ProductEntity];

export * from './customer.entity';

export * from './user.entity';

export * from './product.entity';
